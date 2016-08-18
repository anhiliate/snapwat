import BufferLoader from './bufferLoader';

let context;
let bufferLoader;
let bufferList = null;

function init() {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();

  bufferLoader = new BufferLoader(
    context,
    [
      '/sounds/camera.wav'
    ],
    finishedLoading
  );

  bufferLoader.load();
}

function finishedLoading(list) {
  bufferList = list;
}

export default function() {
  init();
}

export function playCameraSound() {

  if (!bufferList || bufferList.length < 1) {
    // Not ready to play yet
    return;
  }

  let source = context.createBufferSource();
  source.buffer = bufferList[0];
  source.connect(context.destination);
  source.start(0);
}