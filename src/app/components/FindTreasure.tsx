"use client";
import { useState } from 'react';

export default function FindTreasure() {
  const [email, setEmail] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const findTreasure = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage(null);
    console.log(`Checking treasure location for email: ${email}`);
    try {
      const response = await fetch(`/api/find-treasure`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Find treasure data:', data);
      if (response.ok) {
        setResponseMessage(data.message || 'Treasure location checked successfully');
      } else {
        setError('Error finding treasure');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error finding treasure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Find Treasure</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={findTreasure} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        {loading ? 'Loading...' : 'Find Treasure'}
      </button>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {responseMessage && <div className="text-green-500 mb-4">{responseMessage}</div>}
    </div>
  );
}
