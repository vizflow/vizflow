!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register('2', [], function (_export) {
	'use strict';

	_export('default', step);

	function step() {
		// iterate the engine's main loop using the browser's animation timer

		if ($Z.verbose) {
			console.log('vizflow step start', '$Z.requestAnimFrame', $Z.requestAnimFrame, '$Z.run', $Z.run, '$Z.iter', $Z.iter, '$Z.maxIter', $Z.maxIter);
		}

		$Z.iter++;

		$Z.requestAnimFrame.call(window, $Z.run);
	}

	return {
		setters: [],
		execute: function () {
			;
		}
	};
});
$__System.register("3", [], function (_export) {
  "use strict";

  _export("default", item);

  function item() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length == 0) {
      return $Z._item;
    } else {
      $Z._item = args[0];
      return $Z;
    }
  }

  return {
    setters: [],
    execute: function () {
      ;
    }
  };
});
$__System.register("4", ["5"], function (_export) {
  var _Promise;

  function prep() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length == 0) {
      return $Z._prep.map(function (object) {
        return _Promise.resolve(object.prep());
      });
    } else {
      $Z._prep = args[0];
      return $Z;
    }
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", prep);

      ;
    }
  };
});
$__System.register("6", ["5"], function (_export) {
  var _Promise;

  function post() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length == 0) {
      return $Z._post.map(function (object) {
        return _Promise.resolve(object.post());
      });
    } else {
      $Z._post = args[0];
      return $Z;
    }
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", post);

      ;
    }
  };
});
$__System.register("7", ["5"], function (_export) {
  var _Promise;

  function detect() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length == 0) {
      return $Z._detect.map(function (object) {
        return _Promise.resolve(object.detect());
      });
    } else {
      $Z._detect = args[0];
      return $Z;
    }
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", detect);

      ;
    }
  };
});
$__System.register("8", ["5"], function (_export) {
  var _Promise;

  function perform() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length == 0) {
      return $Z._perform.map(function (object) {
        return _Promise.resolve(object.perform());
      });
    } else {
      $Z._perform = args[0];
      return $Z;
    }
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", perform);

      ;
    }
  };
});
$__System.register("9", ["5"], function (_export) {
  var _Promise;

  function pipe(task) {
    var prom = _Promise.resolve(); // resolved Promise object that is ready to execute a "then" callback
    for (var i = 0; i < task.length; i++) {
      prom = prom.then(task[i]); // asynchronous sequential execution (non-blocking) using Promise.then chaining
    }
    return prom; // return the promise
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", pipe);
    }
  };
});
$__System.register("a", [], function (_export) {
	"use strict";

	_export("default", done);

	function done() {
		// checks whether we should exit the simulation or not
		if ($Z.iter > $Z.maxIter) {
			return true;
		} else {
			return false;
		}
	}

	return {
		setters: [],
		execute: function () {}
	};
});
$__System.register('b', [], function (_export) {
  'use strict';

  _export('default', exit);

  function exit() {
    // stop the simulation engine and execute the return callback
    if ($Z.verbose) console.log('$Z exiting');
    $Z._item = []; // initialize the array of items (change to an object pool later to reduce garbage collection)
    $Z._prep = []; // array of actions to perform before rendering the items on each frame (e.g. collision detection, background clearing)
    $Z._post = []; // array of actions to perform before rendering the items on each frame (e.g. collision detection, background clearing)
    $Z._detect = []; // array of detectors to perform before rendering the items on each frame (e.g. collision detection, background clearing)
    $Z._perform = []; // array of actions to perform before rendering the items on each frame (e.g. collision detection, background clearing)
    $Z._viz = {}; // optional global vizualization configuration object
    // $Z.iter     = 0        ; // default initial iteration count
    return false;
  }

  return {
    setters: [],
    execute: function () {}
  };
});
$__System.register('c', [], function (_export) {
	'use strict';

	_export('default', run);

	function run() {
		// main simulation loop
		if ($Z.verbose) console.log('vizflow run start', '$Z.iter', $Z.iter, '$Z.task', $Z.task);
		$Z.currentTime = Date.now(); // use one global timestamp per frame for all items  
		$Z.sim = $Z.pipe($Z.task); // store the simulation/game engine state as a Promise object
	}

	return {
		setters: [],
		execute: function () {
			;
		}
	};
});
$__System.register("d", [], function (_export) {
  "use strict";

  _export("default", viz);

  function viz() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // if($Z.verbose) console.log('inside run()', $Z.iter) ;

    if (args.length == 0) {

      return $Z._viz;
    } else {

      $Z.exit();

      var viz = args[0];

      if (viz.item !== undefined) {
        $Z._item = viz.item; // load the user data into the visualization engine to initialize the time equals zero (t = 0) state
      }

      if (viz.prep !== undefined) {
        $Z._prep.push(viz); // sets the preprocessing to perform on each frame of the animation (prior to updating and rendering the elements)
      }

      if (viz.post !== undefined) {
        $Z._post.push(viz);
      }

      if (viz.detect !== undefined) {
        $Z._detect.push(viz);
      }

      if (viz.perform !== undefined) {
        $Z._perform.push(viz);
      }

      $Z._viz = viz;

      return $Z;
    }
  }

  return {
    setters: [],
    execute: function () {
      ;
    }
  };
});
$__System.register('e', [], function (_export) {
	'use strict';

	_export('default', update);

	function update() {
		// default update function for handling animations using transition object lists using interpolation functions

		var el = this;
		var removeList = [];
		var child = [];

		if (el.child !== undefined) {
			for (var kc = 0; kc < el.child.length; kc++) {
				var d = el.child[kc];
				d.update ? d.update() : $Z.update.call(d);
			}
		}

		if (el.transition === undefined) return;

		if (el.transition.constructor !== Array) {
			el.transition = [el.transition];
		}

		for (var kt = 0; kt < el.transition.length; kt++) {

			var trans = el.transition[kt]; // transition object for each state variable that is changing
			// assume these fields exist: varName, startValue, endValue, duration, startTime, interpFunc
			var elapsedTime = 0;

			if (trans.startTime === undefined) {
				trans.startTime = $Z.currentTime;
			} else {
				elapsedTime = $Z.currentTime - trans.startTime;
			}

			var remainingTime = trans.duration - elapsedTime;

			if (elapsedTime == 0) {
				trans.startValue = el[trans.varName]; // initialize starting value for the transition with the current value
			} else if (remainingTime > 0) {
					var normalizedTime = 1 - remainingTime / trans.duration; // parameter in [0, 1] representing the transition's progress or completion amount
					// * update the element's state:
					el[trans.varName] = trans.interpFunc(normalizedTime);
				} else {
					// transition has run out of time so finish and remove
					// * update the element's state:
					el[trans.varName] = trans.endValue;

					if (trans.pause === undefined || -remainingTime > trans.pause) {

						removeList.push(kt);
						if (trans.child !== undefined) {
							child.push(trans.child);
						}
					}
				}
		}

		for (var kr = removeList.length - 1; kr >= 0; kr--) {

			if (removeList[kr] < el.transition.length - 1) {
				// swap with last element and then pop to avoid splice call
				var swap = el.transition[el.transition.length - 1]; // last transition
				el.transition[el.transition.length - 1] = el.transition[removeList[kr]];
				el.transition[removeList[kr]] = swap;
			}

			var trans = el.transition.pop(); // remove completed transition (will be garbage collected, may want to reuse via factory)

			if (trans.end !== undefined) {
				if (trans.end.constructor === Array) {
					// is an array
					for (var kEnd = 0; kEnd < trans.end.length; kEnd++) {
						if (typeof trans.end[kEnd] == 'function') {
							trans.end[kEnd]();
						} else {
							trans.end[kend].run();
						}
					}
				} else {
					if (typeof trans.end == 'function') {
						trans.end();
					} else {
						trans.end.run();
					}
				}
			}
		}

		for (var kc = 0; kc < child.length; kc++) {
			el.transition.push(child[kc]);
		} // sequential transition support by appending child transitions to transition list
	}

	return {
		setters: [],
		execute: function () {
			;
		}
	};
});
$__System.register('f', [], function (_export) {
  'use strict';

  var transition;
  return {
    setters: [],
    execute: function () {
      transition = { // module containing transition helper functions

        linear_interp: function linear_interp(t) {
          // attaches to transition object and handles linear interpolation of scalar values
          return (1 - t) * this.startValue + t * this.endValue; // return a value to avoid side-effects
        },

        rounded_linear_interp: function rounded_linear_interp(t) {
          // attaches to transition object and handles linear interpolation of scalar values
          return Math.round((1 - t) * this.startValue + t * this.endValue); // return a value to avoid side-effects
        },

        color_interp: function color_interp(t) {
          var color1 = this.startValue; // here, "this" revers to whatever context this gets bound to (not this module itself)
          var color2 = this.endValue; // here, "this" revers to whatever context this gets bound to (not this module itself)

          color1 = color1.slice(1); // take off the hash
          color2 = color2.slice(1); // take off the hash

          // Convert it to the right length if it uses shorthand notation
          if (color1.length === 3) color1 = color1.replace(/([0-9a-f])/ig, '$1$1');
          if (color2.length === 3) color2 = color2.replace(/([0-9a-f])/ig, '$1$1');

          var color = '#'; // initialize
          // Split the string into its main components and convert them to RGB
          for (var i = 0; i < 3; i++) {
            var split1 = parseInt(color1.slice(i * 2, (i + 1) * 2), 16);
            var split2 = parseInt(color2.slice(i * 2, (i + 1) * 2), 16);
            var split = Math.min(255, Math.round((1 - t) * split1 + t * split2)); // linear interpolation
            split = split.toString(16).toUpperCase(); // convert it to hex
            if (split.length === 1) split = '0' + split; // make sure it is always the right length
            color += split;
          }

          return color;
        },

        build_func: function build_func(varName, duration, interpFunc) {
          return function (endValue) {
            return {
              varName: varName,
              duration: duration,
              interpFunc: interpFunc,
              endValue: endValue
            };
          };
        },

        linear_transition_func: function linear_transition_func(varName, duration) {
          return this.build_func(varName, duration, this.linear_interp);
        },

        rounded_linear_transition_func: function rounded_linear_transition_func(varName, duration) {
          return this.build_func(varName, duration, this.rounded_linear_interp);
        },

        color_transition_func: function color_transition_func(varName, duration) {
          return this.build_func(varName, duration, this.color_interp);
        }

      };

      _export('default', transition);
    }
  };
});
$__System.register("10", ["5"], function (_export) {
	var _Promise;

	function preprocess() {
		// useful if the simulation requires all inputs to be grouped together, just a stub for now
		// if($Z.verbose) console.log('inside', this.name) ;
		return _Promise.all($Z.prep());
		// return Promise.all($Z.prep().map((p) => Promise.resolve(p()))) ;
	}

	return {
		setters: [function (_) {
			_Promise = _["default"];
		}],
		execute: function () {
			"use strict";

			_export("default", preprocess);

			;
		}
	};
});
$__System.register("11", ["5"], function (_export) {
	var _Promise;

	function update_items() {
		// if($Z.verbose) console.log('inside', this.name) ;
		return _Promise.all($Z.item().map(function (d) {
			return _Promise.resolve(d.update ? d.update() : $Z.update.call(d));
		})).then(_Promise.resolve($Z._viz.update ? $Z._viz.update() : $Z.update.call($Z._viz)));
	}

	return {
		setters: [function (_) {
			_Promise = _["default"];
		}],
		execute: function () {
			"use strict";

			_export("default", update_items);

			;
		}
	};
});
$__System.register("12", ["5"], function (_export) {
  var _Promise;

  function detect_actions() {
    return _Promise.all($Z.detect());
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", detect_actions);

      ;
    }
  };
});
$__System.register("13", ["5"], function (_export) {
	var _Promise;

	function perform_actions() {
		return _Promise.all($Z.perform());
	}

	return {
		setters: [function (_) {
			_Promise = _["default"];
		}],
		execute: function () {
			"use strict";

			_export("default", perform_actions);

			;
		}
	};
});
$__System.register("14", ["5"], function (_export) {
  var _Promise;

  function render_image() {
    // if($Z.verbose) console.log('inside', this.name) ;
    return _Promise.all($Z.item().map(function (d) {
      return _Promise.resolve(d.render());
    }));
  }

  return {
    setters: [function (_) {
      _Promise = _["default"];
    }],
    execute: function () {
      "use strict";

      _export("default", render_image);

      ;
    }
  };
});
$__System.register('15', ['5'], function (_export) {
	var _Promise;

	function step_or_exit() {

		if ($Z.verbose) {
			console.log('vizflow: step or exit start');
		}

		if ($Z.done()) {

			$Z.exit();

			return _Promise.resolve(true);
		} else {

			$Z.step();

			return _Promise.resolve(false);
		}
	}

	return {
		setters: [function (_) {
			_Promise = _['default'];
		}],
		execute: function () {
			'use strict';

			_export('default', step_or_exit);

			;
		}
	};
});
$__System.registerDynamic("16", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("17", ["18", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('18'),
      defined = $__require('19');
  module.exports = function(TO_STRING) {
    return function(that, pos) {
      var s = String(defined(that)),
          i = toInteger(pos),
          l = s.length,
          a,
          b;
      if (i < 0 || i >= l)
        return TO_STRING ? '' : undefined;
      a = s.charCodeAt(i);
      return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1a", ["17", "1b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $at = $__require('17')(true);
  $__require('1b')(String, 'String', function(iterated) {
    this._t = String(iterated);
    this._i = 0;
  }, function() {
    var O = this._t,
        index = this._i,
        point;
    if (index >= O.length)
      return {
        value: undefined,
        done: true
      };
    point = $at(O, index);
    this._i += point.length;
    return {
      value: point,
      done: false
    };
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1c", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function() {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1d", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(done, value) {
    return {
      value: value,
      done: !!done
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1e", ["1f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('1f');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("19", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (it == undefined)
      throw TypeError("Can't call method on  " + it);
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("20", ["1e", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var IObject = $__require('1e'),
      defined = $__require('19');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("21", ["22", "23", "24", "25", "26"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('22'),
      descriptor = $__require('23'),
      setToStringTag = $__require('24'),
      IteratorPrototype = {};
  $__require('25')(IteratorPrototype, $__require('26')('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
    setToStringTag(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1b", ["27", "28", "29", "25", "2a", "2b", "21", "24", "22", "26"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var LIBRARY = $__require('27'),
      $export = $__require('28'),
      redefine = $__require('29'),
      hide = $__require('25'),
      has = $__require('2a'),
      Iterators = $__require('2b'),
      $iterCreate = $__require('21'),
      setToStringTag = $__require('24'),
      getProto = $__require('22').getProto,
      ITERATOR = $__require('26')('iterator'),
      BUGGY = !([].keys && 'next' in [].keys()),
      FF_ITERATOR = '@@iterator',
      KEYS = 'keys',
      VALUES = 'values';
  var returnThis = function() {
    return this;
  };
  module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    $iterCreate(Constructor, NAME, next);
    var getMethod = function(kind) {
      if (!BUGGY && kind in proto)
        return proto[kind];
      switch (kind) {
        case KEYS:
          return function keys() {
            return new Constructor(this, kind);
          };
        case VALUES:
          return function values() {
            return new Constructor(this, kind);
          };
      }
      return function entries() {
        return new Constructor(this, kind);
      };
    };
    var TAG = NAME + ' Iterator',
        DEF_VALUES = DEFAULT == VALUES,
        VALUES_BUG = false,
        proto = Base.prototype,
        $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT],
        $default = $native || getMethod(DEFAULT),
        methods,
        key;
    if ($native) {
      var IteratorPrototype = getProto($default.call(new Base));
      setToStringTag(IteratorPrototype, TAG, true);
      if (!LIBRARY && has(proto, FF_ITERATOR))
        hide(IteratorPrototype, ITERATOR, returnThis);
      if (DEF_VALUES && $native.name !== VALUES) {
        VALUES_BUG = true;
        $default = function values() {
          return $native.call(this);
        };
      }
    }
    if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
      hide(proto, ITERATOR, $default);
    }
    Iterators[NAME] = $default;
    Iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: !DEF_VALUES ? $default : getMethod('entries')
      };
      if (FORCED)
        for (key in methods) {
          if (!(key in proto))
            redefine(proto, key, methods[key]);
        }
      else
        $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2c", ["1c", "1d", "2b", "20", "1b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var addToUnscopables = $__require('1c'),
      step = $__require('1d'),
      Iterators = $__require('2b'),
      toIObject = $__require('20');
  module.exports = $__require('1b')(Array, 'Array', function(iterated, kind) {
    this._t = toIObject(iterated);
    this._i = 0;
    this._k = kind;
  }, function() {
    var O = this._t,
        kind = this._k,
        index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return step(1);
    }
    if (kind == 'keys')
      return step(0, index);
    if (kind == 'values')
      return step(0, O[index]);
    return step(0, [index, O[index]]);
  }, 'values');
  Iterators.Arguments = Iterators.Array;
  addToUnscopables('keys');
  addToUnscopables('values');
  addToUnscopables('entries');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2d", ["2c", "2b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('2c');
  var Iterators = $__require('2b');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("27", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("28", ["2e", "2f", "30"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('2e'),
      core = $__require('2f'),
      ctx = $__require('30'),
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
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("31", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it, Constructor, name) {
    if (!(it instanceof Constructor))
      throw TypeError(name + ": use the 'new' operator!");
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("32", ["33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('33');
  module.exports = function(iterator, fn, value, entries) {
    try {
      return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined)
        anObject(ret.call(iterator));
      throw e;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("34", ["2b", "26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Iterators = $__require('2b'),
      ITERATOR = $__require('26')('iterator'),
      ArrayProto = Array.prototype;
  module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("18", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ceil = Math.ceil,
      floor = Math.floor;
  module.exports = function(it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("35", ["18"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('18'),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("36", ["1f", "26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('1f'),
      TAG = $__require('26')('toStringTag'),
      ARG = cof(function() {
        return arguments;
      }()) == 'Arguments';
  module.exports = function(it) {
    var O,
        T,
        B;
    return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof(T = (O = Object(it))[TAG]) == 'string' ? T : ARG ? cof(O) : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("37", ["36", "26", "2b", "2f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var classof = $__require('36'),
      ITERATOR = $__require('26')('iterator'),
      Iterators = $__require('2b');
  module.exports = $__require('2f').getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("38", ["30", "32", "34", "33", "35", "37"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('30'),
      call = $__require('32'),
      isArrayIter = $__require('34'),
      anObject = $__require('33'),
      toLength = $__require('35'),
      getIterFn = $__require('37');
  module.exports = function(iterable, entries, fn, that) {
    var iterFn = getIterFn(iterable),
        f = ctx(fn, that, entries ? 2 : 1),
        index = 0,
        length,
        step,
        iterator;
    if (typeof iterFn != 'function')
      throw TypeError(iterable + ' is not iterable!');
    if (isArrayIter(iterFn))
      for (length = toLength(iterable.length); length > index; index++) {
        entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
      }
    else
      for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
        call(iterator, f, step.value, entries);
      }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("39", ["22", "3a", "33", "30"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var getDesc = $__require('22').getDesc,
      isObject = $__require('3a'),
      anObject = $__require('33');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = $__require('30')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) {
        buggy = true;
      }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy)
          O.__proto__ = proto;
        else
          set(O, proto);
        return O;
      };
    }({}, false) : undefined),
    check: check
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = Object.is || function is(x, y) {
    return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("33", ["3a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('3a');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3c", ["33", "3d", "26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('33'),
      aFunction = $__require('3d'),
      SPECIES = $__require('26')('species');
  module.exports = function(O, D) {
    var C = anObject(O).constructor,
        S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3d", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    if (typeof it != 'function')
      throw TypeError(it + ' is not a function!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("30", ["3d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('3d');
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
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3e", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0:
        return un ? fn() : fn.call(that);
      case 1:
        return un ? fn(args[0]) : fn.call(that, args[0]);
      case 2:
        return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
      case 3:
        return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
      case 4:
        return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
    }
    return fn.apply(that, args);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3f", ["2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('2e').document && document.documentElement;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3a", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("40", ["3a", "2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('3a'),
      document = $__require('2e').document,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("41", ["30", "3e", "3f", "40", "2e", "1f", "42"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ctx = $__require('30'),
        invoke = $__require('3e'),
        html = $__require('3f'),
        cel = $__require('40'),
        global = $__require('2e'),
        process = global.process,
        setTask = global.setImmediate,
        clearTask = global.clearImmediate,
        MessageChannel = global.MessageChannel,
        counter = 0,
        queue = {},
        ONREADYSTATECHANGE = 'onreadystatechange',
        defer,
        channel,
        port;
    var run = function() {
      var id = +this;
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };
    var listner = function(event) {
      run.call(event.data);
    };
    if (!setTask || !clearTask) {
      setTask = function setImmediate(fn) {
        var args = [],
            i = 1;
        while (arguments.length > i)
          args.push(arguments[i++]);
        queue[++counter] = function() {
          invoke(typeof fn == 'function' ? fn : Function(fn), args);
        };
        defer(counter);
        return counter;
      };
      clearTask = function clearImmediate(id) {
        delete queue[id];
      };
      if ($__require('1f')(process) == 'process') {
        defer = function(id) {
          process.nextTick(ctx(run, id, 1));
        };
      } else if (MessageChannel) {
        channel = new MessageChannel;
        port = channel.port2;
        channel.port1.onmessage = listner;
        defer = ctx(port.postMessage, port, 1);
      } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
        defer = function(id) {
          global.postMessage(id + '', '*');
        };
        global.addEventListener('message', listner, false);
      } else if (ONREADYSTATECHANGE in cel('script')) {
        defer = function(id) {
          html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function() {
            html.removeChild(this);
            run.call(id);
          };
        };
      } else {
        defer = function(id) {
          setTimeout(ctx(run, id, 1), 0);
        };
      }
    }
    module.exports = {
      set: setTask,
      clear: clearTask
    };
  })($__require('42'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1f", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toString = {}.toString;
  module.exports = function(it) {
    return toString.call(it).slice(8, -1);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("43", ["2e", "41", "1f", "42"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var global = $__require('2e'),
        macrotask = $__require('41').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('1f')(process) == 'process',
        head,
        last,
        notify;
    var flush = function() {
      var parent,
          domain,
          fn;
      if (isNode && (parent = process.domain)) {
        process.domain = null;
        parent.exit();
      }
      while (head) {
        domain = head.domain;
        fn = head.fn;
        if (domain)
          domain.enter();
        fn();
        if (domain)
          domain.exit();
        head = head.next;
      }
      last = undefined;
      if (parent)
        parent.enter();
    };
    if (isNode) {
      notify = function() {
        process.nextTick(flush);
      };
    } else if (Observer) {
      var toggle = 1,
          node = document.createTextNode('');
      new Observer(flush).observe(node, {characterData: true});
      notify = function() {
        node.data = toggle = -toggle;
      };
    } else if (Promise && Promise.resolve) {
      notify = function() {
        Promise.resolve().then(flush);
      };
    } else {
      notify = function() {
        macrotask.call(global, flush);
      };
    }
    module.exports = function asap(fn) {
      var task = {
        fn: fn,
        next: undefined,
        domain: isNode && process.domain
      };
      if (last)
        last.next = task;
      if (!head) {
        head = task;
        notify();
      }
      last = task;
    };
  })($__require('42'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("23", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("25", ["22", "23", "44"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('22'),
      createDesc = $__require('23');
  module.exports = $__require('44') ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("29", ["25"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('25');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("45", ["29"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var redefine = $__require('29');
  module.exports = function(target, src) {
    for (var key in src)
      redefine(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2a", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var hasOwnProperty = {}.hasOwnProperty;
  module.exports = function(it, key) {
    return hasOwnProperty.call(it, key);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("24", ["22", "2a", "26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var def = $__require('22').setDesc,
      has = $__require('2a'),
      TAG = $__require('26')('toStringTag');
  module.exports = function(it, tag, stat) {
    if (it && !has(it = stat ? it : it.prototype, TAG))
      def(it, TAG, {
        configurable: true,
        value: tag
      });
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("22", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
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
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("46", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function(exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("44", ["46"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = !$__require('46')(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("47", ["2f", "22", "44", "26"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = $__require('2f'),
      $ = $__require('22'),
      DESCRIPTORS = $__require('44'),
      SPECIES = $__require('26')('species');
  module.exports = function(KEY) {
    var C = core[KEY];
    if (DESCRIPTORS && C && !C[SPECIES])
      $.setDesc(C, SPECIES, {
        configurable: true,
        get: function() {
          return this;
        }
      });
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("48", ["2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('2e'),
      SHARED = '__core-js_shared__',
      store = global[SHARED] || (global[SHARED] = {});
  module.exports = function(key) {
    return store[key] || (store[key] = {});
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("49", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var id = 0,
      px = Math.random();
  module.exports = function(key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2e", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
  if (typeof __g == 'number')
    __g = global;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("26", ["48", "49", "2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var store = $__require('48')('wks'),
      uid = $__require('49'),
      Symbol = $__require('2e').Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4a", ["26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ITERATOR = $__require('26')('iterator'),
      SAFE_CLOSING = false;
  try {
    var riter = [7][ITERATOR]();
    riter['return'] = function() {
      SAFE_CLOSING = true;
    };
    Array.from(riter, function() {
      throw 2;
    });
  } catch (e) {}
  module.exports = function(exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING)
      return false;
    var safe = false;
    try {
      var arr = [7],
          iter = arr[ITERATOR]();
      iter.next = function() {
        safe = true;
      };
      arr[ITERATOR] = function() {
        return iter;
      };
      exec(arr);
    } catch (e) {}
    return safe;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
      queue = currentQueue.concat(queue);
    } else {
      queueIndex = -1;
    }
    if (queue.length) {
      drainQueue();
    }
  }
  function drainQueue() {
    if (draining) {
      return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
      currentQueue = queue;
      queue = [];
      while (++queueIndex < len) {
        if (currentQueue) {
          currentQueue[queueIndex].run();
        }
      }
      queueIndex = -1;
      len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
  }
  process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
      for (var i = 1; i < arguments.length; i++) {
        args[i - 1] = arguments[i];
      }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function() {
    this.fun.apply(null, this.array);
  };
  process.title = 'browser';
  process.browser = true;
  process.env = {};
  process.argv = [];
  process.version = '';
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function(name) {
    throw new Error('process.binding is not supported');
  };
  process.cwd = function() {
    return '/';
  };
  process.chdir = function(dir) {
    throw new Error('process.chdir is not supported');
  };
  process.umask = function() {
    return 0;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4c", ["4b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('4b');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4d", ["4c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__System._nodeRequire ? process : $__require('4c');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("42", ["4d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('4d');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4e", ["22", "27", "2e", "30", "36", "28", "3a", "33", "3d", "31", "38", "39", "3b", "26", "3c", "43", "44", "45", "24", "47", "2f", "4a", "42"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = $__require('22'),
        LIBRARY = $__require('27'),
        global = $__require('2e'),
        ctx = $__require('30'),
        classof = $__require('36'),
        $export = $__require('28'),
        isObject = $__require('3a'),
        anObject = $__require('33'),
        aFunction = $__require('3d'),
        strictNew = $__require('31'),
        forOf = $__require('38'),
        setProto = $__require('39').set,
        same = $__require('3b'),
        SPECIES = $__require('26')('species'),
        speciesConstructor = $__require('3c'),
        asap = $__require('43'),
        PROMISE = 'Promise',
        process = global.process,
        isNode = classof(process) == 'process',
        P = global[PROMISE],
        Wrapper;
    var testResolve = function(sub) {
      var test = new P(function() {});
      if (sub)
        test.constructor = Object;
      return P.resolve(test) === test;
    };
    var USE_NATIVE = function() {
      var works = false;
      function P2(x) {
        var self = new P(x);
        setProto(self, P2.prototype);
        return self;
      }
      try {
        works = P && P.resolve && testResolve();
        setProto(P2, P);
        P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
        if (!(P2.resolve(5).then(function() {}) instanceof P2)) {
          works = false;
        }
        if (works && $__require('44')) {
          var thenableThenGotten = false;
          P.resolve($.setDesc({}, 'then', {get: function() {
              thenableThenGotten = true;
            }}));
          works = thenableThenGotten;
        }
      } catch (e) {
        works = false;
      }
      return works;
    }();
    var sameConstructor = function(a, b) {
      if (LIBRARY && a === P && b === Wrapper)
        return true;
      return same(a, b);
    };
    var getConstructor = function(C) {
      var S = anObject(C)[SPECIES];
      return S != undefined ? S : C;
    };
    var isThenable = function(it) {
      var then;
      return isObject(it) && typeof(then = it.then) == 'function' ? then : false;
    };
    var PromiseCapability = function(C) {
      var resolve,
          reject;
      this.promise = new C(function($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined)
          throw TypeError('Bad Promise constructor');
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve), this.reject = aFunction(reject);
    };
    var perform = function(exec) {
      try {
        exec();
      } catch (e) {
        return {error: e};
      }
    };
    var notify = function(record, isReject) {
      if (record.n)
        return;
      record.n = true;
      var chain = record.c;
      asap(function() {
        var value = record.v,
            ok = record.s == 1,
            i = 0;
        var run = function(reaction) {
          var handler = ok ? reaction.ok : reaction.fail,
              resolve = reaction.resolve,
              reject = reaction.reject,
              result,
              then;
          try {
            if (handler) {
              if (!ok)
                record.h = true;
              result = handler === true ? value : handler(value);
              if (result === reaction.promise) {
                reject(TypeError('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else
                resolve(result);
            } else
              reject(value);
          } catch (e) {
            reject(e);
          }
        };
        while (chain.length > i)
          run(chain[i++]);
        chain.length = 0;
        record.n = false;
        if (isReject)
          setTimeout(function() {
            var promise = record.p,
                handler,
                console;
            if (isUnhandled(promise)) {
              if (isNode) {
                process.emit('unhandledRejection', value, promise);
              } else if (handler = global.onunhandledrejection) {
                handler({
                  promise: promise,
                  reason: value
                });
              } else if ((console = global.console) && console.error) {
                console.error('Unhandled promise rejection', value);
              }
            }
            record.a = undefined;
          }, 1);
      });
    };
    var isUnhandled = function(promise) {
      var record = promise._d,
          chain = record.a || record.c,
          i = 0,
          reaction;
      if (record.h)
        return false;
      while (chain.length > i) {
        reaction = chain[i++];
        if (reaction.fail || !isUnhandled(reaction.promise))
          return false;
      }
      return true;
    };
    var $reject = function(value) {
      var record = this;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      record.v = value;
      record.s = 2;
      record.a = record.c.slice();
      notify(record, true);
    };
    var $resolve = function(value) {
      var record = this,
          then;
      if (record.d)
        return;
      record.d = true;
      record = record.r || record;
      try {
        if (record.p === value)
          throw TypeError("Promise can't be resolved itself");
        if (then = isThenable(value)) {
          asap(function() {
            var wrapper = {
              r: record,
              d: false
            };
            try {
              then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
            } catch (e) {
              $reject.call(wrapper, e);
            }
          });
        } else {
          record.v = value;
          record.s = 1;
          notify(record, false);
        }
      } catch (e) {
        $reject.call({
          r: record,
          d: false
        }, e);
      }
    };
    if (!USE_NATIVE) {
      P = function Promise(executor) {
        aFunction(executor);
        var record = this._d = {
          p: strictNew(this, P, PROMISE),
          c: [],
          a: undefined,
          s: 0,
          d: false,
          v: undefined,
          h: false,
          n: false
        };
        try {
          executor(ctx($resolve, record, 1), ctx($reject, record, 1));
        } catch (err) {
          $reject.call(record, err);
        }
      };
      $__require('45')(P.prototype, {
        then: function then(onFulfilled, onRejected) {
          var reaction = new PromiseCapability(speciesConstructor(this, P)),
              promise = reaction.promise,
              record = this._d;
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          record.c.push(reaction);
          if (record.a)
            record.a.push(reaction);
          if (record.s)
            notify(record, false);
          return promise;
        },
        'catch': function(onRejected) {
          return this.then(undefined, onRejected);
        }
      });
    }
    $export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
    $__require('24')(P, PROMISE);
    $__require('47')(PROMISE);
    Wrapper = $__require('2f')[PROMISE];
    $export($export.S + $export.F * !USE_NATIVE, PROMISE, {reject: function reject(r) {
        var capability = new PromiseCapability(this),
            $$reject = capability.reject;
        $$reject(r);
        return capability.promise;
      }});
    $export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {resolve: function resolve(x) {
        if (x instanceof P && sameConstructor(x.constructor, this))
          return x;
        var capability = new PromiseCapability(this),
            $$resolve = capability.resolve;
        $$resolve(x);
        return capability.promise;
      }});
    $export($export.S + $export.F * !(USE_NATIVE && $__require('4a')(function(iter) {
      P.all(iter)['catch'](function() {});
    })), PROMISE, {
      all: function all(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            resolve = capability.resolve,
            reject = capability.reject,
            values = [];
        var abrupt = perform(function() {
          forOf(iterable, false, values.push, values);
          var remaining = values.length,
              results = Array(remaining);
          if (remaining)
            $.each.call(values, function(promise, index) {
              var alreadyCalled = false;
              C.resolve(promise).then(function(value) {
                if (alreadyCalled)
                  return;
                alreadyCalled = true;
                results[index] = value;
                --remaining || resolve(results);
              }, reject);
            });
          else
            resolve(results);
        });
        if (abrupt)
          reject(abrupt.error);
        return capability.promise;
      },
      race: function race(iterable) {
        var C = getConstructor(this),
            capability = new PromiseCapability(C),
            reject = capability.reject;
        var abrupt = perform(function() {
          forOf(iterable, false, function(promise) {
            C.resolve(promise).then(capability.resolve, reject);
          });
        });
        if (abrupt)
          reject(abrupt.error);
        return capability.promise;
      }
    });
  })($__require('42'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2f", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = module.exports = {version: '1.2.6'};
  if (typeof __e == 'number')
    __e = core;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4f", ["16", "1a", "2d", "4e", "2f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('16');
  $__require('1a');
  $__require('2d');
  $__require('4e');
  module.exports = $__require('2f').Promise;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("5", ["4f"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('4f'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register("50", ["5"], function (_export) {
	var _Promise;

	function postprocess() {
		// useful if the simulation requires all inputs to be grouped together, just a stub for now
		// if($Z.verbose) console.log('inside', this.name) ;
		return _Promise.all($Z.post());
		// return Promise.all($Z.prep().map((p) => Promise.resolve(p()))) ;
	}

	return {
		setters: [function (_) {
			_Promise = _["default"];
		}],
		execute: function () {
			"use strict";

			_export("default", postprocess);

			;
		}
	};
});
$__System.register('1', ['2', '3', '4', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '50', 'a', 'b', 'c', 'd', 'e', 'f'], function (_export) {
  // vizflow: application-agnostic interactive vizualization engine
  // by Daniel Korenblum 4/20/2015
  // http://github.com/dannyko/vizflow

  // import the helper functions and wrappers attached to the $Z object:

  // define the vizflow object ($Z):

  // import the functions defining the asynchronous tasks comprising the main simulation or game loop, stored in an array called "task":

  'use strict';

  var step, item, prep, post, detect, perform, pipe, preprocess, update_items, detect_actions, perform_actions, render_image, step_or_exit, postprocess, done, exit, run, viz, update, transition;
  return {
    setters: [function (_) {
      step = _['default'];
    }, function (_2) {
      item = _2['default'];
    }, function (_3) {
      prep = _3['default'];
    }, function (_4) {
      post = _4['default'];
    }, function (_5) {
      detect = _5['default'];
    }, function (_6) {
      perform = _6['default'];
    }, function (_7) {
      pipe = _7['default'];
    }, function (_8) {
      preprocess = _8['default'];
    }, function (_9) {
      update_items = _9['default'];
    }, function (_10) {
      detect_actions = _10['default'];
    }, function (_11) {
      perform_actions = _11['default'];
    }, function (_12) {
      render_image = _12['default'];
    }, function (_13) {
      step_or_exit = _13['default'];
    }, function (_14) {
      postprocess = _14['default'];
    }, function (_a) {
      done = _a['default'];
    }, function (_b) {
      exit = _b['default'];
    }, function (_c) {
      run = _c['default'];
    }, function (_d) {
      viz = _d['default'];
    }, function (_e) {
      update = _e['default'];
    }, function (_f) {
      transition = _f['default'];
    }],
    execute: function () {
      window.$Z = { // define the "bling Z" object for running interactive vizualizations

        requestAnimFrame: window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
          window.setTimeout(callback, 17);
        },

        task: [// array of functions defining the sequence of asynchronous (non-blocking) tasks to perform for each step/frame/iteration of the visualization
        preprocess, // process user inputs and translate them into actionable changes to the data item attributes
        detect_actions, // apply simulation or game logic e.g. collision detection etc. to determine what actions need to be performed
        perform_actions, // perform any actions e.g. item updates that are necessary for the simulation to continue
        update_items, // apply changes to the data item attributes as determined by current data item and user input states
        render_image, // draw the data items to the screen somehow (render-agnostic)
        postprocess, // e.g. draw all rendered images to the display element
        step_or_exit],

        // decides whether to generate another frame or to stop the simulation/game
        verbose: false, // toggles console log statements
        iter: 0, // initialize loop iteration index (simulation step counter)
        maxIter: Infinity, // default maximum iteration count allowed (max # of frames)

        _item: [], // default data item array (internal use only as marked by underscore)
        _prep: [], // array of preprocessing tasks to perform (internal use only as marked by underscore)
        _post: [], // array of postprocessing tasks to perform
        _detect: [], // array of detectors (internal use only as marked by underscore)
        _perform: [], // array of actions (internal use only as marked by underscore)
        _viz: {}, // optional global visualization configuration object

        transition: transition, // module comtaining transition helpers
        item: item, // getter/setter function for interfacing with the item/data array
        prep: prep, // getter/setter function for interfacing with the _prep array
        update: update, // default update function for items using arrays of transition objects containing interpolation functions
        post: post, // getter/setter function for interfacing with the _prep array
        detect: detect, // getter/setter function for interfacing with the _detect array
        perform: perform, // getter/setter function for interfacing with the _perform array
        pipe: pipe, // function for dynamically chaining promises using a for-loop
        step: step, // function that executes one complete step (frame) of the interactive visualization / simulation / game
        done: done, // function to check for the end of the simulation or game, returns true if the simulation or game has ended
        exit: exit, // function to execute after the simulation or game has ended to trigger the exit sequence
        run: run, // function that executes each of the asynchronous tasks sequentially using Promise.then() chaining
        viz: viz };

      // function that load the visualization configuration object (viz)

      _export('default', {});
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=build.js.map