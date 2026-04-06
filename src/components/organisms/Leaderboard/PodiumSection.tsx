import { useMemo } from 'react';
import PodiumLeaderboardSlot from '../../molecules/Leaderboard/PodiumLeaderboardSlot';
import { PodiumSectionProps } from '../../../models/leaderboard';

const EMBER_COUNT = 20;
const COLORS = ['#c9a959', '#ff6a00', '#ff3d00', '#e8d5a3', '#ff8c00'];

function EmberParticles() {
  const embers = useMemo(() =>
    Array.from({ length: EMBER_COUNT }, (_, i) => {
      const size = 2 + Math.random() * 2.5;
      const duration = 5 + Math.random() * 7;
      const color = COLORS[i % COLORS.length];
      // Evenly stagger delays across the duration so they never bunch up
      const delay = (i / EMBER_COUNT) * duration + Math.random() * 1.5;
      const sway = -20 + Math.random() * 40;
      const travel = -(150 + Math.random() * 120);

      return { id: i, size, duration, delay, color, sway, travel,
        left: `${8 + Math.random() * 84}%`,
        opacity: 0.25 + Math.random() * 0.35,
      };
    }),
  []);

  return (
    <div className='ember-particles'>
      {embers.map((e) => (
        <span
          key={e.id}
          className='ember'
          style={{
            left: e.left,
            width: e.size,
            height: e.size,
            backgroundColor: e.color,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            boxShadow: `0 0 ${e.size * 2}px ${e.color}`,
            '--ember-sway': `${e.sway}px`,
            '--ember-travel': `${e.travel}px`,
            '--ember-opacity': `${e.opacity}`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export default function PodiumSection({
  players,
  onPlayerClick,
}: PodiumSectionProps) {
  return (
    <div className='relative flex flex-row mt-24 mb-10 gap-2 overflow-visible podium-section-animate'>
      <EmberParticles />
      {players[1] && (
        <div className='podium-animate' style={{ animationDelay: '0.2s' }}>
          <PodiumLeaderboardSlot
            {...players[1]}
            podiumRank={2}
            onPlayerClick={onPlayerClick}
          />
        </div>
      )}
      {players[0] && (
        <div className='podium-animate' style={{ animationDelay: '0s' }}>
          <PodiumLeaderboardSlot
            {...players[0]}
            podiumRank={1}
            onPlayerClick={onPlayerClick}
          />
        </div>
      )}
      {players[2] && (
        <div className='podium-animate' style={{ animationDelay: '0.4s' }}>
          <PodiumLeaderboardSlot
            {...players[2]}
            podiumRank={3}
            onPlayerClick={onPlayerClick}
          />
        </div>
      )}
    </div>
  );
}
