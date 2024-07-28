"use client";
import { useState } from 'react';

export default function SubmitAnswer() {
  const [email, setEmail] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitAnswer = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage(null);
    console.log(`Submitting answer for email: ${email}`);
    try {
      const response = await fetch(`/api/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, answer }),
      });
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Submit answer data:', data);
      if (response.ok) {
        setResponseMessage(data.message || 'Answer submitted successfully');
      } else {
        setError('Error submitting answer');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Error submitting answer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Submit Answer</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Answer"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={submitAnswer} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        {loading ? 'Loading...' : 'Submit Answer'}
      </button>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {responseMessage && <div className="text-green-500 mb-4">{responseMessage}</div>}
    </div>
  );
}