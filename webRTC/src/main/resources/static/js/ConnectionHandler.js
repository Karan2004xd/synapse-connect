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
            'stun:stun.l.google.com:19302',
            'stun:stun1.l.google.com:19302'
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
        case 'ice-candidate':
          this.#addIceCandidate(data.iceCandidate);
          break;
        case 'create-offer':
          this.#answerOffer(data.offer, data.iceCandidates);
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
        type: 'create-offer',
        offer: offer,
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
            iceCandidate: event.candidate
          }));
        }
      });

      if (offerObj) {
        await this.#peerConnection.setRemoteDescription(offerObj.offer);
      }
    }
  }

  async #answerOffer(offerObj, iceCandidates) {
    // console.log(offerObj, iceCandidates);
    // this.#addIceCandidate(iceCandidates);
    // await this.#getUserMedia();
    // await this.#createPeerConnection(offerObj);
    // const answer = await this.#peerConnection.createAnswer({});
    // await this.#peerConnection.setLocalDescription(answer);

    // console.log(offerObj);
    // console.log(answer);

    // offerObj.answer = answer;

    // const offerIceCandidates = await 
  }

  #addIceCandidate(iceCandidate) {
    console.log(iceCandidate);
    this.#peerConnection.addIceCandidate(iceCandidate);

    // for (let i = 0; i < iceCandidates.length; i++) {
    //   this.#peerConnection.addIceCandidate(iceCandidates[i]);
    // }
    console.log('Ice Candidate added');
  }
}
