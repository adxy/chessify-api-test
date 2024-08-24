import React, { useEffect, useState } from 'react';

const ChessDataPage = () => {
  const [rounds, setRounds] = useState(null);
  const [games, setGames] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRounds = async () => {
      try {
        const roundsRes = await fetch('https://livestream.chessify.me/api/get_rounds?id=y7UcOAkO');
        const roundsData = await roundsRes.json();
        setRounds(roundsData);
      } catch (err) {
        setError(err.message);
      }
    };

    const fetchGames = async () => {
      try {
        const gamesRes = await fetch('https://livestream.chessify.me/api/get_games?round_id=t0hVcD2t');
        const gamesData = await gamesRes.json();
        setGames(gamesData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRounds();
    fetchGames();
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Chess Rounds and Games</h1>

      <section>
        <h2>Rounds</h2>
        <pre>{JSON.stringify(rounds, null, 2)}</pre>
      </section>

      <section>
        <h2>Games</h2>
        <pre>{JSON.stringify(games, null, 2)}</pre>
      </section>
    </div>
  );
};

export default ChessDataPage;
