import { useEffect, useState, useMemo } from 'react';
import { parseDeckList, fetchCardData } from '../helpers/parseDecklist';

export default function useDeckViewer(decklist) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [groupBy, setGroupBy] = useState('type'); // 'type' or 'cmc'
  const [selectedCard, setSelectedCard] = useState(null);

  const [rulings, setRulings] = useState(null);

  useEffect(() => {
    if (!decklist) return;

    async function loadDeckFromProp() {
      setLoading(true);
      setError(null);

      try {
        const parsed = parseDeckList(decklist);

        if (parsed.length > 0) {
          parsed[0].isCommander = true;
        }

        const fetched = [];
        for (const card of parsed) {
          try {
            const data = await fetchCardData(card.name);
            const image =
              data.image_uris?.normal ||
              data.card_faces?.[0]?.image_uris?.normal ||
              '';
            fetched.push({ ...card, image, ...data });
          } catch (err) {
            console.error(`Error fetching ${card.name}:`, err);
            fetched.push({ ...card, image: '', error: true });
          }
        }

        setCards(fetched);
        setLoading(false);
      } catch (err) {
        console.error('Error loading deck:', err);
        setError(err.message || 'Failed to load deck');
        setLoading(false);
      }
    }

    loadDeckFromProp();
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
  ];

  const getTypeGroup = (card) => {
    if (card.isCommander) return 'Commander';
    const typeLine = card.type_line || card.type || '';
    for (const { key } of typeOrder) {
      if (typeLine.toLowerCase().includes(key.toLowerCase())) return key;
    }
    return 'Other';
  };

  const { cardsByGroup, groupOrder, groupLabels, averageCMC, totalCardsCount } =
    useMemo(() => {
      let groups = {};

      // Calculate total cards count upfront
      const totalCardsCount = cards.reduce(
        (sum, c) => sum + (c.quantity || 1),
        0
      );

      // Calculate total cmc, counting lands as 0
      const totalCMC = cards.reduce((sum, c) => {
        const isLand =
          c.type_line?.toLowerCase().includes('land') ||
          c.type?.toLowerCase().includes('land');
        const cmc = isLand ? 0 : c.cmc || 0;
        return sum + cmc * (c.quantity || 1);
      }, 0);

      const averageCMC = totalCardsCount > 0 ? totalCMC / totalCardsCount : 0;

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

        // Sort cards inside groups by cmc ascending
        Object.values(groups).forEach((group) => {
          group.sort((a, b) => (a.cmc || 0) - (b.cmc || 0));
        });

        // Sort numeric groups by ascending cmc, excluding Commander and Land
        const numericKeys = Object.keys(groups).filter(
          (k) => k !== 'Commander' && k !== 'Land'
        );
        numericKeys.sort((a, b) => Number(a) - Number(b));

        const order = [];
        if (groups['Commander']) order.push('Commander');
        order.push(...numericKeys);
        if (groups['Land']) order.push('Land');

        // Labels with counts including quantity
        const labels = {};
        for (const key of order) {
          const count =
            groups[key]?.reduce((sum, card) => sum + (card.quantity || 1), 0) ||
            0;
          if (key === 'Commander') labels[key] = `Commander (${count})`;
          else if (key === 'Land') labels[key] = `Lands (${count})`;
          else labels[key] = `CMC ${key} (${count})`;
        }

        return {
          cardsByGroup: groups,
          groupOrder: order,
          groupLabels: labels,
          averageCMC,
          totalCardsCount,
        };
      }

      // groupBy === 'type'
      groups = typeOrder.reduce((acc, { key }) => {
        acc[key] = [];
        return acc;
      }, {});

      cards.forEach((card) => {
        const group = getTypeGroup(card);
        if (!groups[group]) groups[group] = [];
        groups[group].push(card);
      });

      // Sort cards inside groups by cmc ascending
      Object.values(groups).forEach((group) => {
        group.sort((a, b) => (a.cmc || 0) - (b.cmc || 0));
      });

      const order = typeOrder.map(({ key }) => key).filter((k) => k !== 'Land');
      order.push('Land');

      const labels = {};
      for (const key of order) {
        const count =
          groups[key]?.reduce((sum, card) => sum + (card.quantity || 1), 0) ||
          0;
        const labelObj = typeOrder.find((t) => t.key === key);
        const label = labelObj ? labelObj.label : key;
        labels[key] = `${label} (${count})`;
      }

      return {
        cardsByGroup: groups,
        groupOrder: order,
        groupLabels: labels,
        averageCMC,
        totalCardsCount,
      };
    }, [cards, groupBy]);

  // Fetch rulings when selectedCard changes
  useEffect(() => {
    if (!selectedCard || !selectedCard.rulings_uri) {
      setRulings(null);
      return;
    }

    async function fetchRulings() {
      try {
        const response = await fetch(selectedCard.rulings_uri);
        if (!response.ok) throw new Error('Failed to fetch rulings');
        const data = await response.json();
        setRulings(data.data); // Scryfall returns rulings in data.data array
      } catch (err) {
        console.error('Error fetching rulings:', err);
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
    typeOrder,
    groupOrder,
    groupLabels,
    averageCMC,
    totalCardsCount,
    setSelectedCard,
    selectedCard,
    rulings,
  };
}
