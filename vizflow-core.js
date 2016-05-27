!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return D(e.substr(6));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", [], function (_export) {
  "use strict";

  var actionHelper;
  return {
    setters: [],
    execute: function () {
      actionHelper = {

        lastCollision: 0,

        lastAction: 0,

        collision_foreach: function action_helper_collision_foreach(viz, func) {

          // console.log('action helper collision foreach', 'viz.collision', viz.collision) ;

          if (viz.collision !== undefined && viz.collision !== null && viz.collision.count > 0) {
            // at least one collision between occurred

            for (var kCollision = 0; kCollision < viz.collision.list.length; kCollision++) {
              // loop over all collisions detected globally during the initial check (phase 1)

              // each collision involves a pair of items, each one of which can be considered the "source" and the "target" with respect to some corresponding actions

              for (var kPair = 0; kPair < 2; kPair++) {
                // either item can be considered the "source" or the "target", so loop over both and perform any corresponding actions that might exist

                var targetItem = viz.item[viz.collision.list[kCollision][kPair]]; // by convention, the target item stores the response config object for the corresponding response
                var sourceItem = viz.item[viz.collision.list[kCollision][(kPair + 1) % 2]]; // by convention, the source item is checked by the target item for the appropriateness of its type

                // console.log('collision_foreach', 'viz collision list', viz.collision.list, 'index1', viz.collision.list[kCollision][0], 'index2', viz.collision.list[kCollision][1], 'viz.item.length', viz.item.length) ;

                for (var response in targetItem.responseSet) {

                  // console.log('collision for each response set', 'response', response, 'func', func, 'sourceItem', sourceItem);

                  func(targetItem.responseSet[response], sourceItem);
                }
              }
            }
          }
        },

        detect: function action_helper_detect(viz) {

          // console.log('action helper detect') ;

          if (viz === undefined) {
            viz = this;
          }

          // console.log('action helper detect:', 'viz.item.length', viz.item.length) ;

          if ($Z.iter - actionHelper.lastCollision >= viz.config.frameDurationFactor) {
            // throttle collision detection if needed
            // this.collision_detect() ;
            // console.log('action helper detect', '$Z.iter', $Z.iter) ;
            viz.collision_detect();
            // console.log('action helper detect', 'viz.collision', viz.collision) ;

            actionHelper.collision_foreach(viz, function (response, sourceItem) {

              // console.log('action helper detect collision for each', 'response', response, 'sourceItem', sourceItem) ;

              if (response.onSwitch) {
                // perform response after passing detailed detection check
                // console.log('initial detection passed', 'sourceItem.x', sourceItem.y, 'response element x', response.element.y)
                response.performSwitch = true; // flag for performance by the visualization/animation engine loop
                response.sourceItem = sourceItem;
              }
            });

            actionHelper.lastCollision = $Z.iter;
          }
        },

        perform: function action_helper_perform(viz) {

          // console.log('actionHelper perform start') ;

          if (viz === undefined) {
            viz = this;
          }

          if ($Z.iter - actionHelper.lastAction >= viz.config.frameDurationFactor) {
            // throttle collision detection if needed

            // console.log('actionHelper perform:', 'viz.item.length', viz.item.length) ;

            actionHelper.collision_foreach(viz, function (response) {
              // console.log('action helper perform collision foreach callback start', 'response', response) ;
              if (response.performSwitch) {
                response.performSwitch = false;
                // console.log('action helper perform collision foreach callback', 'response', response) ;
                response.perform();
              }
            });

            actionHelper.lastAction = $Z.iter;
          }
        }

      };

      _export("default", actionHelper);
    }
  };
});
$__System.register('3', [], function (_export) {
  'use strict';

  var AudioContext, audioHelper;
  return {
    setters: [],
    execute: function () {
      AudioContext = window.AudioContext // Default
       || window.webkitAudioContext // Safari and old versions of Chrome
       || window.mozAudioContext || window.oAudioContext || window.msAudioContext || false;

      // create a dummy sound - and play it immediately in same 'thread'
      // var oscillator = AudioContext.createOscillator();
      // oscillator.frequency.value = 40 ;
      // oscillator.connect(AudioContext.destination);
      // oscillator.start(0);
      // oscillator.stop(.1);    // you can set this to zero, but I left it here for testing.

      audioHelper = {

        context: new AudioContext(), // this one AudioContext object instance can be shared by many copies of the audioHelper object instance (via Object.copy)

        buffer: undefined,

        source: undefined,

        gain: undefined,

        volume: 1.0,

        loop: false,

        setup: function setup(audio) {

          if (audio === undefined) {
            audio = this;
          }

          // console.log('audioHelper:', 'audioHelper.context', audioHelper.context) ;

          var sourceNode = audioHelper.context.createBufferSource();

          // console.log('sourceNode', sourceNode) ;

          if (audio.buffer !== undefined && audio.buffer !== null) {
            sourceNode.buffer = audio.buffer;
          } else {
            console.log('audioHelper.setup: no audio loaded');
          }

          sourceNode.loop = audio.loop;

          if (audio.gain === undefined) {

            // console.log('before gain create') ;

            var gainNode = audioHelper.context.createGain === undefined ? audioHelper.context.createGainNode() : audioHelper.context.createGain(); // create the gain node

            // console.log('after gainNode create', 'gainNode', gainNode) ;

            gainNode.value = audio.volume;
            gainNode.connect(audioHelper.context.destination); // connect gain filter to destination,

            audio.gain = gainNode;
          } else {
            var gainNode = audio.gain;
          }

          // audio.source = sourceNode ;

          sourceNode.connect(gainNode); // connect source to filter   

          return sourceNode;
        },

        fade: function audio_helper_fade_out(dur, delay, volume, audio) {

          if (audio === undefined) {
            audio = this;
          }

          if (dur === undefined) {
            dur = 1;
          }

          if (delay === undefined) {
            delay = 0;
          }

          if (volume === undefined) {
            if (audio.gain === undefined) {
              audio.setup();
            }
            if (audio.gain.gain.value > 0) {
              volume = 0; // fade out if current gain is higher than zero
            } else {
                volume = audio.volume; // otherwise fade into the current default volume for this sound
              }
          }

          var gainNode = audio.gain;
          var now = audioHelper.context.currentTime;

          gainNode.gain.cancelScheduledValues(now);

          gainNode.gain.linearRampToValueAtTime(gainNode.gain.value, now + delay);
          gainNode.gain.linearRampToValueAtTime(volume, now + dur + delay);
        },

        play: function audio_play(start, futureSwitch, buffer, audio) {

          if (audio === undefined) {
            audio = this;
          }

          if (buffer === undefined) {
            buffer = this.buffer;
          }

          // console.log('audio play', 'buffer', buffer, 'audioHelper.context', audioHelper.context) ;

          var sourceNode = audio.setup();

          // console.log('audioHeloper play', 'this', this) ;

          var gainNode = audio.gain;

          if (start === undefined) {
            start = 0;
          }

          if (futureSwitch === undefined) {
            futureSwitch = true;
          }

          var now;

          if (futureSwitch) {
            now = audioHelper.context.currentTime;
          } else {
            now = 0;
          }

          // console.log('audioHelper play:', 'sourceNode', sourceNode, 'sourceNode.start', sourceNode.start, 'now', now) ;

          gainNode.gain.cancelScheduledValues(now);
          gainNode.gain.value = this.volume;

          sourceNode.start ? sourceNode.start(now + start) : sourceNode.noteOn(now + start);

          // try {
          //   sourceNode.start() ;
          // } catch (e) {
          //   console.log('audiohelper error', 'e', e); // pass exception object to error handler
          // }
        }

      };
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

      _export('default', audioHelper);
    }
  };
});
$__System.register("4", ["5"], function (_export) {
  var _Object$keys;

  return {
    setters: [function (_) {
      _Object$keys = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", {

        Nval: null,

        image: null,

        pixelwise: function collision_detection_run(viz) {

          if (viz === undefined) {
            viz = this;
          }

          var item = viz.item;
          var width = viz.width;
          var height = viz.height;
          var Nitem = item.length;
          var Npel = width * height;
          var Nchannel = 2; // max 2 items per collision pixel
          var Nval = Npel * Nchannel;

          if (collisionDetect.Nval !== Nval) {

            collisionDetect.image = new Array(Nval);
          } else {

            for (var kPel = 0; kPel < collisionDetect.image.length; kPel++) {
              collisionDetect.image[kPel] = undefined; // initialize
            }
          }

          var img = collisionDetect.image;

          var collision = {}; // initialize output object

          collision.index = {};
          // for ( var kVal = 0 ; kVal < Nval ; kVal++ ) {
          //      img.push(initialValue) ; // initialize
          // }

          // collision.detect = {} ; // initialize

          // console.log('collision_detect', 'item', item, 'width', width, 'height', height) ;

          // var canvas = $Z.core.image.create(width, height) ;
          // var context = canvas.context() ;
          // context.globalAlpha = 0.5 ;

          for (var kItem = 0; kItem < Nitem; kItem++) {

            // collision.detect[item[kItem]] = {} ; // initialize

            // console.log('collisionDetect pixelwise', 'kItem', kItem) ;

            if (item[kItem].inert !== undefined && item[kItem].inert) {
              continue;
            }

            if (item[kItem].image === undefined) {
              // need a canvas image to do pixelwise collision detection
              continue;
            }

            if (item[kItem].image.originalCanvas === undefined) {

              var image = item[kItem].image;
              var imageK = $Z.core.image.get_data(image);
            } else {

              var image = item[kItem].image.originalCanvas;
              var imageK = $Z.core.image.get_data(item[kItem].image.originalCanvas);
            }

            if (item[kItem].viz !== undefined) {

              var xOrigin = item[kItem].viz.viewportX;
              var yOrigin = item[kItem].viz.viewportY;
            } else {

              var xOrigin = 0;
              var yOrigin = 0;
            }

            var itemX = Math.round(item[kItem].x - xOrigin);
            var itemY = Math.round(item[kItem].y - yOrigin);

            // context.drawImage(image, itemX, itemY) ;

            // console.log('collision detection pixelwise', 'image', image, 'imageK', imageK) ;

            // var initialPelIndex =  itemY * width                      +  itemX  ;
            // var finalPelIndex   = (itemY + imageK.height - 1) * width + (itemX + imageK.width - 1) ;

            var iStart = Math.max(0, Math.min(height, itemY));
            var iEnd = Math.max(0, Math.min(height, itemY + imageK.height));
            var jStart = Math.max(0, Math.min(width, itemX));
            var jEnd = Math.max(0, Math.min(width, itemX + imageK.width));

            // var NimagePel = image.width * image.height ;
            var NmaxPel = 4000; // skip some pixels if there are more than this many to maintain high annimation framerate
            var Nskip = Math.ceil(Npel / NmaxPel); // only use a subset of pixels if the image is too large

            // console.log('collisionDetection: ', 'Npel', Npel, 'Nskip', Nskip) ;

            // console.log('collision detection', 'kItem', kItem, 'iStart', iStart, 'iEnd', iEnd, 'jStart', jStart, 'jEnd', jEnd, 'item', item) ;

            for (var i = iStart; i < iEnd; i++) {
              for (var j = jStart; j < jEnd; j++) {

                // var i = Math.floor (kPel / width) ;
                // var j = kPel % width ;

                var kPel = i * width + j;

                if (kPel % Nskip !== 0) {
                  continue; // subsample large grids for scalability (limits processing time / controls computational complexity)
                }

                var offset = kPel * Nchannel;
                var iItem = i - iStart;
                var jItem = j - jStart;
                if (itemY < 0) {
                  iItem += -itemY;
                }
                if (itemX < 0) {
                  jItem += -itemX;
                }
                var kPelItem = Math.floor(iItem * image.width + jItem);

                var a = imageK.data[4 * kPelItem + 3]; // use alpha channel to test for presence of nonempty pixel

                if (a > 0) {

                  // if(item.length === 2 && kItem === 0) {
                  //   console.log('collision detection', 'kItem', kItem, 'kPel', kPel, 'kPelItem', kPelItem, 'iItem', iItem, 'jItem', jItem, 'a', a) ;
                  //   // break ;
                  // }

                  for (var kChannel = 0; kChannel < Nchannel - 1; kChannel++) {

                    if (img[offset + kChannel] !== undefined) {
                      // this means that two objects are occupying the same pixel i.e. a collision occurred

                      // console.log('collision occurred', 'kItem', kItem, 'item[kItem]', item[kItem], 'item[img[offset + kChannel]]', item[img[offset + kChannel]]) ;

                      img[offset + kChannel + 1] = kItem; // store the collision data
                      collision.index[img[offset + kChannel] * Nitem + kItem] = true; // use a single integer index to encode both of the integer indices for the two items that have collided
                    } else if (kChannel == 0) {

                        img[offset] = kItem; // initial item index
                      }
                  }
                }
              }
            }
          }

          // console.log('collision detection', 'img', img, 'collision', collision, 'item', item) ;

          var key = _Object$keys(collision.index);

          collision.count = 0;

          collision.list = new Array(key.length);

          for (var kKey = 0; kKey < key.length; kKey++) {
            var i = Math.floor(key[kKey] / Nitem);
            var j = key[kKey] % Nitem;

            // console.log('collision detect:', 'i', i, 'j', j, 'item.length', item.length)

            collision.list[kKey] = [i, j];

            // collision.detect[item[i]][item[j]] = true ;
            // collision.detect[item[j]][item[i]] = true ;
            collision.count++;
          }

          // console.log('collision_detect', 'collision', collision) ;

          viz.collision = collision; // update the collision output object

          // if(item.length === 2) {
          //   var dataURL = canvas.toDataURL("image/png") ;
          //   var win = window.open() ;
          //   win.document.write('<img src="' + dataURL + '"/>') ;           
          // }
        }

      });
    }
  };
});
$__System.register("6", [], function (_export) {
  "use strict";

  var drawHelper;
  return {
    setters: [],
    execute: function () {
      drawHelper = {

        item: function draw_helper_item(item, context, ratio) {
          // render item and its child items

          if (item === undefined) {
            item = this;
          }

          drawHelper.image(item);
          if (item.child !== undefined) {
            // console.log('draw helper item:', 'item.child', item.child) ;
            for (var kOver = 0; kOver < item.child.length; kOver++) {
              item.child[kOver].x = item.x;
              item.child[kOver].y = item.y;
              item.child[kOver].angle = item.angle;
              item.child[kOver].xScale = item.xScale;
              item.child[kOver].yScale = item.yScale;

              var opacity = item.child[kOver].opacity;

              if (item.childFade === true) {
                item.child[kOver].opacity = item.child[kOver].opacity * item.opacity;
              }

              // console.log('item.child[kOver]', item.child[kOver], 'item.child[kOver].x', item.child[kOver].x) ;
              item.child[kOver].render();

              item.child[kOver].opacity = opacity;
            }
          }
        },

        indexed: function draw_helper_indexed(item, canvas, width, height) {
          // takes an array of items and draws them using indexed colors

          if (canvas === undefined) {
            var canvas = $Z.core.image.create(width, height);
          } else {
            canvas.width = canvas.width; // resets the canvas simiar to clearRect
          }

          var context = canvas.context();

          for (var kItem = 0; kItem < item.length; kItem++) {

            if (item[kItem].uiSwitch === false) {
              continue;
            }

            var img;

            if (item[kItem].image.originalCanvas !== undefined) {
              img = item[kItem].image.originalCanvas;
            } else {
              img = item[kItem].image;
            }

            var imageDataK = img.context().getImageData(0, 0, item[kItem].image.width, item[kItem].image.height);

            var imageK = $Z.core.image.to_index(imageDataK, kItem); // ImageData object
            var tempCanvas = $Z.core.image.create(item[kItem].image.width, item[kItem].image.height);

            tempCanvas.context().clearRect(0, 0, tempCanvas.width, tempCanvas.height);
            tempCanvas.context().putImageData(imageK, 0, 0);

            if (item[kItem].xOrigin !== undefined) {
              var xOrigin = item[kItem].xOrigin * item[kItem].xScale;
            } else {
              var xOrigin = 0;
            }

            if (item[kItem].yOrigin !== undefined) {
              var yOrigin = item[kItem].yOrigin * item[kItem].yScale;
            } else {
              var yOrigin = 0;
            }

            context.drawImage(tempCanvas, item[kItem].x - xOrigin, item[kItem].y - yOrigin); // draw color-indexed button for color picking
          }

          // console.log('indexed draw: ', 'item', item)

          return canvas;
        },

        image: function draw_helper_image(item, context, ratio) {

          if (item === undefined) {
            item = this;
          }

          if (item.opacity === 0) {
            return;
          }

          if (context === undefined) {
            context = item.viz.fullContext;
          }

          if (ratio === undefined) {
            ratio = document.ratio;
          }

          if (item.xScale === undefined) {
            item.xScale = 1;
          }

          if (item.yScale === undefined) {
            item.yScale = 1;
          }

          // console.log('item.x', item.x, 'width', item.viz.screenCanvas.width) ;

          // console.log('draw_image', 'item', item, 'context', context, 'this', this) ;

          var viewX, viewY;

          if (item.fixed === true) {

            viewX = item.viz.viewportX;
            viewY = item.viz.viewportY;
          } else {

            viewX = 0;
            viewY = 0;
          }

          var originX = item.xOrigin * item.xScale || 0;
          var originY = item.yOrigin * item.yScale || 0;

          var dx = (item.x + item.viz.xShift + viewX - originX) * ratio;
          var dy = (item.y + item.viz.yShift + viewY - originY) * ratio;

          dx = Math.floor(dx);
          dy = Math.floor(dy);

          if (item.opacity !== undefined) {

            // console.log('item opacity', item.opacity) ;
            var alpha = context.globalAlpha;
            context.globalAlpha = item.opacity;
            var xShift = Math.floor(ratio * (item.x + item.xAngle));
            var yShift = Math.floor(ratio * (item.y + item.yAngle));
            context.translate(xShift, yShift);
            context.rotate(item.angle);
            context.translate(-xShift, -yShift);
            var dw = Math.floor(item.image.width * item.xScale);
            var dh = Math.floor(item.image.height * item.yScale);
            // console.log('draw helper', 'item', item, 'dw', dw, 'dh', dh) ;
            context.drawImage(item.image, 0, 0, item.image.width, item.image.height, dx, dy, dw, dh);
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.globalAlpha = alpha;
          } else {
            context.drawImage(item.image, dx, dy);
          }
        },

        rect: function draw_helper_rect(rect, context, ratio) {

          if (rect === undefined) {
            rect = this;
          }

          if (context === undefined) {
            context = rect.viz.fullContext;
          }

          if (ratio === undefined) {
            ratio = document.ratio;
          }

          var fillStyle = context.fillStyle;

          if (rect.color === undefined) {
            rect.color = fillStyle;
          }

          var strokeStyle = context.strokeStyle;

          if (rect.stroke === undefined) {
            rect.stroke = strokeStyle;
          }

          var xNew, yNew;

          if (rect.viz !== undefined) {

            var viewX, viewY;

            if (rect.fixed === true) {

              viewX = rect.viz.viewportX;
              viewY = rect.viz.viewportY;
            } else {

              viewX = 0;
              viewY = 0;
            }

            xNew = rect.x + rect.viz.xShift + viewX;
            yNew = rect.y + rect.viz.yShift + viewY;
          } else {

            xNew = rect.x;
            yNew = rect.y;
          }

          var yNew;
          var dx = xNew * ratio;
          var dy = yNew * ratio;

          dx = Math.floor(dx);
          dy = Math.floor(dy);

          context.beginPath();
          context.fillStyle = rect.color;
          context.strokeStyle = rect.stroke;

          if (rect.opacity !== undefined) {
            // console.log('item', rect) ;
            // var alpha = context.globalAlpha ;
            context.globalAlpha = rect.opacity;
            // context.globalAlpha = alpha ;    
          }

          // console.log('draw rect: ', 'dx, dy, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio)', dx, dy, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio)) ;

          var xShift = Math.floor(ratio * (rect.x + rect.xAngle));
          var yShift = Math.floor(ratio * (rect.y + rect.yAngle));
          context.translate(xShift, yShift);
          context.rotate(rect.angle);
          context.translate(-xShift, -yShift);

          context.rect(dx, dy, Math.floor(rect.width * ratio), Math.floor(rect.height * ratio));
          context.fill();
          context.stroke();
          context.closePath();

          context.setTransform(1, 0, 0, 1, 0, 0);

          context.fillStyle = fillStyle;
          context.strokeStyle = strokeStyle;
        },

        circle: function draw_circle(circ, context) {

          if (circ === undefined) {
            circ = this;
          }

          if (context === undefined) {
            context = circ.viz.fullContext;
          }

          context.beginPath();
          var x = circ.x;
          var y = circ.y;
          x = (x + viz.width) * ratio;
          y = (y + viz.height) * ratio;

          x = Math.floor(x);
          y = Math.floor(y);

          var r = circ.radius;
          context.arc(x, y, r, 0, Math.PI * 2, true);

          var fillStyle = context.fillStyle;

          if (circ.color === undefined) {
            circ.color = fillStyle;
          }

          context.fillStyle = circ.color;
          context.fill();
          context.closePath();

          context.fillStyle = fillStyle;
        }

      };

      _export("default", drawHelper);
    }
  };
});
$__System.register('7', ['8'], function (_export) {
  var _Object$assign, effect;

  return {
    setters: [function (_) {
      _Object$assign = _['default'];
    }],
    execute: function () {
      'use strict';

      effect = { // effect module for creating effects i.e. compositions of transitions

        zoom_inout: function effect_zoom_inout(zoomConfig, viz) {

          if (viz === undefined) {
            viz = this;
          }

          if (zoomConfig === undefined) {
            zoomConfig = {};
          }

          var viewDelta = -2 * Math.floor(viz.screenCanvas.width * 0.04);
          if (zoomConfig.width === undefined) {
            var newWidth = viz.screenCanvas.width + viewDelta;
          } else {
            newWidth = zoomConfig.width * document.ratio;
          }

          if (zoomConfig.height === undefined) {
            var newHeight = viz.screenCanvas.height + viewDelta;
          } else {
            newHeight = zoomConfig.height * document.ratio;
          }

          if (zoomConfig.x === undefined) {
            var xNew = Math.floor(viz.viewportX - 0.25 * viewDelta);
          } else {
            var xNew = zoomConfig.x * document.ratio;
          }

          if (zoomConfig.y === undefined) {
            var yNew = Math.floor(viz.viewportY - 0.25 * viewDelta);
          } else {
            var yNew = zoomConfig.y * document.ratio;
          }

          if (zoomConfig.duration === undefined) {
            var zoomDur = viz.fadeDuration;
          } else {
            var zoomDur = zoomConfig.duration;
          }

          var zoomDur = 0.25 * zoomDur; // for now

          if (zoomConfig.shakeSwitch === undefined) {
            var shakeSwitch = false;
          } else {
            var shakeSwitch = zoomConfig.shakeSwitch;
          }

          xNew = Math.max(0, Math.min(viz.width * document.ratio, xNew));
          yNew = Math.max(0, Math.min(viz.height * document.ratio, yNew));

          // console.log('zoom in out:', 'newWidth', newWidth, 'newHeight', newHeight, 'xNew', xNew, 'yNew', yNew) ;

          var widthIn = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(newWidth);
          var heightIn = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(newHeight);
          var xIn = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(xNew);
          var yIn = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(yNew);
          var widthOut = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(viz.screenCanvas.width);
          var heightOut = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(viz.screenCanvas.height);
          var xOut = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(0);
          var yOut = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(0);

          widthIn.child = widthOut;
          heightIn.child = heightOut;
          xIn.child = xOut;
          yIn.child = yOut;

          widthIn.pause = 0.45 * zoomDur;
          heightIn.pause = 0.45 * zoomDur;
          xIn.pause = 0.45 * zoomDur;
          yIn.pause = 0.45 * zoomDur;

          if (shakeSwitch) {
            widthIn.end = function () {
              viz.shake();
            };
          }

          viz.add_transition(widthIn);
          viz.add_transition(heightIn);
          viz.add_transition(xIn);
          viz.add_transition(yIn);
        },

        zoom: function effect_helper_zoom(zoomConfig, viz) {

          if (viz === undefined) {
            viz = this;
          }

          viz.add_transition(effectHelper.zoom_transition(zoomConfig));
        },

        zoom_transition: function effect_helper_zoom_transition(zoomConfig) {

          if (zoomConfig.duration === undefined) {
            zoomConfig.duration = 1000;
          }

          var zoomDur = zoomConfig.duration;
          var width = $Z.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(zoomConfig.width);
          var height = $Z.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(zoomConfig.height);
          var x = $Z.transition.rounded_linear_transition_func('viewportX', zoomDur)(zoomConfig.x);
          var y = $Z.transition.rounded_linear_transition_func('viewportY', zoomDur)(zoomConfig.y);

          return [width, height, x, y];
        },

        method: {

          flash: function effect_flash(Nflash, flashDuration, item) {

            if (item === undefined) {
              // assume that "this" corresponds to the element item object
              item = this;
            }

            if (Nflash === undefined) {
              Nflash = 5;
            }

            if (flashDuration === undefined) {
              flashDuration = 100;
            }

            // console.log('effect flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
            // console.log('effect flash 5') ;
            var blank = function blank() {};
            var valueList = [blank, drawHelper.item];

            var flash = new Array(2 * Nflash);

            for (var kflash = 0; kflash < 2 * Nflash; kflash++) {
              flash[kflash] = transitionHelper.new_step('render', valueList[kflash % valueList.length], flashDuration);
            }

            flash = transitionHelper.sequence(flash);

            // var loopConfig = {
            //  Nstep: Nstep,
            //  position: 0,
            //  frameDur: frameDuration,
            // } ;
            // // console.log('effect flash 12') ;

            // var loop = animate_loop (loopConfig, valueList, create_transition) ;

            item.add_transition(flash);

            // console.log('effect flash', 'flash', flash) ;

            return flash;
          },

          shake: function effect_shake(xKey, yKey, item) {

            if (item === undefined) {
              item = this;
            }

            if (xKey === undefined) {
              xKey = 'x';
            }

            if (yKey === undefined) {
              yKey = 'y';
            }

            var xShakeMove = [1, -1, -1, 1];
            var yShakeMove = [1, -1, 1, -1];

            var damping = 1.5 * document.ratio;
            var dampingFactor = 1;
            var Nstep = 9;

            xTransition = new Array(Nstep);
            yTransition = new Array(Nstep);

            for (kstep = 0; kstep < Nstep - 1; kstep++) {
              xTransition[kstep] = item.transitionSet[xKey](Math.round(Math.random() * xShakeMove[(kstep + $Z.iter) % xShakeMove.length] * damping));
              yTransition[kstep] = item.transitionSet[yKey](Math.round(Math.random() * yShakeMove[(kstep + $Z.iter * 3) % xShakeMove.length] * damping));
              damping *= dampingFactor;
            }

            xTransition[kstep] = item.transitionSet[xKey](0);
            yTransition[kstep] = item.transitionSet[yKey](0);

            xTransition = transitionHelper.sequence(xTransition)[0];
            yTransition = transitionHelper.sequence(yTransition)[0];

            // console.log('xTransition', xTransition, 'yTransition', yTransition) ;

            var replacementSwitch = true;
            item.add_transition([xTransition, yTransition]);
          }

        }

      };
      // end effectHelper

      effect.image = {

        foreach: function image_effect_helper_foreach(canvas, func, channel) {

          // console.log('image effect helper foreach start', canvas, func, channel) ;

          if (channel === undefined) {
            channel = -1; // r, g, b channels by default
          }

          var context = canvas.context();
          var image = context.getImageData(0, 0, canvas.width, canvas.height);
          var data = image.data;
          var Npel = data.length / 4;
          var offset = 0;
          var opacity = new Array(Npel);

          for (var kpel = 0; kpel < Npel; kpel++) {

            if (channel < 3 && data[offset + 3] === 0) {
              offset += 4;
              continue; // skip transparent pixels if opacity channel is not specified
            }

            if (channel >= 0 && channel < 4) {
              // console.log('func(data[offset + channel])', func(data[offset + channel])) ;
              data[offset + channel] = func(data[offset + channel]);
            } else if (channel === -1) {

              data[offset + 0] = func(data[offset + 0]);
              data[offset + 1] = func(data[offset + 1]);
              data[offset + 2] = func(data[offset + 2]);
            }

            offset += 4;
          }

          context.putImageData(image, 0, 0);

          // console.log('foreach: ', 'data', data, 'image', image, 'context', context) ;

          // $Z.core.image.view(canvas) ;
        },

        opacity: function image_effect_helper_opacity(canvas, opacity) {
          imageEffectHelper.foreach(canvas, function () {
            return opacity;
          }, 3 // opacity channel
          );
        },

        binary_opacity_filter: function image_effect_helper_binary_opacity_filter(canvas, threshold) {

          var context = canvas.context();
          var image = context.getImageData(0, 0, canvas.width, canvas.height);
          var data = image.data;
          var Npel = data.length / 4;
          var offset = 0;
          var opacity = new Array(Npel);

          for (var kpel = 0; kpel < Npel; kpel++) {
            if (data[offset + 3] > 0) {
              opacity[Npel] = data[offset + 3];
            }
            offset += 4;
          }

          // console.log('opacity', opacity) ;
          if (threshold === undefined) {
            threshold = 68;
          }
          offset = 0;
          for (var kpel = 0; kpel < Npel; kpel++) {
            if (data[offset + 3] < threshold) {
              data[offset + 3] = 0;
            } else {
              data[offset + 3] = 255;
            }
            offset += 4;
          }

          context.putImageData(image, 0, 0);
        },

        color_filter: function image_effect_helper_color_filter(canvas, color, strength) {

          if (strength === undefined) {
            strength = 1;
          }

          // strength goes from 0 to 1

          if (strength > 1) {
            strength = 1;
          }

          if (strength < 0) {
            strength = 0;
          }

          function blend(x, y, c1) {
            var mixedVal = (1 - c1) * x + c1 * y;
            // console.log('blend: ', 'x, y, c1, mixedVal', x, y, c1, mixedVal) ;
            return Math.round(mixedVal);
          }

          var filteredImage = $Z.core.image.copy(canvas);

          for (kclr = 0; kclr < color.length; kclr++) {

            if (color[kclr] !== undefined) {
              // console.log('color[kclr]', color[kclr], 'strength', strength) ;
              imageEffectHelper.foreach(filteredImage, function (x) {
                return blend(x, color[kclr], strength);
              }, kclr);
            }
          }

          return filteredImage;

          // to test:  imageEffectHelper.color_filter ( document.viz.item[0].image, [255, 255, 0], -1 )
        },

        fade_transition: function image_effect_helper_fade_transition(fadeConfig) {

          var defaultFadeDuration = 1000;
          if (fadeConfig.duration === undefined) {
            fadeConfig.duration = defaultFadeDuration;
          }

          var newTransition = $Z.transition.linear_transition_func('opacity', fadeConfig.duration)(fadeConfig.opacity);

          if (fadeConfig.end !== undefined) {
            newTransition.end = fadeConfig.end;
          }

          if (fadeConfig.child !== undefined) {
            newTransition.child = fadeConfig.child;
          }

          if (fadeConfig.pause !== undefined) {
            newTransition.pause = fadeConfig.pause;
          }

          return newTransition;
        },

        fade_sequence: function image_effect_helper_fade_sequence(fadeConfig) {

          if (fadeConfig === undefined) {
            fadeConfig = {};
          }

          var valueList = fadeConfig.valueList;
          var duration = fadeConfig.duration || 1000;
          var value = fadeConfig.value;

          var create_fade = transitionHelper.fixed_duration_linear('opacity', duration);

          return transitionHelper.new_sequence(value, create_fade);
        },

        explode: function effect_helper_image_explode(blocksize, duration, removeSwitch, fadeSwitch, item) {

          if (item === undefined) {
            item = this;
          }

          if (blocksize === undefined) {
            blocksize = 24;
          }

          if (duration === undefined) {
            duration = 1500;
          }

          if (removeSwitch === undefined) {
            removeSwitch = true;
          }

          if (fadeSwitch === undefined) {
            fadeSwitch = true;
          }

          if (removeSwitch) {
            itemHelper.remove(item);
          }

          // console.log('explode start') ;

          var Nrow = Math.floor(item.image.height / blocksize);
          var Ncol = Math.floor(item.image.width / blocksize);
          var Nblock = Nrow * Ncol;
          var block = new Array(Nblock);

          var sx, sy;
          var sw = blocksize;
          var sh = blocksize;
          var dx = 0;
          var dy = 0;
          var dw = blocksize;
          var dh = blocksize;

          var scale = 300;

          for (var krow = 0; krow < Nrow; krow++) {
            for (var kcol = 0; kcol < Ncol; kcol++) {
              var canvas = $Z.core.image.create(blocksize, blocksize);
              var context = canvas.context();
              sx = Math.floor(kcol * blocksize / document.ratio);
              sy = Math.floor(krow * blocksize / document.ratio);
              context.drawImage(item.image, sx, sy, sw, sh, dx, dy, dw, dh);
              var k = krow * Ncol + kcol;
              var xTrans = $Z.transition.rounded_linear_transition_func('x', duration)((Math.random() - 0.5) * 2 * scale + item.x + sx);
              block[k] = _Object$assign(itemHelper.setup(), {
                viz: item.viz,
                x: item.x + sx,
                y: item.y + sy,
                image: canvas,
                opacity: 1,
                render: drawHelper.image,
                inert: true,
                transition: [xTrans, $Z.transition.rounded_linear_transition_func('y', duration)((Math.random() - 0.5) * 2 * scale + item.y + sy)]
              });
              xTrans.end = transitionHelper.remove_end(block[k]);
              if (fadeSwitch) {
                imageEffectHelper.fade.call(block[k], { duration: duration });
              }
            }
          }

          itemHelper.add(viz, block);
        }

      };

      _export('default', effect);
    }
  };
});
$__System.register("9", [], function (_export) {
  "use strict";

  var imageHelper;
  return {
    setters: [],
    execute: function () {
      imageHelper = {

        place: function viz_helper_place(canvas) {

          if (canvas === undefined) {
            canvas = this;
          }

          var y = document.body.getElementsByTagName("canvas");
          for (var ky = 0; ky < y.length; ky++) {
            // console.log('removing', 'canvas', y[ky]) ;
            y[ky].parentNode.removeChild(y[ky]);
          }
          document.body.appendChild(canvas);
          canvas.style.position = 'fixed';
          canvas.parentNode.style.transformOrigin = "0 0"; //scale from top left
          // canvas.context().scale(1, 1) ;
        },

        get_data: function image_helper_get_data(canvas) {
          return canvas.context().getImageData(0, 0, canvas.width, canvas.height);
        },

        view: function sprite_helper_view(canvas) {

          var dataURL = canvas.toDataURL("image/png");
          console.log('dataUrl', dataURL);
          var win = window.open();
          win.document.write('<img src="' + dataURL + '"/>');
        },

        text2image: function image_helper_text2image(imageConfig) {

          if (imageConfig === undefined) {
            imageConfig = this;
          }

          var text = String(imageConfig.text);
          var sprite = imageConfig.sprite;

          // console.log('imageHelper text2image:', 'text', text, 'sprite', sprite) ;

          var width = sprite[text[0]][0].width;
          var height = sprite[text[0]][0].height;

          if (imageConfig.xShift === undefined) {
            var offsetX = 0;
          } else {
            var offsetX = imageConfig.xShift;
          }

          var image = imageHelper.create(width * text.length + (text.length - 1) * offsetX, height);

          for (var kchar = 0; kchar < text.length; kchar++) {

            // console.log('text2image sprite', 'sprite[text[kchar]', sprite[text[kchar]]);
            image.context().drawImage(sprite[text[kchar]][0], Math.floor(offsetX * kchar + width * kchar), 0);
          }

          return image;
        },

        text_sprite: function image_helper_text_sprite(textConfig) {

          if (textConfig === undefined) {
            textConfig = {};
          }

          var font = textConfig.font || '11px Lucida Console';
          var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

          var sprite = {}; // initialize output variable

          for (kchar = 0; kchar < alphabet.length; kchar++) {

            var letter = imageHelper.word({

              font: textConfig.font || 'Lucida',
              px: textConfig.px || 72,
              color: textConfig.color || '#FFFF30',
              text: alphabet[kchar]

            });

            sprite[alphabet[kchar]] = [letter];
          }

          return sprite;
        },

        word_block: function image_helper_word_block(wordConfig) {

          var wordImage = imageHelper.word(wordConfig);

          // imageHelper.view(wordImage) ;

          var offsetX = 10;
          var offsetY = 2;

          var image = imageHelper.create(wordImage.width + 2 * offsetX, wordImage.height + 2 * offsetY);
          var imageContext = image.context();

          var rect = {

            x: 0,
            y: 0,
            width: image.width,
            height: image.height,
            color: '#FFF',
            stroke: 'rgba(0, 0, 0, 0)',
            opacity: 1

          };

          drawHelper.rect(rect, imageContext);
          imageContext.drawImage(wordImage, offsetX, offsetY);

          imageContext.lineWidth = 1;
          imageContext.strokeStyle = 'rgba(0, 0, 0, 1)';
          imageContext.rect(0, 0, image.width, image.height);
          imageContext.stroke();

          image = imageHelper.adjust_ratio(image);

          return image;
        },

        word: function image_helper_word(wordConfig) {

          var Npx;

          if (wordConfig.binarySwitch === undefined) {
            wordConfig.binarySwitch = true;
          }

          if (wordConfig.px === undefined) {
            Npx = 12;
          } else {
            Npx = wordConfig.px;
          }

          var fontName;

          if (wordConfig.font === undefined) {
            fontName = 'Courier';
          } else {
            fontName = wordConfig.font;
          }

          // console.log('word image', 'fontName', fontName) ;

          var wordImage = imageHelper.create();
          var wordContext = wordImage.context();
          wordContext.font = Npx + 'px ' + fontName;
          var wordMeasure = wordContext.measureText(wordConfig.text);

          // console.log('fontName', fontName, 'wordConfig', wordConfig, 'wordMeasure', wordMeasure, 'wordMeasure.width', wordMeasure.width) ;

          var wordWidth = Math.ceil(wordMeasure.width);
          var wordHeight = Npx;

          wordImage.width = wordWidth;
          wordImage.height = wordHeight;

          wordContext.font = Npx + 'px ' + fontName;
          wordContext.textBaseline = 'bottom';

          if (wordConfig.color === undefined) {
            wordConfig.color = 'rgba(0, 0, 0, 1)';
          }

          wordContext.fillStyle = wordConfig.color;
          wordContext.fillText(wordConfig.text, 0, Npx);

          if (wordConfig.binarySwitch === true) {
            var threshold = 50;
            imageEffectHelper.binary_opacity_filter(wordImage, threshold);
          }

          // imageHelper.view(wordImage)

          return wordImage;

          // finished drawing black on transparent pixels
        },

        clear_color: function image_helper_clear_color(img, bgColor) {

          var Npel = img.data.length / 4;
          var distCutoff = 20; // per color channel using city-block distance to account for interpolation artifacts (e.g. get image data on android bug?)

          for (var k = 0; k < Npel; k++) {

            var offset = k * 4;
            var r = img.data[offset + 0];
            var g = img.data[offset + 1];
            var b = img.data[offset + 2];

            var dist = imageHelper.color_distance(r, g, b, bgColor);

            // console.log('dist', dist) ;

            if (dist < distCutoff) {
              // if (r === bgColor[0] && g === bgColor[1] && b === bgColor[2]) {
              img.data[offset + 0] = 0;
              img.data[offset + 1] = 0;
              img.data[offset + 2] = 0;
              img.data[offset + 3] = 0; // clear background pixels by setting opacity to zero
            }
          }
        },

        color_distance: function image_helper_color_distance(r, g, b, bgColor) {
          return Math.abs(r - bgColor[0]) + Math.abs(g - bgColor[1]) + Math.abs(b - bgColor[2]);
        },

        clear_rect: function image_helper_clear_rect(canvas, rect) {

          var newCanvas = imageHelper.create(canvas.width, canvas.height);
          var newContext = newCanvas.context();

          newContext.drawImage(canvas, 0, 0);
          newContext.clearRect(rect.x, rect.y, rect.width, rect.height);

          return newCanvas;
        },

        keep_rect: function image_helper_keep_rect(canvas, rect) {

          var newCanvas = imageHelper.create(canvas.width, canvas.height);
          var newContext = newCanvas.context();

          newContext.drawImage(canvas, rect.x, rect.y, rect.width, rect.height, rect.x, rect.y, rect.width, rect.height);

          return newCanvas;
        },

        to_canvas: function image_helper_to_canvas(imgUrl) {

          var image = imageLoader.cache[imgUrl]; // temporary variable
          var canvas = imageHelper.create();
          var context = canvas.context();
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);

          return canvas;
        },

        create: function image_helper_create(width, height, color) {

          var canvas = document.createElement('canvas');
          canvas.setAttribute('width', width);
          canvas.setAttribute('height', height);
          canvas.mozImageSmoothingEnabled = false;
          canvas.webkitImageSmoothingEnabled = false;
          canvas.msImageSmoothingEnabled = false;
          canvas.imageSmoothingEnabled = false;

          canvas.context = imageHelper.context2d;
          canvas.place = imageHelper.place;

          if (color !== undefined) {
            for (var kclr = 0; kclr < color.length; kclr++) {
              var set_color = function set_color() {
                return color[kclr];
              };
              imageEffectHelper.foreach(canvas, set_color, kclr);
            }
          }

          return canvas;
        },

        context2d: function image_helper_context(canvas) {

          if (canvas === undefined) {
            canvas = this;
          }

          var context = canvas.getContext('2d');

          context.mozImageSmoothingEnabled = false;
          context.webkitImageSmoothingEnabled = false;
          context.msImageSmoothingEnabled = false;
          context.imageSmoothingEnabled = false;

          return context;
        },

        adjust_ratio: function image_helper_adjust_ratio(canvas) {

          var newCanvas = hidpi_adjust(imageHelper.get_data(canvas)).canvas;

          if (canvas.sourceCollisionImage !== undefined) {
            newCanvas.sourceCollisionImage = canvas.sourceCollisionImage; // propagate collision image without magnification since collision detection occurs on the model canvas
          }

          if (canvas.targetCollisionImage !== undefined) {
            newCanvas.targetCollisionImage = canvas.targetCollisionImage; // propagate collision image without magnification since collision detection occurs on the model canvas
          } else {
              // use the original image as default target collision image
              newCanvas.targetCollisionImage = canvas;
            }

          newCanvas.originalCanvas = canvas;

          return newCanvas;
        },

        copy: function image_helper_copy(image) {

          var copy = imageHelper.create(image.width, image.height);
          var context = copy.context();

          context.drawImage(image, 0, 0);

          copy.originalCanvas = image.originalCanvas;

          return copy;
        },

        block_copy: function image_helper_block_copy(sourceImageData, ratio) {

          var destImage = imageHelper.create(sourceImageData.width * ratio, sourceImageData.height * ratio);
          var destImageContext = destImage.context();
          var destImageData = destImageContext.getImageData(0, 0, destImage.width, destImage.height);

          var data0 = sourceImageData.data;
          var data1 = destImageData.data;

          var Npel = sourceImageData.width * sourceImageData.height;
          // console.log('block copy 41') ;

          for (var kPel = 0; kPel < Npel; kPel++) {
            var kx = kPel % sourceImageData.width;
            var ky = Math.floor(kPel / sourceImageData.width);
            var bx = ratio * kx;
            var by = ratio * ky;
            var kOff = kPel * 4;
            // console.log('blockcopy 48') ;

            var r = data0[kOff + 0];
            var g = data0[kOff + 1];
            var b = data0[kOff + 2];
            var a = data0[kOff + 3];
            // console.log('r', r, 'g', g, 'b', b) ;
            for (var bkx = 0; bkx < ratio; bkx++) {
              for (var bky = 0; bky < ratio; bky++) {
                var tempX = bx + bkx;
                var tempY = by + bky;
                var bk = tempY * destImageData.width + tempX;
                var bkOff = bk * 4;
                data1[bkOff + 0] = r;
                data1[bkOff + 1] = g;
                data1[bkOff + 2] = b;
                data1[bkOff + 3] = a;
              }
            }
          }

          destImageContext.putImageData(destImageData, 0, 0);

          var imageObject = {
            data: destImageData,
            context: destImageContext,
            canvas: destImage
          };
          return imageObject;
          //console.log('imageObject', imageObject) ;
          // destImageData.data = data1 ;
          // console.log ('sourceImageData', sourceImageData, 'destImageData', destImageData) ;
        },

        flip_image: function image_helper_flip_image(canvas) {

          var context = canvas.context();
          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var imageFlip = new_image_data(canvas.width, canvas.height); // new ImageData (canvas.width, canvas.height) ;
          var Npel = imageData.data.length / 4;

          for (var kPel = 0; kPel < Npel; kPel++) {

            var kFlip = imageHelper.flip_index(kPel, canvas.width, canvas.height);
            var offset = 4 * kPel;
            var offsetFlip = 4 * kFlip;

            imageFlip.data[offsetFlip + 0] = imageData.data[offset + 0];
            imageFlip.data[offsetFlip + 1] = imageData.data[offset + 1];
            imageFlip.data[offsetFlip + 2] = imageData.data[offset + 2];
            imageFlip.data[offsetFlip + 3] = imageData.data[offset + 3];
          }

          var canvasFlip = imageHelper.create(canvas.width, canvas.height);
          canvasFlip.context().putImageData(imageFlip, 0, 0);
          return canvasFlip;
        },

        flip_index: function image_helper_flip_index(kPel, width, height) {

          var i = Math.floor(kPel / width);
          var j = kPel % width;
          var jFlip = width - j - 1;
          var kFlip = i * width + jFlip;

          return kFlip;
        },

        get_original: function image_helper_get_original(canvas) {

          // console.log('imageHelper.get_original', 'canvas', canvas) ;
          return canvas.originalCanvas;
        },

        to_index: function image_helper_to_index(img0, index) {

          var img = new_image_data(img0.width, img0.height); // var img  = new ImageData(img0.width, img0.height) ; // duplicate original image to avoid mutating it

          var Npel = img.data.length / 4;

          for (var k = 0; k < Npel; k++) {

            var offset = k * 4;
            var a = img0.data[offset + 3]; // alpha channel encodes opacity value

            if (a > 0) {
              // means this pixel is not transparent

              img.data[offset + 0] = index + 1; // recolor by index (avoid black)
              img.data[offset + 1] = 0; // not using g channel
              img.data[offset + 2] = 0; // not using b channel
              img.data[offset + 3] = 255; // nonzero alpha channel
            }
          }

          return img;
        }

      };

      _export("default", imageHelper);
    }
  };
});
$__System.register('a', [], function (_export) {
  'use strict';

  var inputEvent;
  return {
    setters: [],
    execute: function () {
      inputEvent = {

        down: function input_event_down(event, doc) {

          if (doc === undefined) {
            doc = this;
          }

          // console.log ('event down', 'this', this, 'doc.viz', doc.viz, 'event', event) ;   

          var inputHandler;
          var eventList;

          switch (event.type) {

            case 'keydown':
              inputHandler = 'keyboard';
              eventList = event;
              break;
            case 'mousedown':
              inputHandler = 'screen';
              eventList = event;
              break;
            case 'touchstart':
              inputHandler = 'screen';
              eventList = event.touches;
              break;

          }

          // console.log('input event: ', 'prep', prep) ;

          function run_click() {
            // console.log('input event run click:', 'inputHandler', inputHandler) ;
            if (event.type === 'touchstart') {
              for (var kEvent = 0; kEvent < eventList.length; kEvent++) {
                doc.viz.input.response[inputHandler].call(doc.viz, eventList[kEvent]);
              }
            } else {
              doc.viz.input.response[inputHandler].call(doc.viz, eventList);
            }
          }

          var runClick = {
            prep: run_click,
            viz: doc.viz
          };

          $Z._prep.push(runClick);

          // console.log('input event: ', 'newPrep', newPrep) ;
          //console.log ('mousedown: holding', holding, 'event', event) ;
        },

        up: function input_event_up(event, doc) {

          if (doc === undefined) {
            doc = this;
          }

          $Z.prep([doc.viz]);

          // console.log('input event up', 'this', this) ;

          // console.log ('input event up end', 'event', event) ;
        },

        response: {

          keyboard: function input_event_response_keyboard(event, viz) {

            if (viz === undefined) {
              viz = this;
            }

            if (viz.keyboard_callback !== undefined) {
              viz.keyboard_callback(event);
            }
          },

          screen: function input_event_response_screen(event, viz) {

            if (viz === undefined) {
              viz = this;
            }

            if (viz.screen_callback === undefined) {
              inputEvent.response.screen_callback.call(viz, event);
            } else {
              viz.screen_callback(event);
            }
          },

          screen_callback: function input_event_response_screen_callback(event, viz) {

            if (viz === undefined) {
              viz = this;
            }

            if (viz.ui === undefined) {
              return; // nothing to do
            }

            var position = set_canvas_position(viz.canvas);

            var xIn = Math.round((event.clientX - position.left) / position.scale);
            var yIn = Math.round((event.clientY - position.top) / position.scale);

            drawHelper.indexed(viz.ui.item, viz.ui.canvas);

            var color = viz.ui.canvas.context().getImageData(xIn, yIn, 1, 1).data;
            var itemIndex = color[0] - 1; // color indexing used by imageHelper.to_index is 1-based

            if (itemIndex >= 0) {
              // user selected a user-interface item
              viz.ui.item[itemIndex].callback();
            }
          }

        }

      };

      _export('default', inputEvent);
    }
  };
});
$__System.register('b', ['8'], function (_export) {
  var _Object$assign, itemHelper;

  return {
    setters: [function (_) {
      _Object$assign = _['default'];
    }],
    execute: function () {
      'use strict';

      itemHelper = {

        setup: function item_helper_setup(itemConfig, viz) {

          if (viz === undefined) {
            viz = this;
          }

          if (itemConfig === undefined) {
            itemConfig = {};
          }

          if (itemConfig.opacity === undefined) {
            itemConfig.opacity = 1;
          }

          if (itemConfig.inert === undefined) {
            itemConfig.inert = true;
          }

          var item = { // configurable properties: x, y, type, element, opacity, image, inert, render, fixed, transition

            /* default properties: */

            delayCount: 0,
            responseSet: {}, // add response objects separately

            /* configurable properties: */

            config: itemConfig,
            viz: itemConfig.viz || viz,
            x: itemConfig.x || 0,
            y: itemConfig.y || 0,
            angle: itemConfig.angle || 0,
            xOrigin: itemConfig.xOrigin || 0,
            yOrigin: itemConfig.yOrigin || 0,
            xAngle: itemConfig.xAngle || 0,
            yAngle: itemConfig.yAngle || 0,
            xScale: itemConfig.xScale || 1,
            yScale: itemConfig.yScale || 1,
            type: itemConfig.type,
            element: itemConfig.element,
            enter: itemConfig.enter,
            exit: itemConfig.exit,
            opacity: itemConfig.opacity,
            color: itemConfig.color,
            width: itemConfig.width,
            height: itemConfig.height,
            image: itemConfig.image,
            child: itemConfig.child,
            childFade: itemConfig.childFade,
            inert: itemConfig.inert,
            fixed: itemConfig.fixed,
            uiSwitch: itemConfig.uiSwitch || false,
            callback: itemConfig.callback,
            addSwitch: itemConfig.addSwitch || false,
            render: itemConfig.render || drawHelper.item };

          // drawHelper.image expects "this" to  be "item"

          _Object$assign(item, itemHelper.method);
          _Object$assign(item, transitionHelper.method);

          if (item.addSwitch === true) {
            item.add();
          }

          // console.log('item helper', 'item', item) ;

          return item;
        },

        method: {

          collision_image: function action_helper_collision_image(actionType, item) {
            // actionType is either 'source' or 'target'

            // console.log('element collision_image start') ;

            if (item === undefined) {
              item = this;
            }

            var property = actionType + 'CollisionImage';

            // console.log('collision_image item', item)
            if (item.image[property] === undefined || item.image[property] === null) {
              // console.log('element collision image element sprite collisionSet', item.element.sprite.collisionSet) ;
              return undefined;
            } else {
              var collisionImage = item.image[property];
              // console.log('element collision_image', 'property', property, 'item.image[property]', item.image[property]) ;
              return collisionImage;
            }
          },

          default_child: function item_helper_default_child(item) {

            if (item === undefined) {
              item = this;
            }

            if (item.child === undefined) {
              item.child = []; // initialize
            }

            var white = imageEffectHelper.color_filter(item.image, [255, 255, 255]);

            item.white = Object.copy(item);
            item.white.childFade = true;
            item.white.child = undefined;

            item.white.image = white;
            item.white.opacity = 0;

            item.child.push(item.white);
          },

          zoom: function item_zoom(scale, duration, item) {

            if (item === undefined) {
              item = this;
            }

            if (scale === undefined) {
              scale = 0.5;
            }

            if (duration === undefined) {
              duration = item.viz.fadeDuration;
            }
            // console.log('item helper', 'zoom', 'this', this) ;

            item.viz.zoom({
              duration: duration,
              x: item.x,
              y: item.y,
              width: item.viz.width * scale,
              height: item.viz.height * scale
            });
          },

          add: function add(viz, item) {

            if (item === undefined) {
              item = this;
            }

            if (viz === undefined) {
              viz = this.viz;
            }

            if (viz.item === undefined) {
              viz.item = [];
            }

            if (item.constructor !== Array) {

              // console.log('item helper:', 'viz', viz, 'this', this)

              viz.stagingArray.push(item);
            } else {

              for (var kitem = 0; kitem < item.length; kitem++) {
                viz.stagingArray.push(item[kitem]);
              }
            }
          },

          remove: function item_helper_remove(item) {

            if (item === undefined) {
              item = this;
            }

            item.removeSwitch = true;
          },

          scale: function item_helper_scale(scale0, scale1, item) {

            if (item === undefined) {
              item = this;
            }

            if (scale1 === undefined) {
              scale1 = scale0;
            }

            item.xScale = scale0;
            item.yScale = scale1;
          },

          loop: function item_helper_loop(trans_func, item) {

            if (item === undefined) {
              item = this;
            }

            if (trans_func.constructor === String) {
              trans_func = item[trans_func];
            } else {
              trans_func = trans_func;
            }

            item.add_transition(item.loop_trans(trans_func));
          },

          call: function item_helper_call(callback, delay, item) {

            if (item === undefined) {
              item = this;
            }

            if (callback.constructor === Array) {

              var delaySum = 0;

              for (var kcall = 0; kcall < callback.length; kcall++) {

                if (delay.constructor === Number) {
                  var delayK = delay * (kcall + 1);
                } else if (delay.constructor === Array) {
                  delaySum += delay[kcall];
                  delayK = delaySum;
                } else {
                  console.log('item_helper_call: delay is not a Number of Array');
                }

                // console.log('item helper call: ', 'kcall', kcall, 'callback[kcall]', callback[kcall], 'delayK', delayK) ;

                if (callback[kcall].constructor === String) {
                  var callbackK = item[callback[kcall]];
                } else {
                  var callbackK = callback[kcall];
                }

                item.run_callback(callbackK, delayK);
              }
            } else {

              // console.log('item helper call: ', 'callback', callback, 'item', item)

              if (callback.constructor === String) {
                callback = item[callback];
              }

              // console.log('item helper call: ', 'callback 2', callback, 'delay', delay)

              item.run_callback(callback, delay);
            }
          },

          run_callback: function item_helper_run_callback(callback, delay, item) {

            if (item === undefined) {
              item = this;
            }

            item.delayCount++;

            var prop = 'delay' + item.delayCount;

            item[prop] = null;

            var trans = transitionHelper.new_step(prop, undefined, delay);

            trans.end = function run_callback_end() {
              // console.log('run_callback_end:', 'callback', callback, 'item', item)
              callback.call(item);
            };

            // console.log('run_callback', 'item', item, 'trans', trans) ;

            item.add_transition(trans);
          },

          flash: function item_helper_method_flash(Nflash, flashDuration, item) {

            if (item === undefined) {
              // assume that "this" corresponds to the element item object
              item = this;
            }

            if (Nflash === undefined) {
              Nflash = 1;
            }

            if (flashDuration === undefined) {
              flashDuration = 100;
            }

            // console.log('effect flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
            // console.log('effect flash 5') ;
            var blank = function blank() {};
            var valueList = [blank, drawHelper.item];

            var flash = new Array(2 * Nflash);

            for (var kflash = 0; kflash < 2 * Nflash; kflash++) {
              flash[kflash] = transitionHelper.new_step('render', valueList[kflash % valueList.length], flashDuration);
            }

            flash = transitionHelper.sequence(flash);

            // var loopConfig = {
            //  Nstep: Nstep,
            //  position: 0,
            //  frameDur: frameDuration,
            // } ;
            // // console.log('effect flash 12') ;

            // var loop = animate_loop (loopConfig, valueList, create_transition) ;

            if (item.add_transition !== undefined) {
              item.add_transition(flash);
            }

            // console.log('effect flash', 'flash', flash) ;

            return flash;
          },

          shake: function effect_shake(xKey, yKey, item) {

            if (item === undefined) {
              item = this;
            }

            if (xKey === undefined) {
              xKey = 'x';
            }

            if (yKey === undefined) {
              yKey = 'y';
            }

            var xShakeMove = [1, -1, -1, 1];
            var yShakeMove = [1, -1, 1, -1];

            var damping = 1.5 * document.ratio;
            var dampingFactor = 1;
            var Nstep = 9;

            xTransition = new Array(Nstep);
            yTransition = new Array(Nstep);

            for (kstep = 0; kstep < Nstep - 1; kstep++) {
              xTransition[kstep] = item.transitionSet[xKey](Math.round(Math.random() * xShakeMove[(kstep + $Z.iter) % xShakeMove.length] * damping));
              yTransition[kstep] = item.transitionSet[yKey](Math.round(Math.random() * yShakeMove[(kstep + $Z.iter * 3) % xShakeMove.length] * damping));
              damping *= dampingFactor;
            }

            xTransition[kstep] = item.transitionSet[xKey](0);
            yTransition[kstep] = item.transitionSet[yKey](0);

            xTransition = transitionHelper.sequence(xTransition)[0];
            yTransition = transitionHelper.sequence(yTransition)[0];

            // console.log('xTransition', xTransition, 'yTransition', yTransition) ;

            var replacementSwitch = true;
            item.add_transition([xTransition, yTransition]);
          },

          fade: function item_helper_method_fade(fadeConfig, item) {

            if (item === undefined) {
              item = this;
            }

            if (fadeConfig === undefined) {
              fadeConfig = {};
            }

            if (fadeConfig.opacity === undefined) {
              // console.log('fadeConfig', fadeConfig, 'item.opacity', item.opacity)

              var thresh = 0.5;
              if (item.opacity < thresh) {
                fadeConfig.opacity = 1;
              } else {
                fadeConfig.opacity = 0;
              }
            }

            var newTransition = imageEffectHelper.fade_transition(fadeConfig);

            // console.log('fade', 'newTransition', newTransition, 'item', item, 'fadeConfig', fadeConfig) ;

            var replacementSwitch = fadeConfig.replacementSwitch || true;

            item.add_transition(newTransition, replacementSwitch);
          }, // end fade

          whiteflash: function item_helper_method_whiteflash(duration, item) {

            if (item === undefined) {
              item = this;
            }

            if (duration === undefined) {
              duration = item.duration || item.viz.fadeDuration;
            }

            if (item.white === undefined) {
              item.default_child();
            }

            var fade_func = transitionHelper.fixed_duration_creator('opacity', duration, transitionHelper.linear_interp);

            item.white.add_sequence([1, 0], fade_func);
          },

          loop_fade: function item_helper_method_loop_fade(fader, fadeVal, item) {

            if (item === undefined) {
              item = this;
            }

            if (fader === undefined) {
              fader = item.viz.fader;
            }

            if (fadeVal === undefined) {
              fadeVal = [1, 0];
            }

            item.loop(function () {
              return fader(fadeVal);
            });
          }

        }

      };

      _export('default', itemHelper);
    }
  };
});
$__System.register('c', [], function (_export) {
  'use strict';

  var audioLoader, imageLoader, loader;
  return {
    setters: [],
    execute: function () {
      audioLoader = {

        loading: false, // initialize boolean to prevent duplicate preload() calls

        cache: {}, // class variable; initialize cache dictionary object

        loadingStats: {

          total: null,
          count: null,
          finalCallback: null

        }, // local variable, initialize loading statistics object

        load: function load(url) {
          // class method; callback incrementor - wait until final image is loaded before executing callback

          // console.log('audioLoader load start')

          if (audioLoader.cache[url] !== undefined) {
            audioLoader.callback_handler();
          } else {

            if (AudioContext) {
              // Do whatever you want using the Web Audio API
              // console.log('AudioContext', AudioContext, 'audioHelper', audioHelper)
              var audio = Object.copy(audioHelper); // shallow copy, maintains a single AudioContext container for all source files loaded
              // ...
            } else {
                // Web Audio API is not supported
                // Alert the user
                alert("Web Audio API is not supported by your browser.");
                return undefined;
              }

            var request = new XMLHttpRequest();
            request.open('get', url, true);
            request.responseType = 'arraybuffer';
            request.onload = function () {
              // console.log('request.response', request.response, 'audioHelper.context', audioHelper.context, 'AudioContext', AudioContext) ;
              audioHelper.context.decodeAudioData(request.response, function (buff) {
                audio.buffer = buff;
                audioLoader.cache[url] = audio;
                audioLoader.callback_handler();
              });
            };

            request.send();
          }

          return audio; // return audio object
        },

        callback_handler: function callback_handler() {

          audioLoader.loadingStats.count++;

          if (audioLoader.loadingStats.count === audioLoader.loadingStats.total) {
            audioLoader.loadingStats.finalCallback(); // execute the final callback
            audioLoader.loading = false;
          }

          return;
        },

        preload: function preload(audioList, callback) {
          // class method; cache dictionary builder

          if (audioLoader.loading) {
            return false; // prevent duplicate calls
          }

          if (audioList.length === 0) {
            callback();
            return;
          }

          audioLoader.loading = true;
          audioLoader.loadingStats.total = audioList.length;
          audioLoader.loadingStats.count = 0; // initialize
          audioLoader.loadingStats.finalCallback = callback;
          // console.log ('audio loader preload', 'audioList', audioList) ;
          audioList.forEach(function (url) {
            audioLoader.load(url);
          });

          return;
        }

      };
      imageLoader = {

        loading: false, // initialize boolean to prevent duplicate preload() calls

        cache: {}, // class variable; initialize cache dictionary object

        loadingStats: {
          total: null,
          count: null,
          finalCallback: null
        }, // class variable, initialize loading statistics object]1   

        load: function load(url) {
          // class method; callback incrementor - wait until final image is loaded before executing callback

          if (imageLoader.cache[url] !== undefined) {
            imageLoader.callback_handler();
          } else {
            var img = new Image();
            img.onload = imageLoader.callback_handler;
            img.src = url;
            imageLoader.cache[url] = img;
          }

          return img; // return image object
        },

        callback_handler: function callback_handler() {

          imageLoader.loadingStats.count++;

          if (imageLoader.loadingStats.count === imageLoader.loadingStats.total) {
            imageLoader.loadingStats.finalCallback(); // execute the final callback
            imageLoader.loading = false;
          }

          return;
        },

        preload: function preload(imageList, callback) {
          // class method; cache dictionary builder

          if (imageLoader.loading) {
            return; // prevent duplicate calls
          }

          if (imageList.length === 0) {
            callback();
            return;
          }

          imageLoader.loading = true;
          imageLoader.loadingStats.total = imageList.length;
          imageLoader.loadingStats.count = 0; // initialize
          imageLoader.loadingStats.finalCallback = callback;

          imageList.forEach(function (url) {
            imageLoader.load(url);
          });

          return;
        }

      };
      // module for managing image assets

      loader = {

        image: imageLoader,

        audio: audioLoader,

        all: function vizflow_core_loader_all(imageList, audioList, callback) {
          document.ratio = 2; // upsample images to ensure crisp edges on hidpi devices
          imageLoader.preload(imageList, function preload_audio() {
            // console.log('main.js: preload_audio') ;
            audioLoader.preload(audioList, function main_run() {
              // console.log('main.js: main_run') ;
              var div = document.getElementById('loading');
              if (div !== null) {
                div.style.visibility = 'hidden';
              }
              callback();
            });
          });
        }

      };

      _export('default', loader);
    }
  };
});
$__System.registerDynamic("d", ["e", "f", "10"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $export = $__require('e'),
      core = $__require('f'),
      fails = $__require('10');
  module.exports = function(KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function() {
      fn(1);
    }), 'Object', exp);
  };
  return module.exports;
});

