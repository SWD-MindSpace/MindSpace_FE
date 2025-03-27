"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

// Feature components
import NavigationBar from "./NavigationBar";
import FeaturesGrid from "./FeaturesGrid";

export default function VideoChatPage() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim()) {
      toast.error("Please enter a room ID");
      return;
    }
    router.push(`/video-chat/${roomId}`);
  };

  return (
    <div className="flex flex-col">
      <NavigationBar
        roomId={roomId}
        setRoomId={setRoomId}
        handleJoinRoom={handleJoinRoom}
      />

      <div className="mb-6">
        <h1 className="text-2xl font-medium text-black mt-4">
          Video Consultation
        </h1>
        <p className="text-gray-600 mt-2">
          Enter a room ID in the form above to join a video consultation session
        </p>
      </div>

      <FeaturesGrid />
    </div>
  );
}
