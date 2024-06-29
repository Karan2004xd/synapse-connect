import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../context/room.context";

const signalingServer = new WebSocket('ws://localhost:8080');

const WebRTCConnection = () => {
  const { sessionLink } = useContext(RoomContext);
  const [sessionId, setSessionId] = useState(null);
  
};

const VideoConnection = ({ localVideoRef, remoteVideoRef, ...otherProps }) => {
  useEffect(() => {
    // navigator.mediaDevices.getUserMedia({video: true, audio: true})
    //   .then(stream => {
    //     if (localVideoRef.current) {
    //       localVideoRef.current.srcObject = stream;
    //     }
    //   })
    //   .catch(error => {
    //     console.error('Error accessing the media stream', error);
    //   })
  }, [localVideoRef]);

  return (
    <div className="main-div">
      <video ref={localVideoRef} {...otherProps} />
      <video ref={remoteVideoRef} {...otherProps} />
    </div>
  );
};

export default VideoConnection;
