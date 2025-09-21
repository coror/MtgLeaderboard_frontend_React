import { useEffect, useState, useMemo } from 'react';
import { parseDeckList, fetchCardData } from '../helpers/parseDecklist';

// --- Type Definitions ---
export interface Card {
  name: string;
  quantity: number;
  isCommander?: boolean;
  image?: string;
  error?: boolean;
  cmc?: number;
  type_line?: string;
  type?: string;
  prices?: {
    usd?: string;
  };
  oracle_text?: string;
  rulings_uri?: string;
}

export interface Ruling {
  comment: string;
  published_at: string;
  source: string;
}

interface GroupedCards {
  [key: string]: Card[];
}

interface GroupLabels {
  [key: string]: string;
}

interface DeckViewerHook {
  cardsByGroup: GroupedCards;
  groupBy: 'type' | 'cmc';
  setGroupBy: (value: 'type' | 'cmc') => void;
  loading: boolean;
  error: string | null;
  groupOrder: string[];
  groupLabels: GroupLabels;
  totalCardsCount: number;
  averageCMC: number;
  setSelectedCard: (card: Card | null) => void;
  selectedCard: Card | null;
  rulings: Ruling[] | null;
}

export default function useDeckViewer(decklist: string): DeckViewerHook {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [groupBy, setGroupBy] = useState<'type' | 'cmc'>('type');
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [rulings, setRulings] = useState<Ruling[] | null>(null);

useEffect(() => {
    if (!decklist) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const parsed = parseDeckList(decklist);
    if (!parsed || parsed.length === 0) {
      setError('No cards found in the decklist.');
      setLoading(false);
      return;
    }

    // Isolate the commander from the rest of the decklist
    const commanderData = parsed[0];
    const otherCardsData = parsed.slice(1);

    async function fetchCards() {
      const fetchedCards: Card[] = [];

      // 1. Fetch the commander first, and wait for it
      try {
        const commanderAPIResponse = await fetchCardData(commanderData.name);
        const commanderImage =
          commanderAPIResponse.image_uris?.normal ||
          commanderAPIResponse.card_faces?.[0]?.image_uris?.normal ||
          '';
        const fetchedCommander: Card = {
          ...commanderData,
          image: commanderImage,
          ...commanderAPIResponse,
          isCommander: true, // Explicitly set as commander
        };
        fetchedCards.push(fetchedCommander);
      } catch (err) {
        console.error(`Error fetching commander ${commanderData.name}:`, err);
        const errorCard: Card = { ...commanderData, image: '', error: true };
        fetchedCards.push(errorCard);
      }

      // 2. Fetch all other cards in parallel
      const otherPromises = otherCardsData.map(async (card) => {
        try {
          const data = await fetchCardData(card.name);
          const image =
            data.image_uris?.normal ||
            data.card_faces?.[0]?.image_uris?.normal ||
            '';
          return { ...card, image, ...data };
        } catch (err) {
          console.error(`Error fetching ${card.name}:`, err);
          return { ...card, image: '', error: true };
        }
      });

      const otherFetchedCards = (await Promise.allSettled(otherPromises))
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as PromiseFulfilledResult<Card>).value);

      // 3. Combine commander with the rest of the cards and update state
      const finalCards = [...fetchedCards, ...otherFetchedCards];
      setCards(finalCards);
      setLoading(false);
    }

    fetchCards();
}, [decklist]);

  const typeOrder = [
    { key: 'Commander', label: 'Commander' },
    { key: 'Creature', label: 'Creatures' },
    { key: 'Artifact', label: 'Artifacts' },
    { key: 'Sorcery', label: 'Sorceries' },
    { key: 'Instant', label: 'Instants' },
    { key: 'Planeswalker', label: 'Planeswalkers' },
    { key: 'Enchantment', label: 'Enchantments' },
    { key: 'Land', label: 'Lands' },
    { key: 'Other', label: 'Other' },
  ];

  const getTypeGroup = (card: Card): string => {
    if (card.isCommander) {
      return 'Commander';
    }
    const typeLine = card.type_line || card.type || '';

    // Explicitly check for Land first if a card has multiple types
    if (typeLine.toLowerCase().includes('land')) {
      return 'Land';
    }

    // Now check for other types in your preferred order
    if (typeLine.toLowerCase().includes('creature')) {
      return 'Creature';
    }
    if (typeLine.toLowerCase().includes('artifact')) {
      return 'Artifact';
    }
    if (typeLine.toLowerCase().includes('sorcery')) {
      return 'Sorcery';
    }
    if (typeLine.toLowerCase().includes('instant')) {
      return 'Instant';
    }
    if (typeLine.toLowerCase().includes('planeswalker')) {
      return 'Planeswalker';
    }
    if (typeLine.toLowerCase().includes('enchantment')) {
      return 'Enchantment';
    }

    return 'Other';
  };

  const { cardsByGroup, groupOrder, groupLabels, averageCMC, totalCardsCount } =
    useMemo(() => {
      const totalCardsCount = cards.reduce(
        (sum, c) => sum + (c.quantity || 1),
        0
      );

      const totalCMC = cards.reduce((sum, c) => {
        const isLand =
          c.type_line?.toLowerCase().includes('land') ||
          c.type?.toLowerCase().includes('land');
        const cmc = isLand ? 0 : c.cmc || 0;
        return sum + cmc * (c.quantity || 1);
      }, 0);

      const averageCMC = totalCardsCount > 0 ? totalCMC / totalCardsCount : 0;

      let groups: GroupedCards = {};
      let order: string[] = [];
      const labels: GroupLabels = {};

      if (groupBy === 'cmc') {
        groups = {};
        for (const card of cards) {
          if (card.isCommander) {
            if (!groups['Commander']) groups['Commander'] = [];
            groups['Commander'].push(card);
          } else if (
            card.type_line?.toLowerCase().includes('land') ||
            card.type?.toLowerCase().includes('land')
          ) {
            if (!groups['Land']) groups['Land'] = [];
            groups['Land'].push(card);
          } else {
            const cmcGroup = Math.floor(card.cmc || 0);
            const groupKey = `${cmcGroup}`;
            if (!groups[groupKey]) groups[groupKey] = [];
            groups[groupKey].push(card);
          }
        }

        Object.values(groups).forEach((group) => {
          group.sort((a, b) => (a.cmc || 0) - (b.cmc || 0));
        });

        const numericKeys = Object.keys(groups).filter(
          (k) => k !== 'Commander' && k !== 'Land'
        );
        numericKeys.sort((a, b) => Number(a) - Number(b));

        if (groups['Commander']) order.push('Commander');
        order.push(...numericKeys);
        if (groups['Land']) order.push('Land');

        for (const key of order) {
          const count =
            groups[key]?.reduce((sum, card) => sum + (card.quantity || 1), 0) ||
            0;
          if (key === 'Commander') labels[key] = `Commander (${count})`;
          else if (key === 'Land') labels[key] = `Lands (${count})`;
          else labels[key] = `CMC ${key} (${count})`;
        }
      } else {
        groups = typeOrder.reduce((acc, { key }) => {
          acc[key] = [];
          return acc;
        }, {} as GroupedCards);

        cards.forEach((card) => {
          const group = getTypeGroup(card);
          if (!groups[group]) groups[group] = [];
          groups[group].push(card);
        });

        Object.values(groups).forEach((group) => {
          group.sort((a, b) => (a.cmc || 0) - (b.cmc || 0));
        });

        order = typeOrder
          .map(({ key }) => key)
          .filter((k) => groups[k] && groups[k].length > 0);

        for (const key of order) {
          const count =
            groups[key]?.reduce((sum, card) => sum + (card.quantity || 1), 0) ||
            0;
          const labelObj = typeOrder.find((t) => t.key === key);
          const label = labelObj ? labelObj.label : key;
          labels[key] = `${label} (${count})`;
        }
      }

      return {
        cardsByGroup: groups,
        groupOrder: order,
        groupLabels: labels,
        averageCMC,
        totalCardsCount,
      };
    }, [cards, groupBy]);

  useEffect(() => {
    async function fetchRulings() {
      if (selectedCard && selectedCard.rulings_uri) {
        try {
          const response = await fetch(selectedCard.rulings_uri);
          if (!response.ok) throw new Error('Failed to fetch rulings');
          const data = await response.json();
          setRulings(data.data);
        } catch (err) {
          console.error('Error fetching rulings:', err);
          setRulings(null);
        }
      } else {
        setRulings(null);
      }
    }
    fetchRulings();
  }, [selectedCard]);

  return {
    cardsByGroup,
    groupBy,
    setGroupBy,
    loading,
    error,
    groupOrder,
    groupLabels,
    averageCMC,
    totalCardsCount,
    setSelectedCard,
    selectedCard,
    rulings,
  };
}