$__System.registerDynamic("11", ["12", "d"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toObject = $__require('12');
  $__require('d')('keys', function($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
  return module.exports;
});

$__System.registerDynamic("13", ["11", "f"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('11');
  module.exports = $__require('f').Object.keys;
  return module.exports;
});

$__System.registerDynamic("5", ["13"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = {
    "default": $__require('13'),
    __esModule: true
  };
  return module.exports;
});

$__System.register("14", ["5"], function (_export) {
  var _Object$keys, spriteHelper;

  return {
    setters: [function (_) {
      _Object$keys = _["default"];
    }],
    execute: function () {
      "use strict";

      spriteHelper = {

        foreach: function sprite_helper_foreach(spriteSet, func) {

          var key = _Object$keys(spriteSet);
          var newSet = {};

          for (var k = 0; k < key.length; k++) {

            if (spriteSet[key[k]].constructor === Array) {

              newSet[key[k]] = spriteSet[key[k]].map(func);
            } else {

              newSet[key[k]] = spriteSet[key[k]];
            }
          }

          return newSet;
        },

        make_sheet: function sprite_helper_make_sheet(spriteSet) {

          function get_width(canvas) {
            return canvas.width;
          }

          function get_height(canvas) {
            return canvas.height;
          }

          widthSet = spriteHelper.foreach(spriteSet, get_width);
          heightSet = spriteHelper.foreach(spriteSet, get_height);

          var spriteCount = 0; // initialize
          var totalWidth = 0; // initialize
          var height = []; // initialize
          for (var key in spriteSet) {
            if (spriteSet[key].constructor === Array) {
              spriteCount++;
              var widthK = widthSet[key].reduce(function (a, b) {
                return a + b;
              });
              var heightK = heightSet[key][0];
              height.push(heightK);
              if (widthK > totalWidth) {
                totalWidth = widthK;
              }
            }
          }

          // console.log('widthSet', widthSet, 'totalWidth', totalWidth) ;

          var totalHeight = height.reduce(function (a, b) {
            return a + b;
          });

          // console.log('totalHeight', totalHeight)

          var canvas = $Z.core.image.create(totalWidth, totalHeight);
          var context = canvas.context();

          var offsetY = 0;

          for (var key in spriteSet) {
            var val = spriteSet[key];
            if (val.constructor === Array) {

              var offsetX = 0;

              for (var kcol = 0; kcol < val.length; kcol++) {
                context.drawImage(val[kcol], offsetX, offsetY);
                offsetX += val[kcol].width;
              }
            }
            offsetY += height.shift();
          }

          $Z.core.image.view(canvas);
        },

        is_blank: function sprite_helper_is_blank(data) {
          // viz.player.item,
          // viz.ui.button.walkLeft,
          // viz.ui.button.walkRight,
          // viz.ui.button.attack,
          // viz.ui.button.jump,
          // viz.enemy.item.responseSet.hit.healthbar.item,
          // viz.player.item.responseSet.hit.healthbar.item,

          var isZero = true;

          for (k = 0; k < data.data.length; k++) {
            if (data.data[k] !== 0) {
              isZero = false;
              break;
            }
          }

          return isZero;
        },

        get: function sprite_helper_get(canvas, rowName, tileWidth, rowHeight, paddingSwitch) {

          // $Z.core.image.view(canvas) ;

          if (paddingSwitch === undefined) {
            paddingSwitch = true;
          }

          if (rowHeight.constructor === Number) {
            var h = rowHeight;
            rowHeight = new Array(rowName.length);
            for (var krow = 0; krow < rowHeight.length; krow++) {
              rowHeight[krow] = h;
            }
          }

          if (tileWidth.constructor === Number) {
            var w = tileWidth;
            tileWidth = new Array(rowName.length);
            for (var ktile = 0; ktile < tileWidth.length; ktile++) {
              tileWidth[ktile] = w;
            }
          }

          var maxHeight = Math.max.apply(null, rowHeight);
          var Nrow = rowName.length;
          var spriteSet = {};
          var sy = 0;
          for (var krow = 0; krow < Nrow; krow++) {
            // one sprite per row
            var row = []; // initialize array to store the sprite
            var Ntile = Math.floor(canvas.width / tileWidth[krow]);
            // console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'krow', krow, 'Ntile', Ntile) ;
            for (var kcol = 0; kcol < Ntile; kcol++) {
              if (paddingSwitch) {
                var tile = $Z.core.image.create(tileWidth[krow], maxHeight);
              } else {
                var tile = $Z.core.image.create(tileWidth[krow], rowHeight[krow]);
              }
              var tileCtx = tile.context();
              var sx = kcol * tile.width;
              if (paddingSwitch) {
                tileCtx.drawImage(canvas, sx, sy, tile.width, rowHeight[krow], 0, maxHeight - rowHeight[krow], tile.width, rowHeight[krow]);
              } else {
                tileCtx.drawImage(canvas, sx, sy, tile.width, rowHeight[krow], 0, 0, tile.width, rowHeight[krow]);
              }
              // console.log('spiteHelper get:', 'sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height', sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height) ;
              var tileData = $Z.core.image.get_data(tile);
              var isBlank = spriteHelper.is_blank(tileData);
              // console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'kcol', kcol, 'tileData', tileData, 'isBlank', isBlank) ;
              if (isBlank) {
                break;
              }
              tile = $Z.core.image.adjust_ratio(tile);
              // console.log('spriteHelper get', 'tileCanvas', tile) ;       
              row.push(tile);
            }
            // console.log('spriteHelper get:', 'krow', krow, 'row', row, 'tile.width', tile.width, 'tile.height', tile.height, 'maxHeight', maxHeight, 'rowHeight', rowHeight) ;
            spriteSet[rowName[krow]] = row;
            sy += rowHeight[krow];
          }

          return spriteSet;
        },

        get_text: function sprite_helper_get_text(url, width, height) {
          var canvas = $Z.core.image.to_canvas(url);
          var alpha = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
          return spriteHelper.get(canvas, alpha, width, height);
        },

        horizontal_flip: function sprite_helper_horizontal_flip(spriteSet) {

          var key = _Object$keys(spriteSet);
          var newSet = {};

          for (var k = 0; k < key.length; k++) {

            // console.log('key[k]', key[k], 'spriteSet', spriteSet)

            if (spriteSet[key[k]].constructor === Array) {

              newSet[key[k]] = spriteHelper.flip_sprite(spriteSet[key[k]]);
            } else {
              newSet[key[k]] = spriteSet[key[k]];
            }
          }

          return newSet;
        },

        flip_sprite: function sprite_helper_flip_sprite(sprite) {

          var spriteFlip = new Array(sprite.length);

          for (var kFrame = 0; kFrame < sprite.length; kFrame++) {

            spriteFlip[kFrame] = $Z.core.image.flip_image(sprite[kFrame]);

            if (sprite[kFrame].originalCanvas !== undefined) {
              spriteFlip[kFrame].originalCanvas = $Z.core.image.flip_image(sprite[kFrame].originalCanvas);
            }

            if (sprite[kFrame].sourceCollisionImage !== undefined) {
              spriteFlip[kFrame].sourceCollisionImage = $Z.core.image.flip_image(sprite[kFrame].sourceCollisionImage);
            }

            if (sprite[kFrame].targetCollisionImage !== undefined) {
              spriteFlip[kFrame].targetCollisionImage = $Z.core.image.flip_image(sprite[kFrame].targetCollisionImage);
            } else {
              // default target collision image is the same as the original
              spriteFlip[kFrame].targetCollisionImage = spriteFlip[kFrame];
            }
          }

          return spriteFlip;
        }

      };

      _export("default", spriteHelper);
    }
  };
});
$__System.register('15', [], function (_export) {
  'use strict';

  var transitionHelper;
  return {
    setters: [],
    execute: function () {
      transitionHelper = {

        step_interp: function transition_helper_step_interp(t) {
          // represents a switch at t=0
          return this.endValue;
        },

        linear_interp: function transition_helper_linear_interp(t) {
          return $Z.transition.linear_interp.call(this, t);
        },

        rounded_linear_interp: function transition_helper_rounded_linear_interp(t) {
          return $Z.transition.rounded_linear_interp.call(this, t);
        },

        step_func: function transition_helper_step_func(varName, duration) {
          return $Z.transition.build_func(varName, duration, transitionHelper.step_interp);
        },

        linear_func: function transition_helper_linear_func(varName, duration) {
          return $Z.transition.build_func(varName, duration, $Z.transition.linear_interp);
        },

        rounded_linear_func: function transition_helper_rounded_linear_func(varName, duration) {
          return $Z.transition.build_func(varName, duration, transitionHelper.rounded_linear_interp);
        },

        fixed_duration_creator: function transition_helper_fixed_duration_creator(property, duration, interp_func) {
          return $Z.transition.build_func(property, duration, interp_func);
        },

        fixed_duration_step: function transition_helper_fixed_duration_linear(property, duration) {
          return transitionHelper.fixed_duration_creator(property, duration, transitionHelper.step_interp);
        },

        fixed_duration_linear: function transition_helper_fixed_duration_linear(property, duration) {
          return transitionHelper.fixed_duration_creator(property, duration, transitionHelper.linear_interp);
        },

        fixed_duration_rounded_linear: function transition_helper_fixed_duration_linear(property, duration) {
          return transitionHelper.fixed_duration_creator(property, duration, transitionHelper.rounded_linear_interp);
        },

        'new': function transition_helper_new(property, value, duration, interp_func) {
          return transitionHelper.fixed_duration_creator(property, duration, interp_func)(value);
        },

        new_step: function transition_helper_new_step(property, value, duration) {
          return transitionHelper['new'](property, value, duration, transitionHelper.step_interp);
        },

        new_linear: function transition_helper_new_linear(property, value, duration) {
          return transitionHelper['new'](property, value, duration, $Z.transition.linear_interp);
        },

        new_rounded_linear: function transition_helper_new_rounded_linear(property, value, duration) {
          return transitionHelper['new'](property, value, duration, $Z.transition.rounded_linear_interp);
        },

        sequence: function transition_helper_sequence(transitionArray) {
          var transition = transitionArray[0];
          for (var k = 0; k < transitionArray.length - 1; k++) {
            transitionArray[k].child = transitionArray[k + 1];
          }
          return [transition];
        },

        new_sequence: function transition_helper_new_sequence(valueList, creator_func) {

          var trans = new Array(valueList.length);

          for (var k = 0; k < trans.length; k++) {
            trans[k] = creator_func(valueList[k]);
          }

          return transitionHelper.sequence(trans);
        },

        get_child: function transition_helper_get_child(transition, frameIndex) {

          if (frameIndex === 'last') {

            while (transition.child !== undefined) {
              transition = transition.child;
            }
          } else {

            for (var kTrans = 0; kTrans < frameIndex; kTrans++) {
              transition = transition.child;
            }
          }

          return transition;
        },

        update_end_value: function transition_helper_update_end_value(property, newEndValue, transition_creator) {
          // updates end value of matching transition if it exists otherwise do nothing
          if (transitionList === undefined) {
            this.transition = [];
          }
          var transitionList = this.transition;
          var transitionIndex = transitionHelper.find(property, transitionList);
          if (transitionIndex > -1) {
            transitionList[transitionIndex].endValue = newEndValue;
          } else {
            transitionList.push(transition_creator(newEndValue));
          }
        },

        check_end_value: function transition_helper_check_end_value(property, endValue) {
          // returns true or false if there is a transition object for this property with this end value
          // returns undefined if there is no transition with this property
          var output = {
            check: undefined,
            index: -1
          };
          var transitionList = this.transition;
          if (transitionList === undefined) {
            this.transition = [];
            transitionList = this.transition;
          }
          var transitionIndex = transitionHelper.find(property, transitionList);
          if (transitionIndex === -1) {
            return output; // return default output
          } else {
              output.index = transitionIndex;
              if (transitionList[transitionIndex].endValue === endValue) {
                output.check = true;
              } else {
                output.check = false;
              }
              return output;
            }
        },

        duration: function duration(transition) {

          if (transition === undefined) {
            transition = this;
          }

          var dur = transition.duration;
          var trans = transition;

          while (trans.child !== undefined) {
            trans = trans.child;
            dur += trans.duration;
          }

          return dur;
        },

        find: function transition_helper_find(property, transitionList) {

          if (this.transition === undefined) {
            this.transition = [];
          }

          if (transitionList === undefined) {
            transitionList = this.transition; // means function was attached to an item's context
          }

          if (transitionList.length === 0) {
            return -1;
          }

          var transitionIndex = -1;

          for (var ktrans = 0; ktrans < transitionList.length; ktrans++) {
            if (transitionList[ktrans].varName === property) {
              transitionIndex = ktrans;
            }
          }

          return transitionIndex;
        },

        copy: function transition_helper_copy(transition) {

          if (transition.constructor === Array) {

            var trans = new Array(transition.length);

            for (var kt = 0; kt < transition.length; kt++) {
              // console.log('transition[kt]', transition[kt]) ;
              trans[kt] = transitionHelper.copy(transition[kt]);
            }

            return trans;
          } else {

            var trans = Object.copy(transition);

            if (trans.child !== undefined) {
              trans.child = transitionHelper.copy(transition.child);
            }

            if (trans.end !== undefined && trans.end.constructor === Object) {
              trans.end = Object.copy(transition.end);
            }

            return trans;
          }
        },

        loop_end: function transition_helper_loop_end(endConfig) {

          if (endConfig === undefined) {
            endConfig = this;
          }

          var item = endConfig.item;
          var trans_func = endConfig.transition_func;

          item.loop(trans_func);
        },

        method: {

          add_transition: function transition_helper_method_add_transition(newTransition, replacementSwitch, item) {

            if (item === undefined) {
              item = this;
            }

            // assume "this" corresponds to the item whose transition array we are modifying
            if (replacementSwitch === undefined) {
              replacementSwitch = true;
            }

            var transitionList = item.transition;
            if (transitionList === undefined) {
              item.transition = [];
              transitionList = item.transition;
            }

            if (transitionList.constructor !== Array) {
              transitionList = [transitionList];
            }

            // console.log('transitionList', transitionList, 'item', item) ;
            if (newTransition.constructor !== Array) {
              newTransition = [newTransition];
            }

            for (kNew = 0; kNew < newTransition.length; kNew++) {
              newTransition[kNew].item = item;
              var property = newTransition[kNew].varName;
              var transitionIndex = transitionHelper.find(property, transitionList);
              if (transitionIndex === -1) {
                // no transition with this property found
                transitionList.push(newTransition[kNew]);
              } else {
                if (replacementSwitch) {
                  transitionList[transitionIndex] = newTransition[kNew];
                  // console.log('item', item, 'transitionList', transitionList, 'item transition', item.transition, 'newTransition', newTransition)
                } else {
                    transitionList.push(newTransition[kNew]);
                  } // otherwise add compound transition
              }
            }
          },

          add_step: function transition_helper_linear(property, value, duration, replacementSwitch, item) {

            if (item === undefined) {
              item = this;
            }

            if (replacementSwitch === undefined) {
              replacementSwitch = true;
            }

            var transition = transitionHelper.new_step(property, value, duration);

            item.add_transition(transition, replacementSwitch);

            return item;
          },

          add_linear: function transition_helper_linear(property, value, duration, replacementSwitch, item) {

            if (item === undefined) {
              item = this;
            }

            if (replacementSwitch === undefined) {
              replacementSwitch = true;
            }

            var transition = transitionHelper.new_linear(property, value, duration);

            item.add_transition(transition, replacementSwitch);

            return item;
          },

          add_rounded_linear: function transition_helper_linear(property, value, duration, replacementSwitch, item) {

            if (item === undefined) {
              item = this;
            }

            if (replacementSwitch === undefined) {
              replacementSwitch = true;
            }

            var transition = transitionHelper.new_rounded_linear(property, value, duration);

            item.add_transition(transition, replacementSwitch);

            return item;
          },

          add_sequence: function transition_helper_new_sequence(valueList, creator_func, item) {

            if (item === undefined) {
              item = this;
            }

            var trans = new Array(valueList.length);

            for (var k = 0; k < trans.length; k++) {
              trans[k] = creator_func(valueList[k]);
            }

            item.add_transition(transitionHelper.sequence(trans));
          },

          add_child: function transition_helper_add_child(transition, newTransition, pause, frameIndex, item) {

            if (item === undefined) {
              item = this;
            }

            if (pause === undefined) {
              pause = 0;
            }

            var trans = transition;

            if (trans === undefined) {
              // would be nice to add this transition to the item

              if (item !== undefined) {
                transitionHelper.add.call(item, newTransition);
              }
              return;
            }

            if (frameIndex === undefined) {

              frameIndex = 0;
              while (trans.child !== undefined) {
                // use last frame by default
                frameIndex++;
                trans = trans.child;
              }
            } else {

              var trans = transition;
              for (var kTrans = 0; kTrans < frameIndex; kTrans++) {
                trans = trans.child;
              }
            }

            trans.pause = pause;
            trans.child = newTransition; // only restore UI functionality after the minimum number of frames has been rendered 
            // console.log('transition helper add child end', 'transition index', transitionIndex, 'new transition', newTransition, 'transition', transition) ;
          },

          add_end: function transition_helper_add_end(property, frameIndex, callback, item) {

            if (item === undefined) {
              item = this;
            }

            var transitionList = item.transition;

            if (transitionList === undefined) {
              this.transition = [];
              transitionList = item.transition;
            }

            var transitionIndex = transitionHelper.find(property, transitionList);

            var transitionK = item.transition[transitionIndex]; // initialize

            if (frameIndex > 0) {
              transitionK = transitionHelper.get_child(transitionK, frameIndex);
            }
            transitionK.end = callback; // only restore UI functionality after the minimum number of frames has been rendered
          },

          loop_trans: function transition_helper_loop_trans(trans_func, item) {

            if (item === undefined) {
              item = this;
            }

            var trans = trans_func();

            var child = transitionHelper.get_child(trans, 'last');

            if (child.end === undefined) {

              child.end = {

                item: item,
                transition_func: trans_func,
                run: transitionHelper.loop_end

              };
            } else {

              if (child.end.constructor === Object) {
                child.run();
              } else {
                child();
              }
            }

            return trans;
          },

          remove_transition: function transition_helper_method_remove_transition(property, item) {

            if (item === undefined) {
              item = this;
            }

            var transitionList = item.transition;

            if (transitionList === undefined) {
              item.transition = [];
              transitionList = item.transition;
            }
            var transitionIndex = transitionHelper.find(property, transitionList);
            if (transitionIndex === -1) {
              return; // nothing to do
            } else {
                transitionList.splice(transitionIndex, 1);
              }
          },

          remove_end: function remove_end(item) {

            if (item === undefined) {
              item = this;
            }

            var endObject = {

              item: item,

              run: function run() {

                if (this.item.remove === undefined) {
                  this.item.remove = itemHelper.remove;
                }

                this.item.remove();
              }

            };

            return endObject;
          }

        }

      };
      // set: function transition_helper_set () {
      //   // console.log('detect action set', 'this', this) ;
      //   $Z.detect([this]) ;
      // },

      // reset: function transition_helper_reset () {
      //   // console.log('detect action reset', 'this', this) ;
      //   $Z.detect([]) ; // turn off detection
      // },

      _export('default', transitionHelper);
    }
  };
});
$__System.register("16", [], function (_export) {
  "use strict";

  var uiHelper;
  return {
    setters: [],
    execute: function () {
      uiHelper = {

        setup: function ui_helper_setup(uiConfig, viz) {

          if (viz === undefined) {
            viz = this;
          }

          if (uiConfig === undefined) {
            uiConfig = {};
          }

          var ui = {

            canvas: uiConfig.canvas || $Z.core.image.create(viz.width, viz.height),
            context: uiConfig.context || $Z.core.image.create(viz.width, viz.height).context(),
            item: uiConfig.item || []
          };

          // callback: uiConfig.callback,

          viz.ui = ui;

          return viz;
        }

      };

      _export("default", uiHelper);
    }
  };
});
$__System.registerDynamic("17", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  return module.exports;
});

$__System.registerDynamic("18", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  return module.exports;
});

