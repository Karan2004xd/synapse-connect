const mainBody = document.querySelector('.main-body');
const addVideo = document.querySelector('button');
const videoPrototype = document.getElementById('video-prototype');


addVideo.addEventListener('click', () => {
  const newVideo = videoPrototype.cloneNode(true);
  newVideo.style.display = 'block';
  mainBody.appendChild(newVideo);
});
