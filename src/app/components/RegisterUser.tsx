"use client";
import { useState } from 'react';

export default function RegisterUser() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const register = async () => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
    if (response.ok) {
      alert('User registered successfully');
    } else {
      alert('User already exists');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Register User</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={register} className="bg-blue-500 text-white py-2 px-4 rounded">
        Register
      </button>
    </div>
  );
}