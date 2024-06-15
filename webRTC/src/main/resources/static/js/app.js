import { ConnectionHandler } from "./ConnectionHandler.js";

const joinMeetingBtn = document.getElementById('join-meeting');

joinMeetingBtn.addEventListener('click', async () => {
  const newConnection = new ConnectionHandler();
  newConnection.call();
})
