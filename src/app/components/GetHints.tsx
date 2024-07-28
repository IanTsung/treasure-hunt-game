"use client";
import { useState } from 'react';

interface Hint {
  question: string;
  nextQuestionId: number;
}

export default function GetHints() {
  const [email, setEmail] = useState<string>('');
  const [hint, setHint] = useState<Hint | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<boolean>(false);

  const getHints = async () => {
    setLoading(true);
    setError(null);
    setAttempted(true);
    console.log(`Fetching hints for email: ${email}`);
    try {
      const response = await fetch(`/api/hints?email=${email}`);
      console.log('Response status:', response.status);
      if (response.ok) {
        const data = await response.json();
        console.log('Hints data:', data);
        setHint(data);
      } else {
        setError('Error retrieving hints');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error retrieving hints');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Get Hints</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={getHints} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        {loading ? 'Loading...' : 'Get Hints'}
      </button>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {attempted && !loading && !hint && (
        <div className="text-gray-500">No hints available.</div>
      )}
      {hint && (
        <div>
          <h3 className="text-lg mb-2">Hint:</h3>
          <p>{hint.question}</p>
          <p>Next Question ID: {hint.nextQuestionId}</p>
        </div>
      )}
    </div>
  );
}