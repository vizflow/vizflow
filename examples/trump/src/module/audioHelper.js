var AudioContext = window.AudioContext // Default
  || window.webkitAudioContext // Safari and old versions of Chrome
  || window.mozAudioContext 
  || window.oAudioContext 
  || window.msAudioContext  
  || false; 

var audioHelper = {

  context: new AudioContext(), // this one AudioContext object instance can be shared by many copies of the audioHelper object instance (via copy_object)

	buffer: undefined,

	volume: 0.25,

	play: function audio_play( buffer, start, futureSwitch ) {

		if ( buffer === undefined ) {
			buffer = this.buffer ;
		}

		// console.log('audio play', 'buffer', buffer, 'audioHelper.context', audioHelper.context) ;

		var sourceNode = audioHelper.context.createBufferSource() ;
		if(buffer !== undefined && buffer !== null) {
			sourceNode.buffer = buffer ;
		} else {
			console.log('audioHelper.play: no audio loaded') ;
		}

		var gainNode = audioHelper.context.createGain(); // create the gain node
		sourceNode.connect(gainNode); // connect source to filter

		// console.log('audioHeloper play', 'this', this) ;

		gainNode.gain.value = this.volume ;
		
		gainNode.connect( audioHelper.context.destination ) ; // connect gain filter to destination,

		if ( start === undefined ) {
			start = 0 ;
		}

		if ( futureSwitch === undefined ) {
			futureSwitch = false ;
		}

		var now ;

		if ( futureSwitch ) {
			now = audioHelper.context.currentTime ;
		} else {
			now = 0 ;
		}

		sourceNode.start ? sourceNode.start(now + 0) : sourceNode.noteOn(now + 0) ;

		// try {
		//   sourceNode.start()	;
		// } catch (e) {
  //     console.log('audiohelper error', 'e', e); // pass exception object to error handler
		// }

	},

	// b2a: function audio_arrayBufferToBase64( buffer ) {
	// 	if( buffer === undefined ) {
	// 		buffer = this.buffer ;
	// 	}
 //    var binary = '';
 //    var bytes = new Uint8Array( buffer );
 //    var len = bytes.byteLength;
 //    for (var i = 0; i < len; i++) {
 //        binary += String.fromCharCode( bytes[ i ] );
 //    }
 //    return window.btoa( binary );
	// },

	// dataUrl: function getData(audioFile, callback) {
	// 	if(callback === undefined) {
	// 		callback = function(dataUrl) {
	// 			console.log('dataUrl', dataUrl) ;
	// 		}
	// 	}
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

// console.log('audioHelper end', 'audioHelper', audioHelper) ;