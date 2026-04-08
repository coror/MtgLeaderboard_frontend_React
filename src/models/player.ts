export type Player = {
  objectId?: string;
  rank: number;
  avatar?: string;
  nameField: string;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  decklist?: string;
  name?: string;
  moxfieldUrl?: string;
  deckUpdatedAt?: string;
  deckChanges?: string;
  winsAtLastUpdate?: number;
  lossesAtLastUpdate?: number;
};
