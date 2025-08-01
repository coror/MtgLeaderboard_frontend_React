export function parseDeckList(deckText) {
  if (!deckText) return [];
  const lines = deckText.split('\n');
  const cards = [];

  for (let line of lines) {
    const match = line.match(/^\s*(\d+)\s+(.+?)\s+\(.+?\)/);
    if (match) {
      const quantity = parseInt(match[1]);
      const name = match[2].trim();
      cards.push({ name, quantity });
    }
  }

  return cards;
}

export async function fetchCardData(cardName) {
  const response = await fetch(
    `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`
  );
  if (!response.ok) throw new Error(`Failed to fetch card: ${cardName}`);
  return await response.json();
}

export function getPrimaryType(card) {
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
