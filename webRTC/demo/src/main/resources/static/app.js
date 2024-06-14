const localVideo = document.getElementById('localVideo');
const videosContainer = document.getElementById('videos');

let localStream;
const peerConnections = {};
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};

const socket = new WebSocket('ws://localhost:8080/ws');

socket.onmessage = async (message) => {
  const data = JSON.parse(message.data);

  switch (data.type) {
    case 'offer':
      handleOffer(data.offer, data.sender);
      break;
    case 'answer':
      handleAnswer(data.answer, data.sender);
      break;
    case 'candidate':
      handleCandidate(data.candidate, data.sender);
      break;
    case 'new-peer':
      createOffer(data.sender);
      break;
    default:
      break;
  }
};

navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    localVideo.srcObject = stream;
    localStream = stream;

    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'join-room' }));
    };
  })
  .catch(error => console.error('Error accessing media devices.', error));

function createPeerConnection(peerId) {
  const peerConnection = new RTCPeerConnection(configuration);

  peerConnection.onicecandidate = ({ candidate }) => {
    if (candidate) {
      socket.send(JSON.stringify({ type: 'candidate', candidate, receiver: peerId }));
    }
  };

  peerConnection.ontrack = (event) => {
    let remoteVideo = document.getElementById(`video-${peerId}`);
    if (!remoteVideo) {
      remoteVideo = document.createElement('video');
      remoteVideo.id = `video-${peerId}`;
      remoteVideo.autoplay = true;
      remoteVideo.playsInline = true;
      videosContainer.appendChild(remoteVideo);
    }
    remoteVideo.srcObject = event.streams[0];
  };

  localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
  peerConnections[peerId] = peerConnection;
  return peerConnection;
}

async function createOffer(peerId) {
  const peerConnection = createPeerConnection(peerId);
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.send(JSON.stringify({ type: 'offer', offer, receiver: peerId }));
}

async function handleOffer(offer, sender) {
  const peerConnection = createPeerConnection(sender);
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.send(JSON.stringify({ type: 'answer', answer, receiver: sender }));
}

async function handleAnswer(answer, sender) {
  const peerConnection = peerConnections[sender];
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

async function handleCandidate(candidate, sender) {
  const peerConnection = peerConnections[sender];
  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}

