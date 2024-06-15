export class ConnectionHandler {
  #signalingServer;
  #localStream;

  constructor() {
    this.#signalingServer = new WebSocket('ws://localhost:8080/socket');
    this.#localStream;
  }

  async #getUserMedia() {
    return new Promise( async (resolve, reject) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.#localStream = stream;
        resolve();
      } catch (err) {
        console.log(err);
        reject();
      }
    });
  }
}
