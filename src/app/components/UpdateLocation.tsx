"use client";

import { useState } from 'react';

export default function UpdateLocation() {
  const [email, setEmail] = useState<string>('');
  const [lat, setLat] = useState<string>('');
  const [lng, setLng] = useState<string>('');

  const updateLocation = async () => {
    const response = await fetch('/api/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, location: { lat: parseFloat(lat), lng: parseFloat(lng) } }),
    });
    if (response.ok) {
      alert('Location updated successfully');
    } else {
      alert('Error updating location');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Update Location</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        placeholder="Latitude"
        className="border p-2 mb-4 w-full"
      />
      <input
        type="text"
        value={lng}
        onChange={(e) => setLng(e.target.value)}
        placeholder="Longitude"
        className="border p-2 mb-4 w-full"
      />
      <button onClick={updateLocation} className="bg-blue-500 text-white py-2 px-4 rounded">
        Update Location
      </button>
    </div>
  );
}