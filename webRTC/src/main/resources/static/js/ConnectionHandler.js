export class ConnectionHandler {
  #signalingServer;
  #localStream;
  #remoteStream;
  #id;
  #configuration;
  #peerConnection;

  #localVideo;
  #remoteVideo;
  #didIOffer;

  constructor() {
    this.#signalingServer = new WebSocket('ws://localhost:8080/socket');
    this.#localVideo = document.getElementById('local-video');
    this.#remoteVideo = document.getElementById('remote-video');
    this.#didIOffer = false;
    this.#configuration = {
      iceServers: [
        {
          urls: [
            'stun:stun.l.google.com:19302'
            // 'stun:stun1.l.google.com:19302'
          ]
        }
      ]
    };
    this.#signalingServerMessages();
  }

  async #signalingServerMessages() {
    this.#signalingServer.onmessage = (message) => {
      const data = JSON.parse(message.data);
      switch (data.type) {
        case 'new-user':
          this.#id = data.id;
          break;
        case 'answer-offer':
          this.#answerOffer(data.offer, data.id);
          break;
        case 'answer-back-offer':
          // console.log(data);
          this.#answerBackOffer(data.offer, data.offererId);
          break;
        case 'add-ice-candidates':
          console.log(data);
          this.#addIceCandidate(data.iceCandidates);
          break;
        default:
          break;
      }
    };
  }

  async call() {
    await this.#getUserMedia();
    await this.#createPeerConnection();

    try {
      console.log("Creating offer...");
      const offer = await this.#peerConnection.createOffer();
      this.#didIOffer = true;
      this.#peerConnection.setLocalDescription(offer);
      this.#signalingServer.send(JSON.stringify({
        type: 'answer-offer',
        offer: offer,
        id: this.#id
      }));
    } catch (error) {
      console.log(error);
    }
  }

  async #getUserMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.#localVideo.srcObject = stream;
      this.#localStream = stream;
    } catch (err) {
      console.log(err);
    }
  }

  async #createPeerConnection(offerObj) {
    if (this.#signalingServer) {
      this.#peerConnection = new RTCPeerConnection(this.#configuration);
      this.#remoteStream = new MediaStream();
      this.#remoteVideo.srcObject = this.#remoteStream;

      this.#localStream.getTracks().forEach(track => {
        this.#peerConnection.addTrack(track, this.#localStream);
      });

      this.#peerConnection.addEventListener("signalingstatechange", (event) => {
        console.log(event);
        console.log(this.#peerConnection.signalingState);
      });

      this.#peerConnection.addEventListener('icecandidate', (event) => {
        console.log('Ice Candidate found');
        console.log(event);

        if (event.candidate) {
          this.#signalingServer.send(JSON.stringify({
            type: 'ice-candidate',
            iceCandidate: JSON.stringify(event.candidate)
          }));
        }
      });

      this.#peerConnection.addEventListener('track', (event) => {
        console.log('Got a track');
        console.log(event);

        event.streams[0].getTracks().forEach(track => {
          this.#remoteStream.addTrack(track, this.#remoteStream);
          console.log('Here is where we will breathe');
        });
      });

      if (offerObj) {
        console.log(offerObj);
        await this.#peerConnection.setRemoteDescription(offerObj);
      }
    }
  }

  async #answerBackOffer(answer, offererId) {
    await this.#peerConnection.setRemoteDescription(answer);

    this.#signalingServer.send(JSON.stringify({
      type: 'add-ice-candidates',
      offererId: offererId,
      answerId: this.#id
    }));
  }

  async #answerOffer(offerObj, id) {
    await this.#getUserMedia();
    await this.#createPeerConnection(offerObj);
    const answer = await this.#peerConnection.createAnswer({});
    await this.#peerConnection.setLocalDescription(answer);

    console.log(offerObj);
    console.log(answer);

    offerObj.answer = answer;
    this.#signalingServer.send(JSON.stringify({
      type: 'add-ice-candidates',
      offererId: id,
      answererId: this.#id
    }));

    this.#signalingServer.send(JSON.stringify({
      type: 'answer-back-offer',
      offer: answer,
      answererId: id,
      offererId: this.#id 
    }));
  }

  #addIceCandidate(iceCandidates) {
    for (let i = 0; i < iceCandidates.length; i++) {
      const candidate = JSON.parse(iceCandidates[i]);
      this.#peerConnection.addIceCandidate(candidate);
      console.log(candidate);
    }
  }
}
