import { useContext, useState } from "react";
import { RoomContext } from "../../context/room.context";

const signalingServer = new WebSocket('ws://localhost:8080/room');

export const WebRTCConnection = ({ localVideoRef, remoteVideoRef }) => {
  const { sessionLink } = useContext(RoomContext);
  const [sessionId, setSessionId] = useState(null);
  
};
