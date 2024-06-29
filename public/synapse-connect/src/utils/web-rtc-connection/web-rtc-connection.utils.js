const configuration = {
  iceServers: [
    {
      urls: [
        'stun:stun.l.google.com:19302'
      ]
    }
  ]
};

let signalingServer;
let localStream, remoteStream;

const WebRTCConnection = (localVideo, remoteVideo, sessionLink) => {
  if (!signalingServer) {
    signalingServer = new WebSocket('ws://localhost:8080/room');
  }

  const getUserMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
      localStream = stream;
      localVideo.srcObject = stream;
    } catch (error) {
      console.log(error);
    }
  };

};

export default WebRTCConnection;
