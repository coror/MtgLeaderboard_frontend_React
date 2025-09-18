export type Player = {
  objectId: string;
  rank: number;
  avatar?: string;
  nameField: string;
  gamesLost: number;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  decklist?: string;
};
