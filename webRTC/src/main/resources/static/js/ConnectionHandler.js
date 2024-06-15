// export class ConnectionHandler {
//   #configuration;
//   #socket;
//   #peerConnections = {};
//   #localStream;

//   constructor() {
//     this.#configuration = {
//       iceServers: [
//         { urls: 'stun:stun.l.google.com:19302' }
//       ]
//     };

//     this.#socket = new WebSocket("ws://localhost:8080/socket");

//     this.#socket.onmessage = this.#handleSocketMessage.bind(this);
//   }

//   async getUserMedia() {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//       const videoElement = document.querySelector('#local-video');
//       videoElement.srcObject = stream;
//       this.#localStream = stream;
//       return stream;
//     } catch (error) {
//       console.error('Error accessing media devices.', error);
//     }
//   }

//   async createOfferAndSend() {
//     const peerId = `Id-${Math.random(10)}`; // Replace 'self' with unique peer ID if needed
//     const peerConnection = this.#createPeerConnection(peerId);

//     this.#localStream.getTracks().forEach(track => peerConnection.addTrack(track, this.#localStream));

//     const offer = await peerConnection.createOffer();
//     await peerConnection.setLocalDescription(offer);

//     this.#socket.send(JSON.stringify({
//       type: 'offer',
//       offer: offer,
//       sender: peerId
//     }));
//   }

//   #createPeerConnection(peerId) {
//     const peerConnection = new RTCPeerConnection(this.#configuration);

//     peerConnection.onicecandidate = (event) => {
//       if (event.candidate) {
//         this.#socket.send(JSON.stringify({
//           type: 'candidate',
//           candidate: event.candidate,
//           sender: peerId
//         }));
//       }
//     };

//     peerConnection.oniceconnectionstatechange = () => {
//       console.log(`ICE Connection State with ${peerId}: ${peerConnection.iceConnectionState}`);
//     };

//     peerConnection.onsignalingstatechange = () => {
//       console.log(`Signaling State with ${peerId}: ${peerConnection.signalingState}`);
//     };

//     peerConnection.ontrack = (event) => {
//       let remoteVideo = document.getElementById(`video-${peerId}`);
//       if (!remoteVideo) {
//         remoteVideo = document.createElement('video');
//         remoteVideo.id = `video-${peerId}`;
//         remoteVideo.autoplay = true;
//         remoteVideo.playsInline = true;
//       }
//       console.log(event.streams[0]);
//       remoteVideo.srcObject = event.streams[0];
//       const mainDiv = document.querySelector('.main-div');
//       mainDiv.appendChild(remoteVideo);
//     };

//     this.#peerConnections[peerId] = peerConnection;
//     return peerConnection;
//   }

//   async #handleSocketMessage(message) {
//     const data = JSON.parse(message.data);

//     switch (data.type) {
//       case 'offer':
//         await this.#handleOffer(data.offer, data.sender);
//         break;
//       case 'answer':
//         await this.#handleAnswer(data.answer, data.sender);
//         break;
//       case 'candidate':
//         await this.#handleCandidate(data.candidate, data.sender);
//         break;
//       default:
//         break;
//     }
//   }

//   async #handleOffer(offer, sender) {
//     const peerConnection = this.#createPeerConnection(sender);
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

//     const answer = await peerConnection.createAnswer();
//     await peerConnection.setLocalDescription(answer);

//     this.#socket.send(JSON.stringify({
//       type: 'answer',
//       answer: answer,
//       receiver: sender
//     }));
//   }

//   async #handleAnswer(answer, sender) {
//     const peerConnection = this.#peerConnections[sender];
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
//   }

//   async #handleCandidate(candidate, sender) {
//     const peerConnection = this.#peerConnections[sender];
//     await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
//   }
// }
//

export class ConnectionHandler {
  
}
