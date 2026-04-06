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

      // 3. Priority 1: Find commanders with fewest total games played
      const minTotalGames = Math.min(...commanders.map((c) => c.gamesPlayed));
      const leastPlayed = commanders.filter(
        (c) => c.gamesPlayed === minTotalGames
      );

      // 4. Build candidate pairs — prefer pairs where BOTH have fewest total games.
      //    If only one has fewest, pair them with the next-lowest opponent.
      let candidatePool: Commander[];
      if (leastPlayed.length >= 2) {
        candidatePool = leastPlayed;
      } else {
        // One commander has fewer games — they must play next.
        // Find their best opponent: the one they've played least against.
        candidatePool = commanders;
      }

      // 5. Among candidate pool, build pairwise matchup counts
      const pairs: { c1: Commander; c2: Commander; games: number }[] = [];

      if (leastPlayed.length >= 2) {
        // Both from the least-played pool
        for (let i = 0; i < candidatePool.length; i++) {
          for (let j = i + 1; j < candidatePool.length; j++) {
            const games =
              matchupMap[candidatePool[i].objectId][candidatePool[j].objectId] || 0;
            pairs.push({ c1: candidatePool[i], c2: candidatePool[j], games });
          }
        }
      } else {
        // One specific commander needs a game — find who they've played least against
        const focal = leastPlayed[0];
        for (const opp of commanders) {
          if (opp.objectId === focal.objectId) continue;
          const games = matchupMap[focal.objectId][opp.objectId] || 0;
          pairs.push({ c1: focal, c2: opp, games });
        }
      }

      // 6. Pick pair with fewest head-to-head games, randomize ties
      const minH2H = Math.min(...pairs.map((p) => p.games));
      const candidates = pairs.filter((p) => p.games === minH2H);
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
        gamesPlayed: pick.games,
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
