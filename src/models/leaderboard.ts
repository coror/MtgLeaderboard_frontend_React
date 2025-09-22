import { Player } from './player';

export type LeaderboardProps = {
  classDB: string;
  nameField: string;
};

export type PodiumSectionProps = {
  players: Player[];
  onPlayerClick: (player: Player) => void;
};

export type RegularLeaderboardProps = {
  players: Player[];
  onPlayerClick: (player: Player) => void;
};
