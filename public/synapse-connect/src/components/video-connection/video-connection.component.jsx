import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../../context/room.context";
import WebRTCConnection from "../../utils/web-rtc-connection/web-rtc-connection.utils";

const VideoConnection = ({ localVideoRef, remoteVideoRef, ...otherProps }) => {
  useEffect(() => {
    // WebRTCConnection(localVideoRef.current, remoteVideoRef.current);
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
