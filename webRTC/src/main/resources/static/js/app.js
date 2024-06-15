import { ConnectionHandler } from "./ConnectionHandler.js";

const newConnection = new ConnectionHandler();
const stream = await newConnection.getUserMedia();

const joinMeetingBtn = document.getElementById('join-meeting');

joinMeetingBtn.addEventListener('click', async () => {
  await newConnection.createOfferAndSend(stream);
})
