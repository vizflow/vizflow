var audioHelper = {
	buffer: null,
	context: new AudioContext(),

	load: function audio_load(filename, callback) {
		if( callback === undefined ) {
			callback = function() {} ;
		}
		var request = new XMLHttpRequest() ;
		request.open('get', filename, true) ;
		request.responseType = 'arraybuffer' ;
		var _this = this ; 
		request.onload = function () {
			// console.log('request.response', request.response) ;
			_this.context.decodeAudioData( request.response, function(buffer) { 
				_this.buffer = buffer ;
				callback() ;
			}) ;
		}
		request.send() ;
	}, 

	play: function audio_play( buffer, start, futureSwitch ) {

		if ( buffer === undefined ) {
			buffer = this.buffer ;
		}

		// console.log('audio play', 'buffer', buffer) ;

		var sourceNode = this.context.createBufferSource() ;
		if(buffer !== undefined && buffer !== null) {
			sourceNode.buffer = buffer ;
		} else {
			console.log('audioHelper.play: no audio loaded') ;
		}
		
		sourceNode.connect( this.context.destination ) ;

		if ( start === undefined ) {
			start = 0 ;
		}

		if ( futureSwitch === undefined ) {
			futureSwitch = false ;
		}

		var now ;

		if ( futureSwitch ) {
			now = this.context.currentTime ;
		} else {
			now = 0 ;
		}

		sourceNode.start( now + 0 )	;

	},

	b2a: function audio_arrayBufferToBase64( buffer ) {
		if( buffer === undefined ) {
			buffer = this.buffer ;
		}
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
	}	

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