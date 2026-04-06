import { useState } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';

interface Commander {
  objectId: string;
  name: string;
  avatar: string;
  gamesPlayed: number;
}

interface MatchSuggestion {
  commander1: Commander;
  commander2: Commander;
  gamesPlayed: number;
  isNewRound: boolean;
}

export default function useNextMatch() {
  const [suggestion, setSuggestion] = useState<MatchSuggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const findNextMatch = async () => {
    setIsLoading(true);
    setError(null);
    setSuggestion(null);

    try {
      // 1. Fetch all commanders
      const query = new Parse.Query('Edh');
      query.ascending('rank');
      query.include('avatar');
      const results = await query.find();

      const commanders: Commander[] = results.map((d: Parse.Object) => ({
        objectId: d.id,
        name: d.get('deckName') as string,
        avatar:
          d.get('avatar') && d.get('avatar').get('avatar')
            ? d.get('avatar').get('avatar').url()
            : '',
        gamesPlayed: (d.get('gamesPlayed') as number) || 0,
      }));

      if (commanders.length < 2) {
        setError('Need at least 2 commanders');
        return;
      }

      // 2. Fetch matchup data for each commander
      const matchupMap: Record<string, Record<string, number>> = {};
      for (const cmd of commanders) {
        matchupMap[cmd.objectId] = {};
      }

      const statsPromises = commanders.map((cmd) =>
        Parse.Cloud.run('getAllMatchupsForDeck', { edhId: cmd.objectId })
      );
      const allStats = await Promise.all(statsPromises);

      for (let i = 0; i < commanders.length; i++) {
        const stats = allStats[i];
        if (stats?.matchups) {
          for (const matchup of stats.matchups) {
            matchupMap[commanders[i].objectId][matchup.opponentId] =
              matchup.gamesPlayed;
          }
        }
      }

      // 3. Build all pairs, scored by:
      //    - Primary: lowest sum of total games (equalizes games fastest)
      //    - Secondary: fewest head-to-head games (equalizes matchups)
      const pairs: { c1: Commander; c2: Commander; h2h: number; totalSum: number }[] = [];

      for (let i = 0; i < commanders.length; i++) {
        for (let j = i + 1; j < commanders.length; j++) {
          const h2h = matchupMap[commanders[i].objectId][commanders[j].objectId] || 0;
          const totalSum = commanders[i].gamesPlayed + commanders[j].gamesPlayed;
          pairs.push({ c1: commanders[i], c2: commanders[j], h2h, totalSum });
        }
      }

      // 4. Sort: lowest totalSum first (catch up inactive commanders), then fewest h2h (equalize matchups)
      pairs.sort((a, b) => {
        if (a.totalSum !== b.totalSum) return a.totalSum - b.totalSum;
        return a.h2h - b.h2h;
      });

      // 5. Pick randomly from all pairs tied for the best score
      const best = pairs[0];
      const candidates = pairs.filter(
        (p) => p.totalSum === best.totalSum && p.h2h === best.h2h
      );
      const pick = candidates[Math.floor(Math.random() * candidates.length)];

      // Check if all pairs across the full roster are equal (new round)
      const allPairGames: number[] = [];
      for (let i = 0; i < commanders.length; i++) {
        for (let j = i + 1; j < commanders.length; j++) {
          allPairGames.push(
            matchupMap[commanders[i].objectId][commanders[j].objectId] || 0
          );
        }
      }
      const allEqual = allPairGames.every((g) => g === allPairGames[0]);

      setSuggestion({
        commander1: pick.c1,
        commander2: pick.c2,
        gamesPlayed: pick.h2h,
        isNewRound: allEqual && allPairGames[0] > 0,
      });
    } catch (err) {
      console.error('Error finding next match:', err);
      setError('Failed to determine next match');
    } finally {
      setIsLoading(false);
    }
  };

  return { suggestion, isLoading, error, findNextMatch };
}
