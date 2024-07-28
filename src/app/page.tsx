"use client";
import RegisterUser from './components/RegisterUser';
import UpdateLocation from './components/UpdateLocation';
import GetHints from './components/GetHints';
import SubmitAnswer from './components/SubmitAnswer';
import FindTreasure from './components/FindTreasure';
import GetLeaderboard from './components/GetLeaderboard';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Treasure Hunt Game</h1>
      <RegisterUser />
      <UpdateLocation />
      <GetHints />
      <SubmitAnswer />
      <FindTreasure />
      <GetLeaderboard />
    </div>
  );
}