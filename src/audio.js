// // //Load Site Assets
// require('./resonance-audio.js');

var $ = require("jquery");

// Create an AudioContext
var audioContext = new AudioContext();
var resonanceAudioScene = new ResonanceAudio(audioContext);
resonanceAudioScene.output.connect(audioContext.destination);

var roomDimensions = {
    width: 20,
    height: 10,
    depth: 20,
  };

  var smallRoom = {
    width: 5,
    height: 5,
    depth: 5,
  };


var marble = {
  // Room wall materials
  left: 'marble',
  right: 'marble',
  front: 'marble',
  back: 'marble',
  // Room floor
  down: 'marble',
  // Room ceiling
  up: 'marble',
};


var curtain = {
  // Room wall materials
  left: 'curtain-heavy',
  right: 'curtain-heavy',
  front: 'curtain-heavy',
  back: 'curtain-heavy',
  // Room floor
  down: 'curtain-heavy',
  // Room ceiling
  up: 'curtain-heavy',
};


var outdoors = {
  // Room wall materials
  left: 'transparent',
  right: 'transparent',
  front: 'transparent',
  back: 'transparent',
  // Room floor
  down: 'transparent',
  // Room ceiling
  up: 'transparent',
};



resonanceAudioScene.setRoomProperties(roomDimensions, marble);

var chord = document.createElement('audio');
chord.src = './audio/chance.mp3';
var chordSource = audioContext.createMediaElementSource(chord);

// Add the MediaElementSource to the scene as an audio input source.
var source = resonanceAudioScene.createSource();
chordSource.connect(source.input);



AFRAME.registerComponent('listener', {
  init () {
    this.cameraMatrix4 = new AFRAME.THREE.Matrix4()
},
  tick: function () { 
    this.cameraMatrix4 = this.el.object3D.matrixWorld;
    resonanceAudioScene.setListenerFromMatrix(this.cameraMatrix4);
}


});

AFRAME.registerComponent('chord', {
  tick: function () {
    source.setPosition(this.el.object3D.getWorldPosition().x, this.el.object3D.getWorldPosition().y, this.el.object3D.getWorldPosition().z);
  }
});


chord.play();
chord.crossOrigin = 'anonymous';

AFRAME.registerComponent('curtains', {
  init: function () {
       this.el.addEventListener('click', function (evt) {
        resonanceAudioScene.setRoomProperties(roomDimensions, curtain);
    });
  }
});


AFRAME.registerComponent('marble', {
  init: function () {
       this.el.addEventListener('click', function (evt) {
        resonanceAudioScene.setRoomProperties(roomDimensions, marble);
    });
  }
});


AFRAME.registerComponent('outdoors', {
  init: function () {
       this.el.addEventListener('click', function (evt) {
        resonanceAudioScene.setRoomProperties(roomDimensions, outdoors);
    });
  }
});



