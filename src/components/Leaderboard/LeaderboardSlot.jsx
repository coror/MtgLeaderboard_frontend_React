import classes from './LeaderboardSlot.module.css';

export default function LeaderboardSlot({
  rank,
  avatar,
  nameField,
  winRate,
  gamesWon,
  gamesLost,
  gamesPlayed,
}) {
  return (
    <>
      <div className={classes.container}>
        <div className={classes.rank}>{rank}</div>
        <div className={classes.avatar}>
          <img
            className={classes.img}
            src={avatar}
            alt={`Avatar of ${nameField}`}
          />
        </div>
        <div className={classes.info}>
          <div className={classes.nameField}>{nameField}</div>
          <div className={classes.stats}>
            <div className={classes.gamesWon}>W {gamesWon}</div>
            <div className={classes.gamesLost}>L {gamesLost}</div>
            <div className={classes.gamesPlayed}>GP {gamesPlayed}</div>
            <div className={classes.winRate}>WR {winRate}%</div>
          </div>
        </div>
      </div>
    </>
  );
}
