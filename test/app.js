const constraints = {
  'video': {
    'width': {
      'min': 640,
      'max': 1024
    },
    'height': {
      'min': 480,
      'max': 768
    },
    'cursor': 'always' | 'motion' | 'never',
    'displaySurface': 'application' | 'browser' | 'monitor' | 'window'
  },
  'audio': true
};

function getSingleDevice() {
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      console.log('Got MediaStream: ', stream);
    })
    .catch(error => {
      console.error('Error accessing media devices.', error);
    });
}

function getConnectedDevices(type, callback) {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      const filtered = devices.filter(device => device.kind === type);
      callback(filtered);
    });
}

async function playVideoFromCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const videoElement = document.querySelector('#local-video');
    videoElement.srcObject = stream;
    console.log(stream);
  } catch (error) {
    console.log('Error opening video camera. ', error);
  }
}

// playVideoFromCamera();
