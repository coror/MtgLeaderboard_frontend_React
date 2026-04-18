import { useState } from 'react';
// @ts-expect-error it works, but i dont know why it shows no module found
import Parse from 'parse/dist/parse.min.js';
import { resolveAvatarUrl } from '../helpers/parseAvatar';

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
      // 1. Fetch commanders and all matchups in parallel (2 requests instead of N+1)
      const commanderQuery = new Parse.Query('Edh');
      commanderQuery.ascending('rank');
      commanderQuery.include('avatar');
      commanderQuery.select(['deckName', 'avatar', 'gamesPlayed']);

      const [results, allMatchups] = await Promise.all([
        commanderQuery.find(),
        Parse.Cloud.run('getAllMatchups'),
      ]);

      const commanders: Commander[] = results.map((d: Parse.Object) => ({
        objectId: d.id,
        name: d.get('deckName') as string,
        avatar: resolveAvatarUrl(d),
        gamesPlayed: (d.get('gamesPlayed') as number) || 0,
      }));

      if (commanders.length < 2) {
        setError('Need at least 2 commanders');
        return;
      }

      // 2. Build matchup map from the single bulk response
      const matchupMap: Record<string, Record<string, number>> = {};

      for (const m of allMatchups) {
        if (!matchupMap[m.deckOneId]) matchupMap[m.deckOneId] = {};
        if (!matchupMap[m.deckTwoId]) matchupMap[m.deckTwoId] = {};
        matchupMap[m.deckOneId][m.deckTwoId] = m.gamesPlayed;
        matchupMap[m.deckTwoId][m.deckOneId] = m.gamesPlayed;
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

      // 4. Sort: fewest h2h first (equalize all matchups), then lowest totalSum (spread new decks across opponents)
      pairs.sort((a, b) => {
        if (a.h2h !== b.h2h) return a.h2h - b.h2h;
        return a.totalSum - b.totalSum;
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
