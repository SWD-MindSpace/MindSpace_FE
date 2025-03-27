"use client";

import VideoRoom from "@/features/video-chat/components/VideoRoom";

/**
 * Props interface for the VideoRoomPage component
 */
interface VideoRoomPageProps {
  params: {
    roomId: string;
  };
}

/**
 * Page component for video chat room
 * Delegates actual implementation to the VideoRoom feature component
 */
export default function VideoRoomPage({ params }: VideoRoomPageProps) {
  return <VideoRoom roomId={params.roomId} />;
}
