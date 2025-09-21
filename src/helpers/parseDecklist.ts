export type ParsedCard = {
  name: string;
  quantity: number;
};

type ScryfallCard = {
  name: string;
  cmc?: number;
  type_line?: string;
  type?: string;
  isCommander?: boolean;
  image_uris?: {
    normal?: string;
  };
  card_faces?: Array<{
    image_uris?: { normal?: string };
  }>;
  prices?: { usd?: string };
  oracle_text?: string;
  rulings_uri?: string;
};

export function parseDeckList(deckText: string): ParsedCard[] {
  if (!deckText) return [];
  const lines = deckText.split('\n');
  const cards = [];

  for (const line of lines) {
    const match = line.match(/^\s*(\d+)\s+(.+?)\s+\(.+?\)/);
    if (match) {
      const quantity = parseInt(match[1]);
      const name = match[2].trim();
      cards.push({ name, quantity });
    }
  }

  return cards;
}

export async function fetchCardData(cardName: string): Promise<ScryfallCard> {
  const response = await fetch(
    `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`
  );
  if (!response.ok) throw new Error(`Failed to fetch card: ${cardName}`);
  return await response.json();
}

export function getPrimaryType(card: { type_line?: string }): string {
  const typeLine = card.type_line || '';
  if (typeLine.includes('Land')) return 'Land';
  if (typeLine.includes('Creature')) return 'Creature';
  if (typeLine.includes('Artifact')) return 'Artifact';
  if (typeLine.includes('Enchantment')) return 'Enchantment';
  if (typeLine.includes('Instant')) return 'Instant';
  if (typeLine.includes('Sorcery')) return 'Sorcery';
  if (typeLine.includes('Planeswalker')) return 'Planeswalker';
  return 'Other';
}