$__System.registerDynamic("19", ["18"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var aFunction = $__require('18');
  module.exports = function(fn, that, length) {
    aFunction(fn);
    if (that === undefined)
      return fn;
    switch (length) {
      case 1:
        return function(a) {
          return fn.call(that, a);
        };
      case 2:
        return function(a, b) {
          return fn.call(that, a, b);
        };
      case 3:
        return function(a, b, c) {
          return fn.call(that, a, b, c);
        };
    }
    return function() {
      return fn.apply(that, arguments);
    };
  };
  return module.exports;
});

$__System.registerDynamic("e", ["17", "f", "19"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var global = $__require('17'),
      core = $__require('f'),
      ctx = $__require('19'),
      PROTOTYPE = 'prototype';
  var $export = function(type, name, source) {
    var IS_FORCED = type & $export.F,
        IS_GLOBAL = type & $export.G,
        IS_STATIC = type & $export.S,
        IS_PROTO = type & $export.P,
        IS_BIND = type & $export.B,
        IS_WRAP = type & $export.W,
        exports = IS_GLOBAL ? core : core[name] || (core[name] = {}),
        target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE],
        key,
        own,
        out;
    if (IS_GLOBAL)
      source = name;
    for (key in source) {
      own = !IS_FORCED && target && key in target;
      if (own && key in exports)
        continue;
      out = own ? target[key] : source[key];
      exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] : IS_BIND && own ? ctx(out, global) : IS_WRAP && target[key] == out ? (function(C) {
        var F = function(param) {
          return this instanceof C ? new C(param) : C(param);
        };
        F[PROTOTYPE] = C[PROTOTYPE];
        return F;
      })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
      if (IS_PROTO)
        (exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
    }
  };
  $export.F = 1;
  $export.G = 2;
  $export.S = 4;
  $export.P = 8;
  $export.B = 16;
  $export.W = 32;
  module.exports = $export;
  return module.exports;
});

