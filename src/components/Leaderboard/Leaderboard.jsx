import React, { useEffect, useState } from 'react';
import Parse from 'parse';
import LeaderboardSlot from './LeaderboardSlot';
import classes from './Leaderboard.module.css';

const Leaderboard = ({ className, nameField }) => {
  const [data, setData] = useState([]);
  const [sessionToken, setSessionToken] = useState(
    localStorage.getItem('sessionToken')
  );

  useEffect(() => {
    setSessionToken(localStorage.getItem('sessionToken'));
  }, []); // Run once on mount to get initial sessionToken

  const fetchDataForLeaderboard = async () => {
    const query = new Parse.Query(className);
    query.ascending('rank');
    query.include('avatar');

    try {
      const result = await query.find({ useMasterKey: false });
      console.log(result);

      const datas = result.map((data) => ({
        rank: data.get('rank'),
        avatar:
          data.get('avatar') && data.get('avatar').get('avatar')
            ? data.get('avatar').get('avatar').url()
            : '',
        nameField: data.get(nameField),
        winRate: data.get('winRate'),
        gamesWon: data.get('gamesWon'),
        gamesLost: data.get('gamesLost'),
        gamesPlayed: data.get('gamesPlayed'),
      }));

      setData(datas);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sessionToken) {
      fetchDataForLeaderboard();
    }
  }, [sessionToken]);

  return (
    <ul className={classes.ul}>
      {data.map((deck) => (
        <LeaderboardSlot key={deck.nameField} {...deck} />
      ))}
    </ul>
  );
};

export default Leaderboard;
