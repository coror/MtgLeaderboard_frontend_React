import type { Card } from '../hooks/useDeckViewer';

export function isMoxfieldUrl(text: string): boolean {
  return /^https?:\/\/(www\.)?moxfield\.com\/decks\//i.test(text.trim());
}

export function extractDeckId(url: string): string {
  const match = url.trim().match(/moxfield\.com\/decks\/([A-Za-z0-9_-]+)/);
  if (!match) throw new Error('Invalid Moxfield URL');
  return match[1];
}

interface MoxfieldCardEntry {
  quantity: number;
  card: {
    scryfall_id: string;
    name: string;
    cmc: number;
    type_line: string;
    oracle_text?: string;
    set: string;
    prices?: { usd?: number };
  };
}

/**
 * Convert Moxfield API response to a storable JSON string.
 * Called at upload time from the backend.
 */
export function parseMoxfieldResponse(data: Record<string, unknown>): string {
  const cards: StoredCard[] = [];

  const commanders = (data.commanders || {}) as Record<string, MoxfieldCardEntry>;
  for (const entry of Object.values(commanders)) {
    cards.push(entryToStored(entry, true));
  }

  const mainboard = (data.mainboard || {}) as Record<string, MoxfieldCardEntry>;
  for (const entry of Object.values(mainboard)) {
    cards.push(entryToStored(entry, false));
  }

  return JSON.stringify(cards);
}

interface StoredCard {
  name: string;
  quantity: number;
  isCommander: boolean;
  scryfall_id: string;
  cmc: number;
  type_line: string;
  oracle_text: string;
  set: string;
  usd: string | null;
}

function entryToStored(entry: MoxfieldCardEntry, isCommander: boolean): StoredCard {
  const c = entry.card;
  return {
    name: c.name,
    quantity: entry.quantity,
    isCommander,
    scryfall_id: c.scryfall_id,
    cmc: c.cmc,
    type_line: c.type_line,
    oracle_text: c.oracle_text || '',
    set: c.set,
    usd: c.prices?.usd != null ? String(c.prices.usd) : null,
  };
}

function scryfallImageUrl(scryfallId: string): string {
  const a = scryfallId[0];
  const b = scryfallId[1];
  return `https://cards.scryfall.io/normal/front/${a}/${b}/${scryfallId}.jpg`;
}

/**
 * Parse stored JSON decklist (from Moxfield) into Card[]
 */
export function parseMoxfieldJson(json: string): Card[] {
  const stored: StoredCard[] = JSON.parse(json);
  return stored.map((s) => ({
    name: s.name,
    quantity: s.quantity,
    isCommander: s.isCommander,
    image: scryfallImageUrl(s.scryfall_id),
    cmc: s.cmc,
    type_line: s.type_line,
    oracle_text: s.oracle_text,
    prices: s.usd ? { usd: s.usd } : undefined,
    rulings_uri: `https://api.scryfall.com/cards/${s.scryfall_id}/rulings`,
  }));
}

/**
 * Detect if a stored decklist is Moxfield JSON (starts with '[')
 */
export function isMoxfieldJson(decklist: string): boolean {
  return decklist.trimStart().startsWith('[');
}
