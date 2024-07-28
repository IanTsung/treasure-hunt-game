"use client";
import { useState } from 'react';

interface LeaderboardEntry {
  player: string;
  score: number;
}

export default function GetLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLeaderboard = async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching leaderboard');
    try {
      const response = await fetch(`/api/leaderboard`);
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Leaderboard data:', data);
        setLeaderboard(data);
      } else {
        setError('Error retrieving leaderboard');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error retrieving leaderboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Get Leaderboard</h2>
      <button onClick={getLeaderboard} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        {loading ? 'Loading...' : 'Get Leaderboard'}
      </button>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {leaderboard.length > 0 && (
        <div>
          <h3 className="text-lg mb-2">Leaderboard:</h3>
          <ul className="list-disc pl-5">
            {leaderboard
            .filter(entry => entry.player)
            .map((entry, index) => (
              <li key={index}>
                {entry.player}: {entry.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}