$__System.registerDynamic("1a", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $Object = Object;
  module.exports = {
    create: $Object.create,
    getProto: $Object.getPrototypeOf,
    isEnum: {}.propertyIsEnumerable,
    getDesc: $Object.getOwnPropertyDescriptor,
    setDesc: $Object.defineProperty,
    setDescs: $Object.defineProperties,
    getKeys: $Object.keys,
    getNames: $Object.getOwnPropertyNames,
    getSymbols: $Object.getOwnPropertySymbols,
    each: [].forEach
  };
  return module.exports;
});

$__System.registerDynamic("1b", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  return module.exports;
});

$__System.registerDynamic("12", ["1b"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var defined = $__require('1b');
  module.exports = function(it) {
    return Object(defined(it));
  };
  return module.exports;
});

$__System.registerDynamic("1c", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  return module.exports;
});

$__System.registerDynamic("1d", ["1c"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var cof = $__require('1c');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  return module.exports;
});

$__System.registerDynamic("10", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  return module.exports;
});

$__System.registerDynamic("1e", ["1a", "12", "1d", "10"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $ = $__require('1a'),
      toObject = $__require('12'),
      IObject = $__require('1d');
  module.exports = $__require('10')(function() {
    var a = Object.assign,
        A = {},
        B = {},
        S = Symbol(),
        K = 'abcdefghijklmnopqrst';
    A[S] = 7;
    K.split('').forEach(function(k) {
      B[k] = k;
    });
    return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
  }) ? function assign(target, source) {
    var T = toObject(target),
        $$ = arguments,
        $$len = $$.length,
        index = 1,
        getKeys = $.getKeys,
        getSymbols = $.getSymbols,
        isEnum = $.isEnum;
    while ($$len > index) {
      var S = IObject($$[index++]),
          keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S),
          length = keys.length,
          j = 0,
          key;
      while (length > j)
        if (isEnum.call(S, key = keys[j++]))
          T[key] = S[key];
    }
    return T;
  } : Object.assign;
  return module.exports;
});

