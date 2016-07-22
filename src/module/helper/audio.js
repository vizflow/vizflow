let AudioContext = window.AudioContext // Default
  || window.webkitAudioContext // Safari and old versions of Chrome
  || window.mozAudioContext 
  || window.oAudioContext 
  || window.msAudioContext  
  || false ; 

 // create a dummy sound - and play it immediately in same 'thread'
 // var oscillator = AudioContext.createOscillator();
 // oscillator.frequency.value = 40 ;
 // oscillator.connect(AudioContext.destination);
 // oscillator.start(0);
 // oscillator.stop(.1);    // you can set this to zero, but I left it here for testing.

let audioHelper = {

  context: new AudioContext(), // this one AudioContext object instance can be shared by many copies of the audioHelper object instance (via Object.copy)

  buffer: undefined,

  source: undefined,

  gain: undefined,

  volume: 1.0,

  loop: false,

  setup: function(audio) {

    if(audio === undefined) {
      audio = this ;
    }

    // console.log('audioHelper:', 'audioHelper.context', audioHelper.context) ;

    var sourceNode = audioHelper.context.createBufferSource() ;

    // console.log('sourceNode', sourceNode) ;

    if(audio.buffer !== undefined && audio.buffer !== null) {
      sourceNode.buffer = audio.buffer ;
    } else {
      console.log('audioHelper.setup: no audio loaded') ;
    }

    sourceNode.loop = audio.loop ;

    if(audio.gain === undefined) {

      // console.log('before gain create') ;

      var gainNode = audioHelper.context.createGain === undefined ? audioHelper.context.createGainNode() : audioHelper.context.createGain() ; // create the gain node

      // console.log('after gainNode create', 'gainNode', gainNode) ;

      gainNode.value = audio.volume ;
      gainNode.connect( audioHelper.context.destination ) ; // connect gain filter to destination,

      audio.gain = gainNode ;

    } else {
      var gainNode = audio.gain ;
    }

    // audio.source = sourceNode ;

    sourceNode.connect( gainNode ) ; // connect source to filter    

    return sourceNode ;

  },

  fade: function audio_helper_fade_out ( dur, delay, volume, audio ) {

    if( audio === undefined ) {
      audio = this ;
    }

    if( dur === undefined ) {
      dur = 1 ;
    }

    if( delay === undefined ) {
      delay = 0 ;
    }

    if( volume === undefined ) {
      if( audio.gain === undefined ) {
        audio.setup() ;
      }
      if( audio.gain.gain.value > 0 ) {
        volume = 0 ; // fade out if current gain is higher than zero
      } else {
        volume = audio.volume ; // otherwise fade into the current default volume for this sound
      }
    }

    var gainNode = audio.gain ;
    var now      = audioHelper.context.currentTime ;
    
    gainNode.gain.cancelScheduledValues( now ) ;

    gainNode.gain.linearRampToValueAtTime( gainNode.gain.value, now + delay ) ;
    gainNode.gain.linearRampToValueAtTime( volume, now + dur + delay ) ;
  
  },

  play: function audio_play( start, futureSwitch, buffer, audio ) {

    if(audio === undefined) {
      audio = this ;
    }

    if ( buffer === undefined ) {
      buffer = this.buffer ;
    }

    // console.log('audio play', 'buffer', buffer, 'audioHelper.context', audioHelper.context) ;

    var sourceNode = audio.setup() ;

    // console.log('audioHeloper play', 'this', this) ;

    var gainNode = audio.gain ;

    if ( start === undefined ) {
      start = 0 ;
    }

    if ( futureSwitch === undefined ) {
      futureSwitch = true ;
    }

    var now ;

    if ( futureSwitch ) {
      now = audioHelper.context.currentTime ;
    } else {
      now = 0 ;
    }

    // console.log('audioHelper play:', 'sourceNode', sourceNode, 'sourceNode.start', sourceNode.start, 'now', now) ;

    gainNode.gain.cancelScheduledValues( now ) ;
    gainNode.gain.value = this.volume ;
    
    sourceNode.start ? sourceNode.start(now + start) : sourceNode.noteOn(now + start) ;

    // try {
    //   sourceNode.start() ;
    // } catch (e) {
    //   console.log('audiohelper error', 'e', e); // pass exception object to error handler
    // }

  },

  // b2a: function audio_arrayBufferToBase64( buffer ) {
  //  if( buffer === undefined ) {
  //    buffer = this.buffer ;
  //  }
 //    var binary = '';
 //    var bytes = new Uint8Array( buffer );
 //    var len = bytes.byteLength;
 //    for (var i = 0; i < len; i++) {
 //        binary += String.fromCharCode( bytes[ i ] );
 //    }
 //    return window.btoa( binary );
  // },

  // dataUrl: function getData(audioFile, callback) {
  //  if(callback === undefined) {
  //    callback = function(dataUrl) {
  //      console.log('dataUrl', dataUrl) ;
  //    }
  //  }
 //    var reader = new FileReader();
 //    reader.onload = function(event) {
 //        var data = event.target.result.split(',') ;
 //        console.log('data', data, 'event', event, 'event.target', event.target) ;
 //        var decodedData = btoa(data[1]) ; // the actual conversion of data from binary to base64 format
 //        callback(decodedData) ;        
 //    };
 //    reader.readAsDataURL(new File([], audioFile));
  // },
} ;

audioHelper.buffer = audioHelper.context.createBuffer(2, 735, 44100) ; // blank default stereo buffer, 1/60 sec duration

export { audioHelper as default }