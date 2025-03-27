import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

/**
 * Interface for WebRTC callbacks
 */
interface WebRTCCallbacks {
  onRemoteStreamCallback: (stream: MediaStream | null) => void;
  onConnectionIdCallback: (id: string | null) => void;
}

/**
 * Connection states for the SignalR connection
 */
type ConnectionState =
  | "Disconnected"
  | "Connecting"
  | "Connected"
  | "Reconnecting"
  | "Disconnecting";

/**
 * WebRTC Service for handling video chat functionality
 */
class WebRTCService {
  private connection: HubConnection | null = null;
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private currentRoom: string | null = null;
  private callbacks: WebRTCCallbacks = {
    onRemoteStreamCallback: () => {},
    onConnectionIdCallback: () => {},
  };

  // ICE server configuration for WebRTC
  private readonly rtcConfig: RTCConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun.l.google.com:5349" },
      { urls: "stun:stun1.l.google.com:3478" },
      { urls: "stun:stun1.l.google.com:5349" },
      { urls: "stun:stun2.l.google.com:19302" },
      { urls: "stun:stun2.l.google.com:5349" },
      { urls: "stun:stun3.l.google.com:3478" },
      { urls: "stun:stun3.l.google.com:5349" },
      { urls: "stun:stun4.l.google.com:19302" },
      { urls: "stun:stun4.l.google.com:5349" },
      {
        urls: "stun:stun.relay.metered.ca:80",
      },
      {
        urls: "turn:global.relay.metered.ca:80",
        username: "c25b233a28eae1c1638e1e1a",
        credential: "TJEsJh/jX/7rgRFB",
      },
      {
        urls: "turn:global.relay.metered.ca:80?transport=tcp",
        username: "c25b233a28eae1c1638e1e1a",
        credential: "TJEsJh/jX/7rgRFB",
      },
      {
        urls: "turn:global.relay.metered.ca:443",
        username: "c25b233a28eae1c1638e1e1a",
        credential: "TJEsJh/jX/7rgRFB",
      },
      {
        urls: "turns:global.relay.metered.ca:443?transport=tcp",
        username: "c25b233a28eae1c1638e1e1a",
        credential: "TJEsJh/jX/7rgRFB",
      },
    ],
  };

  /**
   * Set callbacks for handling remote stream and connection ID
   */
  setCallbacks(callbacks: WebRTCCallbacks): void {
    this.callbacks = callbacks;
  }

  /**
   * Start the SignalR connection
   */
  async startConnection(): Promise<void> {
    if (this.connection) {
      if (this.connection.state === "Connected") {
        console.log("Connection already established");
        return;
      } else if (
        this.connection.state === "Connecting" ||
        this.connection.state === "Reconnecting"
      ) {
        console.log("Connection in progress");
        return;
      }
    }

    try {
      // Create new SignalR connection
      this.connection = new HubConnectionBuilder()
        .withUrl(`${process.env.NEXT_PUBLIC_API_BASE_URL}/hub/webrtc`)
        .configureLogging(LogLevel.Information)
        .withAutomaticReconnect()
        .build();

      // Set up event handlers
      this.setupSignalREvents();

      // Start the connection
      await this.connection.start();
      console.log("SignalR connection established");

      // Notify about the connection ID
      if (this.connection.connectionId) {
        this.callbacks.onConnectionIdCallback(this.connection.connectionId);
      }
    } catch (error) {
      console.error("Error establishing SignalR connection:", error);
      throw error;
    }
  }

  /**
   * Set up SignalR event handlers
   */
  private setupSignalREvents(): void {
    if (!this.connection) return;

    // When receiving an offer from another peer
    this.connection.on(
      "ReceiveOffer",
      async (offer: RTCSessionDescriptionInit) => {
        try {
          console.log("Received offer:", offer);
          await this.createPeerConnection();
          await this.peerConnection!.setRemoteDescription(
            new RTCSessionDescription(offer)
          );
          const answer = await this.peerConnection!.createAnswer();
          await this.peerConnection!.setLocalDescription(answer);
          await this.connection!.invoke(
            "SendAnswer",
            this.currentRoom,
            JSON.stringify(answer)
          );
        } catch (error) {
          console.error("Error handling offer:", error);
        }
      }
    );

    // When receiving an answer to our offer
    this.connection.on(
      "ReceiveAnswer",
      async (answer: RTCSessionDescriptionInit) => {
        try {
          console.log("Received answer:", answer);
          if (!this.peerConnection) {
            await this.createPeerConnection();
          }
          await this.peerConnection!.setRemoteDescription(
            new RTCSessionDescription(answer)
          );
        } catch (error) {
          console.error("Error handling answer:", error);
        }
      }
    );

    // When receiving ICE candidates from another peer
    this.connection.on(
      "ReceiveIceCandidate",
      async (candidate: RTCIceCandidateInit) => {
        try {
          if (!this.peerConnection) {
            await this.createPeerConnection();
          }
          await this.peerConnection!.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
        } catch (error) {
          console.error("Error adding ICE candidate:", error);
        }
      }
    );

    // When a user joins the room
    this.connection.on("UserJoined", async (userId: string) => {
      console.log("User joined:", userId);
      try {
        // Create offer when a new user joins
        await this.createOffer();
      } catch (error) {
        console.error("Error creating offer after user joined:", error);
      }
    });

    // When a user leaves the room
    this.connection.on("UserLeft", (userId: string) => {
      console.log("User left:", userId);
      this.callbacks.onRemoteStreamCallback(null);
    });
  }

  /**
   * Join a video chat room
   */
  async joinRoom(roomId: string): Promise<void> {
    if (!this.connection || this.connection.state !== "Connected") {
      throw new Error("SignalR connection not established");
    }

    try {
      this.currentRoom = roomId;
      await this.connection.invoke("JoinRoom", roomId);
      console.log("Joined room:", roomId);
    } catch (error) {
      console.error("Error joining room:", error);
      throw error;
    }
  }

  /**
   * Leave the current video chat room
   */
  async leaveRoom(): Promise<void> {
    if (!this.connection || !this.currentRoom) return;

    try {
      await this.connection.invoke("LeaveRoom", this.currentRoom);
      console.log("Left room:", this.currentRoom);
      this.currentRoom = null;

      // Clean up RTCPeerConnection
      this.closePeerConnection();
    } catch (error) {
      console.error("Error leaving room:", error);
      throw error;
    }
  }

  /**
   * Create a WebRTC peer connection
   */
  private async createPeerConnection(): Promise<void> {
    // Close any existing connection first
    this.closePeerConnection();

    try {
      this.peerConnection = new RTCPeerConnection(this.rtcConfig);

      // Add local stream tracks to the connection
      if (this.localStream) {
        this.localStream.getTracks().forEach((track) => {
          this.peerConnection!.addTrack(track, this.localStream!);
        });
      }

      // Handle ICE candidates
      this.peerConnection.onicecandidate = async (event) => {
        if (event.candidate && this.connection && this.currentRoom) {
          await this.connection.invoke(
            "SendIceCandidate",
            this.currentRoom,
            JSON.stringify(event.candidate)
          );
        }
      };

      // Handle connection state changes
      this.peerConnection.onconnectionstatechange = () => {
        console.log("Connection state:", this.peerConnection?.connectionState);
      };

      // Handle incoming tracks
      this.peerConnection.ontrack = (event) => {
        console.log("Remote track received:", event.streams[0]);
        this.callbacks.onRemoteStreamCallback(event.streams[0]);
      };
    } catch (error) {
      console.error("Error creating peer connection:", error);
      throw error;
    }
  }

  /**
   * Create an offer to initiate a WebRTC connection
   */
  private async createOffer(): Promise<void> {
    if (!this.connection || !this.currentRoom) {
      throw new Error("Not connected to a room");
    }

    try {
      await this.createPeerConnection();
      const offer = await this.peerConnection!.createOffer();
      await this.peerConnection!.setLocalDescription(offer);
      await this.connection.invoke(
        "SendOffer",
        this.currentRoom,
        JSON.stringify(offer)
      );
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  }

  /**
   * Close and clean up the peer connection
   */
  private closePeerConnection(): void {
    if (this.peerConnection) {
      this.peerConnection.close();
      this.peerConnection = null;
    }
  }

  /**
   * Get the current SignalR connection state
   */
  getConnectionState(): ConnectionState {
    if (!this.connection) return "Disconnected";
    return this.connection.state as ConnectionState;
  }

  /**
   * Get the current room ID
   */
  getCurrentRoom(): string | null {
    return this.currentRoom;
  }

  /**
   * Set the local media stream
   */
  setLocalStream(stream: MediaStream): void {
    this.localStream = stream;

    // If we already have a peer connection, add the tracks
    if (this.peerConnection) {
      const senders = this.peerConnection.getSenders();

      // Remove existing tracks
      senders.forEach((sender) => {
        this.peerConnection!.removeTrack(sender);
      });

      // Add new tracks
      stream.getTracks().forEach((track) => {
        this.peerConnection!.addTrack(track, stream);
      });
    }
  }

  /**
   * Force disconnect the SignalR connection
   */
  async forceDisconnect(): Promise<void> {
    this.closePeerConnection();

    if (this.connection) {
      try {
        await this.connection.stop();
        this.connection = null;
        this.currentRoom = null;
        this.callbacks.onConnectionIdCallback(null);
      } catch (error) {
        console.error("Error disconnecting:", error);
        throw error;
      }
    }
  }
}

// Create singleton instance
export const webRTCService = new WebRTCService();