$__System.registerDynamic("1f", ["e", "1e"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var $export = $__require('e');
  $export($export.S + $export.F, 'Object', {assign: $__require('1e')});
  return module.exports;
});

$__System.registerDynamic("f", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  return module.exports;
});

$__System.registerDynamic("20", ["1f", "f"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  $__require('1f');
  module.exports = $__require('f').Object.assign;
  return module.exports;
});

$__System.registerDynamic("8", ["20"], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  module.exports = {
    "default": $__require('20'),
    __esModule: true
  };
  return module.exports;
});

$__System.register('21', ['8'], function (_export) {
  var _Object$assign, vizHelper;

  return {
    setters: [function (_) {
      _Object$assign = _['default'];
    }],
    execute: function () {
      'use strict';

      vizHelper = {

        setup: function viz_helper_setup_viz(vizConfig) {

          // console.log('setup viz start') ;

          if (vizConfig === undefined) {
            vizConfig = {};
          }

          if (vizConfig.frameDurationFactor === undefined) {
            vizConfig.frameDurationFactor = 1;
          }

          if (vizConfig.inputEvent === undefined) {
            vizConfig.inputEvent = $Z.core.input;
          }

          /* 
           *   TEMPORARY VARIABLES USED FOR SETTING UP THE VIZ OBJECT:
           */

          var dur = vizConfig.duration || 17; // the framespeed that vizflow uses (default is 60 frames per second)
          var ratio = document.ratio; //(window.devicePixelRatio || 1) ;
          var vizWidth = vizConfig.width || 480;
          var vizHeight = vizConfig.height || 640;
          var displayWidth = Math.floor(vizWidth * ratio);
          var displayHeight = Math.floor(vizHeight * ratio);
          var paddingFactor = vizConfig.paddingFactor || 1; // ratio of full canvas to viewport
          var fullWidth = Math.floor(vizWidth * paddingFactor * ratio);
          var fullHeight = Math.floor(vizHeight * paddingFactor * ratio);

          var vizCanvas = $Z.core.image.create(vizWidth, vizHeight); // model canvas (indepdenent of device pixel ratio)
          var fullCanvas = $Z.core.image.create(fullWidth, fullHeight); // fully upsampled canvas (dependent on device pixel ratio)
          var screenCanvas = $Z.core.image.create(displayWidth, displayHeight); // actual display canvas (drawn to screen once per step/cycle/frame of the animation engine)

          var fullContext = fullCanvas.context(); // model canvas (indepdenent of device pixel ratio)
          var vizContext = vizCanvas.context();
          var screenContext = screenCanvas.context();

          screenCanvas.place();

          function resize() {
            set_canvas_position(screenCanvas);
          }

          resize();

          var backgroundImageUrl = vizConfig.backgroundImageUrl;
          // console.log('vizHelper, resize, to_canvas start') ;

          var image;
          if (vizConfig.loadingImageUrl !== undefined) {
            image = $Z.core.image.adjust_ratio($Z.core.image.to_canvas(vizConfig.loadingImageUrl));
            // console.log('vizHelper, resize, to_canvas end') ;
          }

          var frameDuration = vizConfig.frameDurationFactor * dur;
          var fadeDuration = 750;
          var resizeSkip = 3 * vizConfig.frameDurationFactor; // how often to check for window resize events

          var vizOpacity;

          if (vizConfig.opacity === undefined) {
            vizOpacity = 1;
          } else {
            vizOpacity = vizConfig.opacity;
          }

          /*
           *   DEFINE THE VIZ OBJECT:
           */

          var viz = {

            config: vizConfig,
            width: vizWidth,
            height: vizHeight,
            dur: dur,
            frameDuration: frameDuration,
            fadeDuration: vizConfig.fadeDuration || fadeDuration,
            image: image,
            canvas: vizCanvas,
            context: vizContext,
            fullCanvas: fullCanvas,
            fullContext: fullContext,
            screenCanvas: screenCanvas,
            screenContext: screenContext,
            xShift: Math.floor(0.5 * (paddingFactor - 1) * vizWidth),
            yShift: Math.floor(0.5 * (paddingFactor - 1) * vizHeight),
            resizeSkip: resizeSkip,
            lastCollision: 0,
            lastResize: 0,
            viewportX: 0,
            viewportY: 0,
            viewportWidth: screenCanvas.width,
            viewportHeight: screenCanvas.height,
            detect: actionHelper.detect,
            perform: actionHelper.perform,
            image_transition: transitionHelper.step_func('image', frameDuration),
            opacity: vizOpacity,
            fade: itemHelper.method.fade,
            shake: effectHelper.shake,
            setup_item: itemHelper.setup,
            setup_ui: uiHelper.setup,
            setup_score: scoreHelper.setup, //  score setup function for games (optional, don't have to use it for non-games)
            clearSwitch: true,
            input: vizConfig.inputEvent || $Z.core.input,
            run: vizConfig.run || vizHelper.run,
            stagingArray: vizConfig.item || [],
            screen_callback: vizConfig.screen_callback,
            keyboard_callback: vizConfig.keyboard_callback,

            transitionSet: {
              x: $Z.transition.rounded_linear_transition_func('viewportX', 3 * dur), //function accepting an x end-value and returning a transition object     
              y: $Z.transition.rounded_linear_transition_func('viewportY', 3 * dur) },

            //function accepting an x end-value and returning a transition object     
            collision: null,

            collision_detect: vizConfig.collision_detect || collisionDetect.pixelwise, // pixel-wise collision detection works for any shape and can be used on lower resolution masks compared to the display images

            prep: function viz_prep() {

              if ($Z.iter - this.lastResize > this.resizeSkip) {
                resize();
                this.lastResize = $Z.iter;
              }

              if (this.item === undefined) {
                this.item = [];
              }

              this.item = this.item.filter(function (d) {
                return d.removeSwitch !== true;
              }); // #todo: figure out a more performant way

              if (this.ui !== undefined) {
                this.ui.item = this.ui.item.filter(function (d) {
                  return d.removeSwitch !== true;
                }); // #todo: figure out a more performant way
              }

              for (var kitem = 0; kitem < this.stagingArray.length; kitem++) {

                if (this.item.indexOf(this.stagingArray[kitem]) === -1) {
                  this.item.push(this.stagingArray[kitem]);
                }

                if (this.ui !== undefined) {
                  if (this.stagingArray[kitem].uiSwitch === true) {
                    if (this.ui.item.indexOf(this.stagingArray[kitem]) === -1) {
                      this.ui.item.push(this.stagingArray[kitem]);
                    }
                  }
                }
              }

              this.stagingArray = []; // #todo: make this more performant

              $Z.item(this.item); // update the vizflow item list

              // var clearSwitch = false ;
              if (this.clearSwitch === true) {
                this.fullContext.clearRect(0, 0, this.fullCanvas.width, this.fullCanvas.height);
              }

              var alphaSwitch = false; // #todo: move to config object
              if (alphaSwitch) {
                this.fullContext.globalAlpha = 0.75; // simulates retro CRT display memory
              }

              if (this.image !== undefined) {
                this.fullContext.drawImage(this.image, 0, 0); // draw background image if there is one
              }

              return true;
            },

            post: function viz_post() {

              var sx = Math.floor((this.viewportX + this.xShift) * ratio);
              var sy = Math.floor((this.viewportY + this.yShift) * ratio);
              var sw = this.viewportWidth;
              var sh = this.viewportHeight;
              var dx = 0;
              var dy = 0;
              var dw = screenCanvas.width;
              var dh = screenCanvas.height;

              // console.log('sx, sy, sw, sh, dx, dy, dw, dh', sx, sy, sw, sh, dx, dy, dw, dh) ;

              // this.screenCanvas.width = this.screenCanvas.width ;
              this.screenContext.clearRect(0, 0, this.screenCanvas.width, this.screenCanvas.height);
              this.screenContext.globalAlpha = this.opacity;
              this.screenContext.drawImage(this.fullCanvas, sx, sy, sw, sh, dx, dy, dw, dh);
              // this.screenContext.drawImage (this.fullCanvas, 0, 0) ; // use a single drawImage call for rendering the current frame to the visible Canvas (GPU-acceleated performance)
            },

            zoom_inout: effectHelper.zoom_inout,

            panX: function panX(dur, xNew) {

              var trans = transitionHelper.sequence(xNew.map(function (x) {
                return $Z.transition.rounded_linear_transition_func('viewportX', dur)(x);
              }));

              // console.log('panX trans', trans) ;
              this.add_transition(trans[0]);
            },

            panY: function panY(dur, yNew) {

              var trans = transitionHelper.sequence(yNew.map(function (y) {
                return $Z.transition.rounded_linear_transition_func('viewportY', dur)(y);
              }));

              // console.log('panY trans', trans) ;
              this.add_transition(trans[0]);
            },

            fader: function viz_helper_method_fader(fadeVal, duration, viz) {

              if (viz === undefined) {
                viz = this;
              }

              if (duration === undefined) {
                duration = viz.fadeDuration;
              }

              if (fadeVal.constructor !== Array) {
                fadeVal = [fadeVal];
              }

              return imageEffectHelper.fade_sequence({

                duration: duration,
                value: fadeVal

              })[0];
            }

          };

          if (vizConfig.item !== undefined) {
            for (var kItem = 0; kItem < vizConfig.item.length; kItem++) {
              // add the viz object to any items it was initialized with:
              vizConfig.item[kItem].viz = viz; // decorate the item with a viz property pointing to the viz object for convenience
            }
          }

          _Object$assign(viz, transitionHelper.method); // viz can be treated as an item
          _Object$assign(viz, itemHelper.method); // viz can be treated as an item
          viz.zoom = effectHelper.zoom; // override item.zoom

          // console.log('setup viz end', 'viz', viz) ;

          return viz;
        },

        run: function run(viz) {

          // console.log('vizHelper run start') ;

          if (viz === undefined && this !== vizHelper) {
            viz = this;
          }

          document.viz = viz;
          document.addEventListener('mousedown', viz.input.down, false);
          document.addEventListener('mouseup', viz.input.up, false);

          document.addEventListener('touchstart', function (event) {

            //console.log('touchstart start', 'this', this) ;

            event.preventDefault();
            viz.input.down.call(this, event);

            //console.log('touchstart end') ;
          }, false // function argument list cannot have trailing comma (?)
          );

          document.addEventListener('touchend', viz.input.up, false);
          document.addEventListener('keydown', viz.input.down, false);
          document.addEventListener('keyup', viz.input.up, false);

          // console.log('viz helper load before $Z.viz', 'viz.run', viz) ;

          $Z.viz(viz); // load the vizualization config object into vizflow
          $Z.run(); // run the (possibly interactive) visualization (infinite loop by default)
        },

        clear_cover: function viz_helper_clear_cover(viz) {

          var overlayImage = $Z.core.image.create(viz.width, viz.height);

          imageEffectHelper.opacity(overlayImage, 1);

          var overlayConfig = {
            image: overlayImage,
            uiSwitch: true,
            addSwitch: true
          };

          return viz.setup_item(overlayConfig);
        }

      };

      _export('default', vizHelper);
    }
  };
});
$__System.register('1', ['2', '3', '4', '6', '7', '9', '14', '15', '16', '21', 'a', 'b', 'c'], function (_export) {
  // vizflow modules: some functions for working with vizflow
  // by Daniel Korenblum 5/26/2016
  // https://github.com/vizflow/vizflow

  // import the helper functions and wrappers attached to the $Z object:

  // define the vizflow core property ($Z.core):

  'use strict';

  var action, audio, collision, draw, effect, image, sprite, transition, ui, viz, input, item, loader, core;
  return {
    setters: [function (_) {
      action = _['default'];
    }, function (_2) {
      audio = _2['default'];
    }, function (_3) {
      collision = _3['default'];
    }, function (_4) {
      draw = _4['default'];
    }, function (_5) {
      effect = _5['default'];
    }, function (_6) {
      image = _6['default'];
    }, function (_7) {
      sprite = _7['default'];
    }, function (_8) {
      transition = _8['default'];
    }, function (_9) {
      ui = _9['default'];
    }, function (_10) {
      viz = _10['default'];
    }, function (_a) {
      input = _a['default'];
    }, function (_b) {
      item = _b['default'];
    }, function (_c) {
      loader = _c['default'];
    }],
    execute: function () {
      core = { // define the "bling Z core" property to store the core modules that can be used when working with vizflow

        action: action,
        audio: audio,
        collision: collision,
        draw: draw,
        effect: effect,
        image: image,
        input: input,
        item: item,
        loader: loader,
        sprite: sprite,
        transition: transition,
        ui: ui,
        viz: viz

      };

      if (window.$Z !== undefined) {
        window.$Z.core = core;
      }

      _export('default', core);
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=vizflow-core.js.map