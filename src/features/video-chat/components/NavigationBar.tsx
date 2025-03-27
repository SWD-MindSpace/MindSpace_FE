"use client";

import React from "react";

type NavigationBarProps = {
  roomId: string;
  setRoomId: (id: string) => void;
  handleJoinRoom: (e: React.FormEvent) => void;
};

export default function NavigationBar({
  roomId,
  setRoomId,
  handleJoinRoom,
}: NavigationBarProps) {
  return (
    <nav className="bg-white border-b-1 py-4 px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium text-black">Video Consultation</h2>

        <form onSubmit={handleJoinRoom} className="flex">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID"
            className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded-r-md hover:bg-gray-800"
          >
            Join Room
          </button>
        </form>
      </div>
    </nav>
  );
}
