!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(){var t=$__System;if("undefined"!=typeof window&&"undefined"!=typeof document&&window.location)var s=location.protocol+"//"+location.hostname+(location.port?":"+location.port:"");t.set("@@cjs-helpers",t.newModule({getPathVars:function(t){var n,o=t.lastIndexOf("!");n=-1!=o?t.substr(0,o):t;var e=n.split("/");return e.pop(),e=e.join("/"),"file:///"==n.substr(0,8)?(n=n.substr(7),e=e.substr(7),isWindows&&(n=n.substr(1),e=e.substr(1))):s&&n.substr(0,s.length)===s&&(n=n.substr(s.length),e=e.substr(s.length)),{filename:n,dirname:e}}}))}();
$__System.register('2', ['3'], function (_export) {
  var _Object$assign;

  return {
    setters: [function (_) {
      _Object$assign = _['default'];
    }],
    execute: function () {
      'use strict';

      if (typeof _Object$assign != 'function') {
        (function () {
          Object.assign = function (target) {
            'use strict';
            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert undefined or null to object');
            }

            var output = Object(target);
            for (var index = 1; index < arguments.length; index++) {
              var source = arguments[index];
              if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                  if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                  }
                }
              }
            }
            return output;
          };
        })();
      }

      Object.copy = function (obj) {
        return _Object$assign({}, obj);
      };

      _export('default', {});
    }
  };
});
$__System.register("4", [], function (_export) {
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
$__System.registerDynamic("5", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  "format cjs";
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("6", ["7", "8"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('7'),
      defined = $__require('8');
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

$__System.registerDynamic("9", ["6", "a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $at = $__require('6')(true);
  $__require('a')(String, 'String', function(iterated) {
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

$__System.registerDynamic("b", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = function() {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("c", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("d", ["e", "8"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var IObject = $__require('e'),
      defined = $__require('8');
  module.exports = function(it) {
    return IObject(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("f", ["10", "11", "12", "13", "14"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('10'),
      descriptor = $__require('11'),
      setToStringTag = $__require('12'),
      IteratorPrototype = {};
  $__require('13')(IteratorPrototype, $__require('14')('iterator'), function() {
    return this;
  });
  module.exports = function(Constructor, NAME, next) {
    Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
    setToStringTag(Constructor, NAME + ' Iterator');
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("a", ["15", "16", "17", "13", "18", "19", "f", "12", "10", "14"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var LIBRARY = $__require('15'),
      $export = $__require('16'),
      redefine = $__require('17'),
      hide = $__require('13'),
      has = $__require('18'),
      Iterators = $__require('19'),
      $iterCreate = $__require('f'),
      setToStringTag = $__require('12'),
      getProto = $__require('10').getProto,
      ITERATOR = $__require('14')('iterator'),
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

$__System.registerDynamic("1a", ["b", "c", "19", "d", "a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var addToUnscopables = $__require('b'),
      step = $__require('c'),
      Iterators = $__require('19'),
      toIObject = $__require('d');
  module.exports = $__require('a')(Array, 'Array', function(iterated, kind) {
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

$__System.registerDynamic("1b", ["1a", "19"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('1a');
  var Iterators = $__require('19');
  Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("15", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = true;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("1c", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("1d", ["1e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('1e');
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

$__System.registerDynamic("1f", ["19", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var Iterators = $__require('19'),
      ITERATOR = $__require('14')('iterator'),
      ArrayProto = Array.prototype;
  module.exports = function(it) {
    return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("7", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("20", ["7"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toInteger = $__require('7'),
      min = Math.min;
  module.exports = function(it) {
    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("21", ["22", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('22'),
      TAG = $__require('14')('toStringTag'),
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

$__System.registerDynamic("19", [], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {};
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("23", ["21", "14", "19", "24"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var classof = $__require('21'),
      ITERATOR = $__require('14')('iterator'),
      Iterators = $__require('19');
  module.exports = $__require('24').getIteratorMethod = function(it) {
    if (it != undefined)
      return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("25", ["26", "1d", "1f", "1e", "20", "23"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ctx = $__require('26'),
      call = $__require('1d'),
      isArrayIter = $__require('1f'),
      anObject = $__require('1e'),
      toLength = $__require('20'),
      getIterFn = $__require('23');
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

$__System.registerDynamic("27", ["10", "28", "1e", "26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var getDesc = $__require('10').getDesc,
      isObject = $__require('28'),
      anObject = $__require('1e');
  var check = function(O, proto) {
    anObject(O);
    if (!isObject(proto) && proto !== null)
      throw TypeError(proto + ": can't set as prototype!");
  };
  module.exports = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? function(test, buggy, set) {
      try {
        set = $__require('26')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
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

$__System.registerDynamic("29", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("1e", ["28"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('28');
  module.exports = function(it) {
    if (!isObject(it))
      throw TypeError(it + ' is not an object!');
    return it;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2a", ["1e", "2b", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var anObject = $__require('1e'),
      aFunction = $__require('2b'),
      SPECIES = $__require('14')('species');
  module.exports = function(O, D) {
    var C = anObject(O).constructor,
        S;
    return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("2c", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("2d", ["2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('2e').document && document.documentElement;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("28", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("2f", ["28", "2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var isObject = $__require('28'),
      document = $__require('2e').document,
      is = isObject(document) && isObject(document.createElement);
  module.exports = function(it) {
    return is ? document.createElement(it) : {};
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("30", ["26", "2c", "2d", "2f", "2e", "22", "31"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var ctx = $__require('26'),
        invoke = $__require('2c'),
        html = $__require('2d'),
        cel = $__require('2f'),
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
      if ($__require('22')(process) == 'process') {
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
  })($__require('31'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("32", ["2e", "30", "22", "31"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    var global = $__require('2e'),
        macrotask = $__require('30').set,
        Observer = global.MutationObserver || global.WebKitMutationObserver,
        process = global.process,
        Promise = global.Promise,
        isNode = $__require('22')(process) == 'process',
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
  })($__require('31'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("11", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("13", ["10", "11", "33"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('10'),
      createDesc = $__require('11');
  module.exports = $__require('33') ? function(object, key, value) {
    return $.setDesc(object, key, createDesc(1, value));
  } : function(object, key, value) {
    object[key] = value;
    return object;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("17", ["13"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('13');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("34", ["17"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var redefine = $__require('17');
  module.exports = function(target, src) {
    for (var key in src)
      redefine(target, key, src[key]);
    return target;
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("18", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("12", ["10", "18", "14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var def = $__require('10').setDesc,
      has = $__require('18'),
      TAG = $__require('14')('toStringTag');
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

$__System.registerDynamic("33", ["35"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = !$__require('35')(function() {
    return Object.defineProperty({}, 'a', {get: function() {
        return 7;
      }}).a != 7;
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("36", ["24", "10", "33", "14"], true, function($__require, exports, module) {
  "use strict";
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var core = $__require('24'),
      $ = $__require('10'),
      DESCRIPTORS = $__require('33'),
      SPECIES = $__require('14')('species');
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

$__System.registerDynamic("37", ["2e"], true, function($__require, exports, module) {
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

$__System.registerDynamic("38", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("14", ["37", "38", "2e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var store = $__require('37')('wks'),
      uid = $__require('38'),
      Symbol = $__require('2e').Symbol;
  module.exports = function(name) {
    return store[name] || (store[name] = Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("39", ["14"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var ITERATOR = $__require('14')('iterator'),
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

$__System.registerDynamic("3a", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("3b", ["3a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('3a');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3c", ["3b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__System._nodeRequire ? process : $__require('3b');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("31", ["3c"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = $__require('3c');
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3d", ["10", "15", "2e", "26", "21", "16", "28", "1e", "2b", "1c", "25", "27", "29", "14", "2a", "32", "33", "34", "12", "36", "24", "39", "31"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  (function(process) {
    'use strict';
    var $ = $__require('10'),
        LIBRARY = $__require('15'),
        global = $__require('2e'),
        ctx = $__require('26'),
        classof = $__require('21'),
        $export = $__require('16'),
        isObject = $__require('28'),
        anObject = $__require('1e'),
        aFunction = $__require('2b'),
        strictNew = $__require('1c'),
        forOf = $__require('25'),
        setProto = $__require('27').set,
        same = $__require('29'),
        SPECIES = $__require('14')('species'),
        speciesConstructor = $__require('2a'),
        asap = $__require('32'),
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
        if (works && $__require('33')) {
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
      $__require('34')(P.prototype, {
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
    $__require('12')(P, PROMISE);
    $__require('36')(PROMISE);
    Wrapper = $__require('24')[PROMISE];
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
    $export($export.S + $export.F * !(USE_NATIVE && $__require('39')(function(iter) {
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
  })($__require('31'));
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3e", ["5", "9", "1b", "3d", "24"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('5');
  $__require('9');
  $__require('1b');
  $__require('3d');
  module.exports = $__require('24').Promise;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3f", ["3e"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('3e'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register("40", ["3f"], function (_export) {
  var _Promise, asyncHelper;

  return {
    setters: [function (_f) {
      _Promise = _f["default"];
    }],
    execute: function () {
      "use strict";

      asyncHelper = {

        promisify: function async_promisify(async_func) {
          // async_func should only accept one or two arguments (resolve and reject, see Promise API for details)

          var p = new _Promise(function (resolve) {
            async_func(resolve);
          });

          return p;
        },

        promise: function async_promise(async) {
          // function that creates functions that return promises that wrap our async functions

          function setup_async_promise() {
            return asyncHelper.promisify(async);
          }

          return setup_async_promise;
        },

        pipe: function async_pipe(asyncList) {
          // takes an array of async functions and pipes them using async Promises
          return $Z.pipe(asyncList.map(function (d) {
            return asyncHelper.promise(d);
          })); // async pipe ftw
        }

      };

      _export("default", asyncHelper);
    }
  };
});
$__System.register('41', [], function (_export) {
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

      audioHelper.buffer = audioHelper.context.createBuffer(2, 735, 44100); // blank default stereo buffer, 1/60 sec duration

      _export('default', audioHelper);
    }
  };
});
$__System.register("42", ["43"], function (_export) {
  var _Object$keys, collisionDetect;

  return {
    setters: [function (_) {
      _Object$keys = _["default"];
    }],
    execute: function () {
      "use strict";

      collisionDetect = {

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

          // var canvas = $Z.helper.image.create(width, height) ;
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
              var imageK = $Z.helper.image.get_data(image);
            } else {

              var image = item[kItem].image.originalCanvas;
              var imageK = $Z.helper.image.get_data(item[kItem].image.originalCanvas);
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

      };

      _export("default", collisionDetect);
    }
  };
});
$__System.register("44", [], function (_export) {
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
            var canvas = $Z.helper.image.create(width, height);
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

            var imageK = $Z.helper.image.to_index(imageDataK, kItem); // ImageData object
            var tempCanvas = $Z.helper.image.create(item[kItem].image.width, item[kItem].image.height);

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

            var itemImage = item[kItem].image;
            item[kItem].image = tempCanvas;
            drawHelper.image(item[kItem], context); // context.drawImage(tempCanvas, item[kItem].x - xOrigin, item[kItem].y - yOrigin) ; // draw color-indexed button for color picking
            item[kItem].image = itemImage;
          }

          // $Z.helper.image.view(context.canvas) ;

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
          var itemX, itemY;

          if (item.fixed === true) {

            viewX = item.viz.viewportX;
            viewY = item.viz.viewportY;
            itemX = item.x;
            itemY = item.y;

            if (item.x < 0) {
              // periodic wrap negative values
              itemX = item.viz.viewportWidth + item.x;
            }

            if (item.y < 0) {
              // periodic wrap negative values
              itemY = item.viz.viewportHeight + item.y;
            }
          } else {

            viewX = 0;
            viewY = 0;
            itemX = item.x;
            itemY = item.y;
          }

          var originX = item.xOrigin * item.xScale || 0;
          var originY = item.yOrigin * item.yScale || 0;

          var dx = (itemX + item.viz.xShift + viewX - originX) * ratio;
          var dy = (itemY + item.viz.yShift + viewY - originY) * ratio;

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
            context = $Z.helper.image.create(rect.width, rect.height).context();
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

          return context.canvas;
        },

        circle: function draw_circle(circ, context) {

          if (circ === undefined) {
            circ = this;
          }

          var lineWidth = circ.lineWidth || 0;

          if (context === undefined) {
            var pad = 2;
            var size = (circ.radius + lineWidth) * 2 + pad;
            context = $Z.helper.image.create(size, size).context();
          }

          context.beginPath();
          var x = circ.x || circ.radius + lineWidth + pad;
          var y = circ.y || circ.radius + lineWidth + pad;

          x = Math.floor(x);
          y = Math.floor(y);

          var r = circ.radius;
          context.arc(x, y, r, 0, Math.PI * 2, true);

          if (circ.fill !== undefined) {
            context.fillStyle = circ.fill;
            context.fill();
          }

          if (circ.stroke !== undefined) {
            context.lineWidth = lineWidth;
            context.strokeStyle = circ.stroke;
            context.stroke();
          }

          context.closePath();

          return context.canvas;
        }

      };

      _export("default", drawHelper);
    }
  };
});
$__System.register('45', ['3'], function (_export) {
  var _Object$assign, imageEffectHelper, effectHelper;

  return {
    setters: [function (_) {
      _Object$assign = _['default'];
    }],
    execute: function () {
      'use strict';

      imageEffectHelper = {

        foreach: function image_effect_helper_foreach(canvas, func, channel) {

          // console.log('image effectHelper helper foreach start', canvas, func, channel) ;

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

          // $Z.helper.image.view(canvas) ;
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

          var filteredImage = $Z.helper.image.copy(canvas);

          var _loop = function (kclr) {

            if (color[kclr] !== undefined) {
              // console.log('color[kclr]', color[kclr], 'strength', strength) ;
              imageEffectHelper.foreach(filteredImage, function (x) {
                return blend(x, color[kclr], strength);
              }, kclr);
            }
          };

          for (var kclr = 0; kclr < color.length; kclr++) {
            _loop(kclr);
          }

          return filteredImage;

          // to test:  imageEffectHelper.color_filter ( document.viz.item[0].image, [255, 255, 0], -1 )
        },

        fade_transition: function image_effect_helper_fade_transition(fadeConfig) {

          var defaultFadeDuration = 1000;
          if (fadeConfig.duration === undefined) {
            fadeConfig.duration = defaultFadeDuration;
          }

          var newTransition = $Z.helper.transition.linear_transition_func('opacity', fadeConfig.duration)(fadeConfig.opacity);

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

          var create_fade = $Z.helper.transition.fixed_duration_linear('opacity', duration);

          return $Z.helper.transition.new_sequence(value, create_fade);
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
            $Z.helper.item.remove(item);
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
              var canvas = $Z.helper.image.create(blocksize, blocksize);
              var context = canvas.context();
              sx = Math.floor(kcol * blocksize / document.ratio);
              sy = Math.floor(krow * blocksize / document.ratio);
              context.drawImage(item.image, sx, sy, sw, sh, dx, dy, dw, dh);
              var k = krow * Ncol + kcol;
              var xTrans = $Z.helper.transition.rounded_linear_transition_func('x', duration)((Math.random() - 0.5) * 2 * scale + item.x + sx);
              block[k] = _Object$assign($Z.helper.item.setup(), {
                viz: item.viz,
                x: item.x + sx,
                y: item.y + sy,
                image: canvas,
                opacity: 1,
                render: $Z.helper.draw.image,
                inert: true,
                transition: [xTrans, $Z.helper.transition.rounded_linear_transition_func('y', duration)((Math.random() - 0.5) * 2 * scale + item.y + sy)]
              });
              xTrans.end = $Z.helper.transition.remove_end(block[k]);
              if (fadeSwitch) {
                imageEffectHelper.fade.call(block[k], { duration: duration });
              }
            }
          }

          $Z.helper.item.add(viz, block);
        }

      };
      effectHelper = { // effectHelper module for creating effects i.e. compositions of transitions

        image: imageEffectHelper,

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

          var widthIn = $Z.helper.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(newWidth);
          var heightIn = $Z.helper.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(newHeight);
          var xIn = $Z.helper.transition.rounded_linear_transition_func('viewportX', zoomDur)(xNew);
          var yIn = $Z.helper.transition.rounded_linear_transition_func('viewportY', zoomDur)(yNew);
          var widthOut = $Z.helper.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(viz.screenCanvas.width);
          var heightOut = $Z.helper.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(viz.screenCanvas.height);
          var xOut = $Z.helper.transition.rounded_linear_transition_func('viewportX', zoomDur)(0);
          var yOut = $Z.helper.transition.rounded_linear_transition_func('viewportY', zoomDur)(0);

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
          var width = $Z.helper.transition.rounded_linear_transition_func('viewportWidth', zoomDur)(zoomConfig.width);
          var height = $Z.helper.transition.rounded_linear_transition_func('viewportHeight', zoomDur)(zoomConfig.height);
          var x = $Z.helper.transition.rounded_linear_transition_func('viewportX', zoomDur)(zoomConfig.x);
          var y = $Z.helper.transition.rounded_linear_transition_func('viewportY', zoomDur)(zoomConfig.y);

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

            // console.log('effectHelper flash', 'frameDuration', frameDuration, 'Nstep', Nstep) ;
            // console.log('effectHelper flash 5') ;
            var blank = function blank() {};
            var valueList = [blank, $Z.helper.draw.item];

            var flash = new Array(2 * Nflash);

            for (var kflash = 0; kflash < 2 * Nflash; kflash++) {
              flash[kflash] = $Z.helper.transition.new_step('render', valueList[kflash % valueList.length], flashDuration);
            }

            flash = $Z.helper.transition.sequence(flash);

            // var loopConfig = {
            //  Nstep: Nstep,
            //  position: 0,
            //  frameDur: frameDuration,
            // } ;
            // // console.log('effectHelper flash 12') ;

            // var loop = animate_loop (loopConfig, valueList, create_transition) ;

            item.add_transition(flash);

            // console.log('effectHelper flash', 'flash', flash) ;

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

            for (var _kstep = 0; _kstep < Nstep - 1; _kstep++) {
              xTransition[_kstep] = item.transitionSet[xKey](Math.round(Math.random() * xShakeMove[(_kstep + $Z.iter) % xShakeMove.length] * damping));
              yTransition[_kstep] = item.transitionSet[yKey](Math.round(Math.random() * yShakeMove[(_kstep + $Z.iter * 3) % xShakeMove.length] * damping));
              damping *= dampingFactor;
            }

            xTransition[kstep] = item.transitionSet[xKey](0);
            yTransition[kstep] = item.transitionSet[yKey](0);

            xTransition = $Z.helper.transition.sequence(xTransition)[0];
            yTransition = $Z.helper.transition.sequence(yTransition)[0];

            // console.log('xTransition', xTransition, 'yTransition', yTransition) ;

            var replacementSwitch = true;
            item.add_transition([xTransition, yTransition]);
          }

        }

      };
      // end effectHelper

      _export('default', effectHelper);
    }
  };
});
$__System.register('46', [], function (_export) {
  'use strict';

  var imageHelper;
  return {
    setters: [],
    execute: function () {
      imageHelper = {

        upsample: function image_helper_upsample(sourceImageData) {
          // var ratio = 2 ; //(window.devicePixelRatio || 1) ;
          var newImageObject = imageHelper.block_copy(sourceImageData, document.ratio);
          return newImageObject;
        },

        set_position: function image_helper_set_position(canvas) {

          if (canvas === undefined) {
            canvas = this;
          }

          if (canvas.vCenter === undefined) {
            canvas.vCenter = true;
          }

          if (canvas.hCenter === undefined) {
            canvas.hCenter = true;
          }

          var position = {};
          var windowWidth = window.innerWidth;
          var widthRatio = canvas.width / windowWidth;
          var windowHeight = window.innerHeight;
          var heightRatio = canvas.height / windowHeight;
          var scaleWidth = true; // toggles width or height scaling
          var landscape = canvas.width >= canvas.height;

          if (landscape && heightRatio > widthRatio) scaleWidth = false;
          if (!landscape && !(heightRatio < widthRatio)) scaleWidth = false;

          if (scaleWidth) {
            // fit width to window and center vertically 

            if (canvas.cover === true) {

              position.width = Math.min(windowWidth, canvas.maxWidth);
              position.height = Math.min(windowHeight, canvas.maxHeight);
              position.left = 0.5 * (windowWidth - position.width);
              position.top = 0.5 * (windowHeight - position.height);
            } else {

              position.width = windowWidth;
              position.height = Math.round(canvas.height / widthRatio);
              position.left = 0;
              if (canvas.vCenter === true) {
                position.top = Math.round(0.5 * (windowHeight - position.height));
              } else {
                position.top = 0;
              }
              // position.scale  = 1 / widthRatio ;
            }
          } else {
              // fit height to window and center horizontally

              if (canvas.cover === true) {

                position.width = Math.min(windowWidth, canvas.maxWidth);
                position.height = Math.min(windowHeight, canvas.maxHeight);
                position.left = 0.5 * (windowWidth - position.width);
                position.top = 0.5 * (windowHeight - position.height);
              } else {

                position.height = windowHeight;
                position.width = Math.round(canvas.width / heightRatio);
                position.top = 0;
                if (canvas.hCenter === true) {
                  position.left = Math.round(0.5 * (windowWidth - position.width));
                } else {
                  position.left = 0;
                }
                // position.scale  = 1 / heightRatio ;
              }
            }

          position.scaleX = position.width / canvas.width;
          position.scaleY = position.height / canvas.height;

          // console.log('rw', widthRatio, 'rh', heightRatio, 'pos', position)

          if (canvas.style.width !== position.width || canvas.style.height !== position.height || canvas.style.left !== position.left || canvas.style.top !== position.top) {

            canvas.style.width = position.width + 'px';
            canvas.style.height = position.height + 'px';
            canvas.style.left = position.left + 'px';
            canvas.style.top = position.top + 'px';
          }

          return position;
        },

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

        text: function image_helper_text2image(imageConfig) {

          if (imageConfig === undefined) {
            imageConfig = this;
          }

          var text = String(imageConfig.text);
          var sprite = imageConfig.sprite;

          // console.log('imageHelper text:', 'text', text, 'sprite', sprite) ;

          var width = sprite[text[0]][0].width;
          var height = sprite[text[0]][0].height;

          if (imageConfig.xShift === undefined) {
            var offsetX = 0;
          } else {
            var offsetX = imageConfig.xShift;
          }

          var image = imageHelper.create(width * text.length + (text.length - 1) * offsetX, height);

          for (var kchar = 0; kchar < text.length; kchar++) {

            // console.log('text sprite', 'sprite[text[kchar]', sprite[text[kchar]]);
            image.context().drawImage(sprite[text[kchar]][0], Math.floor(offsetX * kchar + width * kchar), 0);
          }

          return image;
        },

        text_sprite: function image_helper_text_sprite(textConfig) {

          if (textConfig === undefined) {
            textConfig = {};
          }

          var font = textConfig.font || '11px Lucida Console';
          var alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ?.-!@#$%^&*()[]{}/\ ".split("");

          var sprite = {}; // initialize output variable

          for (var kchar = 0; kchar < alphabet.length; kchar++) {

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

          $Z.helper.draw.rect(rect, imageContext);
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
            $Z.helper.effect.image.binary_opacity_filter(wordImage, threshold);
          }

          // imageHelper.view(wordImage)

          return wordImage;

          // finished drawing black on transparent pixels
        },

        clear_color: function image_helper_clear_color(bgColor, img) {

          if (img === undefined) {
            img = this;
          }

          var canvas = img;

          img = imageHelper.get_data(canvas);

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

          canvas.context().putImageData(img, 0, 0);
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

          var image = $Z.helper.loader.image.cache[imgUrl]; // temporary variable
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
          canvas.set_position = imageHelper.set_position;
          canvas.clear_color = imageHelper.clear_color;

          if (color !== undefined) {
            var _loop = function (kclr) {
              set_color = function set_color() {
                return color[kclr];
              };

              $Z.helper.effect.image.foreach(canvas, set_color, kclr);
            };

            for (var kclr = 0; kclr < color.length; kclr++) {
              var set_color;

              _loop(kclr);
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

          var newCanvas = imageHelper.upsample(imageHelper.get_data(canvas)).canvas;

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

        new_data: function image_helper_new_data(width, height) {
          var canvas = imageHelper.create(width, height);
          // console.log('new image data', 'width', width, 'height', height) ;
          var imageData = canvas.context().createImageData(parseInt(width), parseInt(height));
          return imageData;
        },

        flip_image: function image_helper_flip_image(canvas) {

          var context = canvas.context();
          var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          var imageFlip = imageHelper.new_data(canvas.width, canvas.height); // new ImageData (canvas.width, canvas.height) ;
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

          var img = imageHelper.new_data(img0.width, img0.height); // var img  = new ImageData(img0.width, img0.height) ; // duplicate original image to avoid mutating it

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

      _export('default', imageHelper);
    }
  };
});
$__System.register('47', [], function (_export) {
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

          $Z.helper.audio.play(); // play default blank sound in case audio hasn't been triggered yet (e.g. on iOS)
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

            $Z.helper.draw.indexed(viz.ui.item, viz.ui.canvas);

            var position = viz.screenCanvas.set_position();

            viz.viewportScaleX = viz.viewportWidth / viz.screenCanvas.width;
            viz.viewportScaleY = viz.viewportHeight / viz.screenCanvas.height;

            var xIn = Math.round(viz.viewportX + viz.viewportScaleX * (event.clientX - position.left) / position.scaleX);
            var yIn = Math.round(viz.viewportY + viz.viewportScaleY * (event.clientY - position.top) / position.scaleY);

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
$__System.register('48', ['3'], function (_export) {
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

          var xOrigin, yOrigin;
          if (itemConfig.centerSwitch === true) {
            xOrigin = itemConfig.image.width * 0.5;
            yOrigin = itemConfig.image.height * 0.5;
          } else {
            xOrigin = 0;
            yOrigin = 0;
          }

          var xScale, yScale;

          if (itemConfig.xScale === undefined) {
            xScale = 1;
          } else {
            xScale = itemConfig.xScale;
          }

          if (itemConfig.yScale === undefined) {
            yScale = 1;
          } else {
            yScale = itemConfig.yScale;
          }

          var addSwitch;

          if (itemConfig.addSwitch !== undefined) {
            addSwitch = itemConfig.addSwitch;
          } else {
            addSwitch = true;
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
            xOrigin: itemConfig.xOrigin || xOrigin,
            yOrigin: itemConfig.yOrigin || yOrigin,
            xAngle: itemConfig.xAngle || 0,
            yAngle: itemConfig.yAngle || 0,
            xScale: xScale,
            yScale: yScale,
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
            addSwitch: addSwitch,
            render: itemConfig.render || $Z.helper.draw.item };

          // $Z.helper.draw.image expects "this" to  be "item"

          _Object$assign(item, itemHelper.method);
          _Object$assign(item, $Z.helper.transition.method);

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

            var white = $Z.helper.effect.image.color_filter(item.image, [255, 255, 255]);

            item.white = $Z.helper.item.setup({
              viz: item.viz,
              addSwitch: false,
              image: white,
              opacity: 0,
              xOrigin: item.xOrigin,
              yOrigin: item.yOrigin
            });
            // item.white.childFade = true ;
            item.child.push(item.white);

            var black = $Z.helper.effect.image.color_filter(item.image, [0, 0, 0]);

            item.black = $Z.helper.item.setup({
              viz: item.viz,
              addSwitch: false,
              image: black,
              opacity: 0,
              xOrigin: item.xOrigin,
              yOrigin: item.yOrigin
            });

            // item.black.childFade = true ;

            item.black.image = black;

            item.child.push(item.black);
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

            item.add_transition(item.loop_trans(trans_func));
          },

          loop_function: function item_loop_func(func, duration, item) {

            if (item === undefined) {
              item = this;
            }

            if (func.constructor === String) {
              func = item[func];
            }

            if (duration === undefined) {
              duration = item.viz.loopDuration;
            }

            // console.log('item_loop_func:', 'item, func, duration', item, func, duration) ;

            var trans_func = function trans_func() {
              var trans = $Z.helper.transition.new_step('loop_' + func.name, null, duration);
              trans.end = function () {
                // console.log('item_loop_func trans.end:', 'this', this, 'func', func) ;
                func.call(this.item);
              };
              return trans;
            };

            // func.call(item) ;

            item.loop(trans_func);
          },

          call: function item_helper_call(callback, duration, loopSwitch, item) {

            if (item === undefined) {
              item = this;
            }

            if (loopSwitch === undefined) {
              loopSwitch = false;
            }

            if (callback.constructor === Array) {

              for (var kcall = 0; kcall < callback.length; kcall++) {

                if (callback[kcall].constructor === String) {
                  var callbackK = item[callback[kcall]];
                } else {
                  var callbackK = callback[kcall];
                }

                if (loopSwitch === true || loopSwitch === 'loop') {

                  var delayK;
                  if (duration.constructor === Number) {
                    delayK = duration;
                  } else if (duration.constructor === Array) {
                    delayK = duration[kcall];
                  } else {
                    console.log('item.call: duration is not a Number or Array');
                  }
                  // console.log('item helper call: ', 'kcall', kcall, 'callback[kcall]', callback[kcall], 'delayK', delayK) ;

                  item.loop_function(callbackK, delayK);
                } else {

                  var delaySum = 0;

                  if (duration.constructor === Number) {
                    var delayK = duration * (kcall + 1);
                  } else if (duration.constructor === Array) {
                    delaySum += duration[kcall];
                    delayK = delaySum;
                  } else {
                    console.log('item.call: duration is not a Number or Array');
                  }

                  // console.log('item helper call: ', 'kcall', kcall, 'callback[kcall]', callback[kcall], 'delayK', delayK) ;

                  if (callback[kcall].constructor === String) {
                    var callbackK = item[callback[kcall]];
                  } else {
                    var callbackK = callback[kcall];
                  }

                  item.run_callback(callbackK, delayK);
                }
              }
            } else {

              // console.log('item helper call: ', 'callback', callback, 'item', item)

              if (callback.constructor === String) {
                callback = item[callback];
              }

              // console.log('item helper call: ', 'callback 2', callback, 'duration', duration)

              if (loopSwitch === true || loopSwitch === 'loop') {
                item.loop_function(callback, duration);
              } else {
                item.run_callback(callback, duration);
              }
            }
          },

          run_callback: function item_helper_run_callback(callback, delay, item) {

            if (item === undefined) {
              item = this;
            }

            if (item.delayCount === undefined) {
              item.delayCount = 0;
            }

            item.delayCount++;

            var prop = 'delay' + item.delayCount;

            item[prop] = null;

            var trans = $Z.helper.transition.new_step(prop, undefined, delay);

            trans.end = function run_callback_end() {
              callback.call(item);
              // console.log('run_callback_end:', 'callback', callback, 'item', item)
            };

            // console.log('run_callback', 'item', item, 'trans', trans) ;

            item.add_transition(trans);

            // console.log('run_callback', 'item.transition', item.transition) ;
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
            var valueList = [blank, $Z.helper.draw.item];

            var flash = new Array(2 * Nflash);

            for (var kflash = 0; kflash < 2 * Nflash; kflash++) {
              flash[kflash] = $Z.helper.transition.new_step('render', valueList[kflash % valueList.length], flashDuration);
            }

            flash = $Z.helper.transition.sequence(flash);

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

            for (var _kstep = 0; _kstep < Nstep - 1; _kstep++) {
              xTransition[_kstep] = item.transitionSet[xKey](Math.round(Math.random() * xShakeMove[(_kstep + $Z.iter) % xShakeMove.length] * damping));
              yTransition[_kstep] = item.transitionSet[yKey](Math.round(Math.random() * yShakeMove[(_kstep + $Z.iter * 3) % xShakeMove.length] * damping));
              damping *= dampingFactor;
            }

            xTransition[kstep] = item.transitionSet[xKey](0);
            yTransition[kstep] = item.transitionSet[yKey](0);

            xTransition = $Z.helper.transition.sequence(xTransition)[0];
            yTransition = $Z.helper.transition.sequence(yTransition)[0];

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

            var newTransition = $Z.helper.effect.image.fade_transition(fadeConfig);

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
              return;
            }

            var fade_func = $Z.helper.transition.fixed_duration_creator('opacity', duration, $Z.helper.transition.linear_interp);

            item.white.add_sequence([1, 0], fade_func);
          },

          loop_fade: function item_helper_method_loop_fade(fader, fadeVal, item) {

            if (item === undefined) {
              item = this;
            }

            if (fader === undefined) {
              fader = item.viz.fader || item.fader; // the viz itself can act as an item
            }

            if (fadeVal === undefined) {
              fadeVal = [1, 0];
            }

            item.loop(function () {
              return fader.call(item.viz || this, fadeVal);
            });
          },

          focus: function item_helper_method_focus(item) {

            if (item === undefined) {
              item = this;
            }

            var index = $Z._item.indexOf(item);
            var last = $Z._item[$Z._item.length - 1];

            if (index > -1 && last !== item) {

              for (var kitem = index; kitem < $Z._item.length - 1; kitem++) {
                // left-shift by one:
                $Z._item[kitem] = $Z._item[kitem + 1];
              }

              $Z._item[$Z._item.length - 1] = item; // item to be focused becomes last
            }
          }

        }, // end: item helper method property

        text: function item_helper_method_text(textConfig) {
          var image = $Z.helper.image.text({
            text: textConfig.text,
            sprite: textConfig.sprite,
            color: textConfig.color || '#FFF'
          });

          var config = _Object$assign({ image: image }, textConfig);

          return textConfig.viz.setup_item(config);
        }

      };

      _export('default', itemHelper);
    }
  };
});
$__System.register('49', [], function (_export) {
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
              // console.log('AudioContext', AudioContext, '$Z.helper.audio', $Z.helper.audio)
              var audio = Object.copy($Z.helper.audio); // shallow copy, maintains a single AudioContext container for all source files loaded
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
              // console.log('request.response', request.response, '$Z.helper.audio.context', $Z.helper.audio.context, 'AudioContext', AudioContext) ;
              $Z.helper.audio.context.decodeAudioData(request.response, function (buff) {
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
$__System.registerDynamic("4a", ["16", "24", "35"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('16'),
      core = $__require('24'),
      fails = $__require('35');
  module.exports = function(KEY, exec) {
    var fn = (core.Object || {})[KEY] || Object[KEY],
        exp = {};
    exp[KEY] = exec(fn);
    $export($export.S + $export.F * fails(function() {
      fn(1);
    }), 'Object', exp);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4b", ["4c", "4a"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var toObject = $__require('4c');
  $__require('4a')('keys', function($keys) {
    return function keys(it) {
      return $keys(toObject(it));
    };
  });
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("4d", ["4b", "24"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('4b');
  module.exports = $__require('24').Object.keys;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("43", ["4d"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('4d'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register("4e", ["43"], function (_export) {
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

          var canvas = $Z.helper.image.create(totalWidth, totalHeight);
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

          $Z.helper.image.view(canvas);
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

          for (var k = 0; k < data.data.length; k++) {
            if (data.data[k] !== 0) {
              isZero = false;
              break;
            }
          }

          return isZero;
        },

        get: function sprite_helper_get(canvas, rowName, tileWidth, rowHeight, paddingSwitch) {

          // $Z.helper.image.view(canvas) ;

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
                var tile = $Z.helper.image.create(tileWidth[krow], maxHeight);
              } else {
                var tile = $Z.helper.image.create(tileWidth[krow], rowHeight[krow]);
              }
              var tileCtx = tile.context();
              var sx = kcol * tile.width;
              if (paddingSwitch) {
                tileCtx.drawImage(canvas, sx, sy, tile.width, rowHeight[krow], 0, maxHeight - rowHeight[krow], tile.width, rowHeight[krow]);
              } else {
                tileCtx.drawImage(canvas, sx, sy, tile.width, rowHeight[krow], 0, 0, tile.width, rowHeight[krow]);
              }
              // console.log('spiteHelper get:', 'sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height', sx, sy, tile.width, tile.height, 0, maxHeight - rowHeight[krow], tile.width, tile.height) ;
              var tileData = $Z.helper.image.get_data(tile);
              var isBlank = spriteHelper.is_blank(tileData);
              // console.log('spriteHelper get:', 'rowName[krow]', rowName[krow], 'kcol', kcol, 'tileData', tileData, 'isBlank', isBlank) ;
              if (isBlank) {
                break;
              }
              tile = $Z.helper.image.adjust_ratio(tile);
              // console.log('spriteHelper get', 'tileCanvas', tile) ;       
              row.push(tile);
            }
            // console.log('spriteHelper get:', 'krow', krow, 'row', row, 'tile.width', tile.width, 'tile.height', tile.height, 'maxHeight', maxHeight, 'rowHeight', rowHeight) ;
            spriteSet[rowName[krow]] = row;
            sy += rowHeight[krow];
          }

          return spriteSet;
        },

        get_text: function sprite_helper_get_text(url, width, height, alpha) {
          var canvas = $Z.helper.image.to_canvas(url);
          if (alpha === undefined) {
            alpha = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
          }
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

            spriteFlip[kFrame] = $Z.helper.image.flip_image(sprite[kFrame]);

            if (sprite[kFrame].originalCanvas !== undefined) {
              spriteFlip[kFrame].originalCanvas = $Z.helper.image.flip_image(sprite[kFrame].originalCanvas);
            }

            if (sprite[kFrame].sourceCollisionImage !== undefined) {
              spriteFlip[kFrame].sourceCollisionImage = $Z.helper.image.flip_image(sprite[kFrame].sourceCollisionImage);
            }

            if (sprite[kFrame].targetCollisionImage !== undefined) {
              spriteFlip[kFrame].targetCollisionImage = $Z.helper.image.flip_image(sprite[kFrame].targetCollisionImage);
            } else {
              // default target collision image is the same as the original
              spriteFlip[kFrame].targetCollisionImage = spriteFlip[kFrame];
            }
          }

          return spriteFlip;
        },

        animate: function sprite_helper_animate(valueList, create_transition, callback, restFrame) {
          var animation;
          if (restFrame === undefined) {
            animation = valueList;
          } else {
            animation = valueList.concat(restFrame);
          }

          var Nframe = animation.length;
          var transitionArray = new Array(Nframe);
          for (var kframe = 0; kframe < Nframe; kframe++) {
            var transition = create_transition(animation[kframe]);
            if (kframe === Nframe - 1) {
              transition.end = callback;
            }
            transitionArray[kframe] = transition;
          }
          return $Z.helper.transition.sequence(transitionArray);
        },

        animate_loop: function sprite_helper_animate_loop(loopConfig, valueList, create_transition, callback, restFrame) {
          // loop config expects: Nstep, position, frameDur
          var loopOutput = Object.copy(loopConfig); // initialize output variable
          var animation;
          if (restFrame === undefined) {
            animation = valueList;
          } else {
            animation = valueList.concat(restFrame);
          }

          var Nframe = animation.length;

          if (loopConfig.Nstep === undefined) {
            loopConfig.Nstep = 1;
            loopOutput.Nstep = 1; // run one step of the loop by default
          }

          var kPos = loopConfig.position;
          kPos = kPos % Nframe;
          var head = [];
          var body = [];
          var tail = [];

          // var image_transition = transitionHelper.step_func('image', loopConfig.frameDur) ;

          loopOutput.totalDur = loopOutput.Nstep * loopOutput.frameDur;
          var Nstep = loopConfig.Nstep;
          // var Nstep = Math.floor (loopConfig.totalDur / loopConfig.frameDur) + 1 ;

          if (kPos > 0) {
            // create head array
            var Nhead = Math.min(Nframe - kPos, Nstep);
            for (var kHead = 0; kHead < Nhead; kHead++) {
              head.push(animation[kPos + kHead]);
            }

            kPos += Nhead - 1;
            if (kPos === Nframe - 1 && Nstep > Nhead) {
              Nstep -= Nhead;
            } else {
              Nstep = 0;
            }
          }

          if (Nstep > 0) {
            // need body or tail
            kPos = Nstep;

            if (Nstep >= Nframe) {
              // create body array
              var Nbody = Math.floor(Nstep / Nframe);
              for (var kBody = 0; kBody < Nbody; kBody++) {
                body = body.concat(body, animation);
              }
              Nstep -= Nbody * Nframe;
            }
          }

          if (Nstep > 0) {
            // need tail
            kPos = Nstep - 1;
            for (var kTail = 0; kTail < Nstep; kTail++) {
              tail.push(animation[kTail]);
            }
          }

          var loop = head.concat(body.concat(tail));

          // console.log('animate_loop:', 'Nframe', Nframe, 'kpos', kPos, 'loop', loop, 'body', body, 'head', head, 'tail', tail) ;

          loopOutput.position = (loopOutput.position + loopConfig.Nstep) % Nframe;
          loopOutput.animation = $Z.helper.sprite.animate(loop, create_transition, callback);
          // loopOutput.animation[0].duration = 1 ; // show first frame immediately

          return loopOutput;
        }

      };

      _export("default", spriteHelper);
    }
  };
});
$__System.register('4f', [], function (_export) {
  'use strict';

  var transitionHelper;
  return {
    setters: [],
    execute: function () {
      transitionHelper = {

        interp: function transition_helper_interp(t) {

          if (this.power === undefined) {
            return transitionHelper.linear_interp(t);
          } else {
            return transitionHelper.power_interp.call(this, t);
          }
        },

        linear_interp: function linear_interp(t) {
          // attaches to transition object and handles linear interpolation of scalar values
          return (1 - t) * this.startValue + t * this.endValue; // return a value to avoid side-effects
        },

        power_interp: function transition_helper_power_interp(t) {
          t = Math.pow(t, Math.max(0, this.power));
          return transitionHelper.linear_interp.call(this, t);
        },

        rounded_linear_interp: function rounded_linear_interp(t) {
          // attaches to transition object and handles linear interpolation of scalar values
          return Math.round(transitionHelper.linear_interp(t)); // return a value to avoid side-effects
        },

        rounded_interp: function rounded_interp(t) {
          // attaches to transition object and handles linear interpolation of scalar values
          return Math.round(transitionHelper.interp(t)); // return a value to avoid side-effects
        },

        color_interp: function color_interp(t) {

          var color1 = this.startValue; // here, "this" refers to whatever context this gets bound to (not this module itself)
          var color2 = this.endValue; // here, "this" refers to whatever context this gets bound to (not this module itself)

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

        creator: function transition_helper_creator(varName, duration) {
          return this.build_func(varName, duration, this.interp);
        },

        linear_transition_func: function linear_transition_func(varName, duration) {
          return this.build_func(varName, duration, this.linear_interp);
        },

        rounded_linear_transition_func: function rounded_linear_transition_func(varName, duration) {
          return this.build_func(varName, duration, this.rounded_linear_interp);
        },

        color_transition_func: function color_transition_func(varName, duration) {
          return this.build_func(varName, duration, this.color_interp);
        },

        step_interp: function transition_helper_step_interp(t) {
          // represents a switch at t=0
          return this.endValue;
        },

        step_func: function transition_helper_step_func(varName, duration) {
          return transitionHelper.build_func(varName, duration, transitionHelper.step_interp);
        },

        linear_func: function transition_helper_linear_func(varName, duration) {
          return transitionHelper.build_func(varName, duration, transitionHelper.linear_interp);
        },

        rounded_linear_func: function transition_helper_rounded_linear_func(varName, duration) {
          return transitionHelper.build_func(varName, duration, transitionHelper.rounded_linear_interp);
        },

        fixed_duration: function transition_helper_fixed_duration_creator(property, duration) {
          return transitionHelper.build_func(property, duration, transitionHelper.interp);
        },

        fixed_duration_creator: function transition_helper_fixed_duration_creator(property, duration, interpolator) {
          return transitionHelper.build_func(property, duration, interpolator);
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

        'new': function transition_helper_new(property, value, duration, interpolator) {

          if (interpolator === undefined) {
            interpolator = transitionHelper.interp;
          }

          return transitionHelper.fixed_duration_creator(property, duration, interpolator)(value);
        },

        new_step: function transition_helper_new_step(property, value, duration) {
          return transitionHelper['new'](property, value, duration, transitionHelper.step_interp);
        },

        new_linear: function transition_helper_new_linear(property, value, duration) {
          return transitionHelper['new'](property, value, duration, transitionHelper.linear_interp);
        },

        new_power: function transition_helper_new_power(property, value, duration, power) {
          var trans = transitionHelper['new'](property, value, duration, transitionHelper.power_interp);
          trans.power = power;
          return trans;
        },

        new_rounded_linear: function transition_helper_new_rounded_linear(property, value, duration) {
          return transitionHelper['new'](property, value, duration, transitionHelper.rounded_linear_interp);
        },

        sequence: function transition_helper_sequence(transitionArray) {
          var transition = transitionArray[0];
          for (var k = 0; k < transitionArray.length - 1; k++) {
            transitionArray[k].child = transitionArray[k + 1];
          }
          return [transition];
        },

        new_sequence: function transition_helper_new_sequence(valueList, creator) {

          var trans = new Array(valueList.length);

          for (var k = 0; k < trans.length; k++) {
            trans[k] = creator(valueList[k]);
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

            for (var kNew = 0; kNew < newTransition.length; kNew++) {
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

          add_step: function transition_helper_add_step(property, value, duration, replacementSwitch, item) {

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

          add_linear: function transition_helper_add_linear(property, value, duration, replacementSwitch, item) {

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

          add_rounded_linear: function transition_helper_add_rounded_linear(property, value, duration, replacementSwitch, item) {

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

          add_power: function transition_helper_add_power(property, value, duration, power, replacementSwitch, item) {

            if (item === undefined) {
              item = this;
            }

            if (replacementSwitch === undefined) {
              replacementSwitch = true;
            }

            var transition = transitionHelper['new'](property, value, duration);
            transition.power = power;

            item.add_transition(transition, replacementSwitch);

            return item;
          },

          add_sequence: function transition_helper_new_sequence(valueList, creator, item) {

            if (item === undefined) {
              item = this;
            }

            var trans = new Array(valueList.length);

            for (var k = 0; k < trans.length; k++) {
              trans[k] = creator(valueList[k]);
            }

            item.add_transition(transitionHelper.sequence(trans));
          },

          add_linear_sequence: function transition_add_linear_sequence(propertyList, valueList, durationList, item) {

            if (item === undefined) {
              item = this;
            }

            if (propertyList.constructor === String) {

              var p = new Array(valueList.length);

              for (var kp = 0; kp < p.length; kp++) {
                p[kp] = propertyList;
              }

              propertyList = p;
            }

            if (durationList.constructor === Number) {

              var d = new Array(valueList.length);

              for (var kd = 0; kd < d.length; kd++) {
                d[kd] = durationList;
              }

              durationList = d;
            }

            var trans = new Array(valueList.length);

            var interp = transitionHelper.linear_interp;

            for (var kval = 0; kval < valueList.length; kval++) {
              trans[kval] = transitionHelper['new'](propertyList[kval], valueList[kval], durationList[kval], interp);
            }

            var seq = transitionHelper.sequence(trans);

            item.add_transition(seq);
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

          add_set: function transition_helper_add_set(property, value, duration, type, power, item) {

            if (type === undefined) {
              type = 'linear';
            }

            if (item === undefined) {
              item = this;
            }

            if (value.constructor === Number) {
              var val = new Array(property.length);
              for (var kval = 0; kval < val.length; kval++) {
                val[kval] = value;
              }
              value = val;
            }

            if (duration.constructor === Number) {
              var dur = new Array(property.length);
              for (var kdur = 0; kdur < dur.length; kdur++) {
                dur[kdur] = duration;
              }
              duration = dur;
            }

            if (power === undefined || power.constructor === Number) {
              var pow = new Array(property.length);
              for (var kpow = 0; kpow < pow.length; kpow++) {
                pow[kpow] = power;
              }
              power = pow;
            }

            for (var kprop = 0; kprop < property.length; kprop++) {
              item['add_' + type](property[kprop], value[kprop], duration[kprop], power[kprop]);
            }
          },

          loop_trans: function transition_helper_loop_trans(trans_func, item) {

            if (item === undefined) {
              item = this;
            }

            var trans;
            if (trans_func.constructor === String) {
              trans = item[trans_func]();
            } else {
              trans = trans_func();
            }

            trans.item = item;

            var child = transitionHelper.get_child(trans, 'last');

            if (child.end !== undefined) {

              if (child.end.constructor === Object) {
                child.end.run();
              } else {
                child.end();
              }
            }

            child.end = {

              item: item,
              transition_func: trans_func,
              run: transitionHelper.loop_end

            };

            // console.log('loop_trans:', 'trans', trans, 'child', child) ;

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

            if (property === undefined || property === 'all') {
              item.transition = [];
              return;
            }

            if (property.constructor === String) {
              property = [property];
            }

            for (var kprop = 0; kprop < property.length; kprop++) {

              var transitionIndex = transitionHelper.find(property, transitionList);

              if (transitionIndex > -1) {
                transitionList.splice(transitionIndex, 1);
              }
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
                  this.item.remove = $Z.core.item.remove;
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
$__System.register("50", [], function (_export) {
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

            canvas: uiConfig.canvas || $Z.helper.image.create(viz.width, viz.height),
            context: uiConfig.context || $Z.helper.image.create(viz.width, viz.height).context(),
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

$__System.registerDynamic("2b", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("26", ["2b"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var aFunction = $__require('2b');
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

$__System.registerDynamic("16", ["2e", "24", "26"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var global = $__require('2e'),
      core = $__require('24'),
      ctx = $__require('26'),
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

$__System.registerDynamic("10", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("8", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("4c", ["8"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var defined = $__require('8');
  module.exports = function(it) {
    return Object(defined(it));
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("22", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("e", ["22"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var cof = $__require('22');
  module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it) {
    return cof(it) == 'String' ? it.split('') : Object(it);
  };
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("35", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("51", ["10", "4c", "e", "35"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $ = $__require('10'),
      toObject = $__require('4c'),
      IObject = $__require('e');
  module.exports = $__require('35')(function() {
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
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("52", ["16", "51"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  var $export = $__require('16');
  $export($export.S + $export.F, 'Object', {assign: $__require('51')});
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("24", [], true, function($__require, exports, module) {
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

$__System.registerDynamic("53", ["52", "24"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  $__require('52');
  module.exports = $__require('24').Object.assign;
  global.define = __define;
  return module.exports;
});

$__System.registerDynamic("3", ["53"], true, function($__require, exports, module) {
  ;
  var global = this,
      __define = global.define;
  global.define = undefined;
  module.exports = {
    "default": $__require('53'),
    __esModule: true
  };
  global.define = __define;
  return module.exports;
});

$__System.register('54', ['3'], function (_export) {
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
            vizConfig.inputEvent = $Z.helper.input;
          }

          /* 
           *   TEMPORARY VARIABLES USED FOR SETTING UP THE VIZ OBJECT:
           */

          var dur = vizConfig.duration || 17; // the framespeed that vizflow uses (default is 60 frames per second)

          if (document.ratio === undefined) {
            document.ratio = 1;
          }

          var ratio = document.ratio; //(window.devicePixelRatio || 1) ;
          var vizWidth = vizConfig.width || 480;
          var vizHeight = vizConfig.height || 640;
          var displayWidth = Math.floor(vizWidth * ratio);
          var displayHeight = Math.floor(vizHeight * ratio);
          var paddingFactor = vizConfig.paddingFactor || 1; // ratio of full canvas to viewport
          var fullWidth = Math.floor(vizWidth * paddingFactor * ratio);
          var fullHeight = Math.floor(vizHeight * paddingFactor * ratio);

          var vizCanvas = $Z.helper.image.create(vizWidth, vizHeight); // model canvas (indepdenent of device pixel ratio)
          var fullCanvas = $Z.helper.image.create(fullWidth, fullHeight); // fully upsampled canvas (dependent on device pixel ratio)
          var screenCanvas = $Z.helper.image.create(displayWidth, displayHeight); // actual display canvas (drawn to screen once per step/cycle/frame of the animation engine)

          if (vizConfig.coverSwitch === true) {
            screenCanvas.cover = true;
            screenCanvas.maxWidth = Math.floor(displayWidth / Math.min(1, window.devicePixelRatio));
            screenCanvas.maxHeight = Math.floor(displayHeight / Math.min(1, window.devicePixelRatio));
          }

          var fullContext = fullCanvas.context(); // model canvas (indepdenent of device pixel ratio)
          var vizContext = vizCanvas.context();
          var screenContext = screenCanvas.context();

          screenCanvas.place();

          function resize(viz) {

            if (viz === undefined) {
              viz = this;
            }

            var w = window.innerWidth + 'px';
            var h = window.innerHeight + 'px';

            if (document.body.parentNode.style.width !== w) {
              document.body.parentNode.style.width = w;
            }

            if (document.body.style.width !== w) {
              document.body.style.width = w;
            }

            if (document.body.parentNode.style.height !== h) {
              document.body.parentNode.style.height = h;
            }

            if (document.body.style.height !== h) {
              document.body.style.height = h;
            }

            var position = viz.screenCanvas.set_position();

            if (viz.screenCanvas.cover === true) {

              var aspectRatio = position.width / position.height;
              var viewAspect = viz.viewportWidth / viz.viewportHeight;

              var tol = 0.001;

              if (aspectRatio < viewAspect && viewAspect / aspectRatio - 1 > tol) {
                // needs to be skinnier: make width smaller or height larger

                if (viz.viewportHeight < viz.fullCanvas.height) {
                  // expand height first as much as possible

                  var viewportHeight = viz.viewportHeight;
                  var newHeight = Math.min(viz.fullCanvas.height, viewAspect / aspectRatio * viewportHeight);
                  viz.viewportHeight = Math.round(newHeight);
                  viewAspect = viz.viewportWidth / viz.viewportHeight;
                }

                var viewportWidth = viz.viewportWidth;
                viewportWidth *= aspectRatio / viewAspect;
                viewportWidth = Math.round(viewportWidth);
                viz.viewportWidth = viewportWidth;
              } else if (aspectRatio > viewAspect && aspectRatio / viewAspect - 1 > tol) {
                // needs to be fatter: make width larger or height smaller

                if (viz.viewportWidth < viz.fullCanvas.width) {
                  // expand width first as much as possible

                  var viewportWidth = viz.viewportWidth;
                  var newWidth = Math.min(viz.fullCanvas.width, aspectRatio / viewAspect * viewportWidth);
                  viz.viewportWidth = Math.round(newWidth);
                  viewAspect = viz.viewportWidth / viz.viewportHeight;
                }

                var viewportHeight = viz.viewportHeight;
                viewportHeight *= viewAspect / aspectRatio;
                viewportHeight = Math.round(viewportHeight);
                viz.viewportHeight = viewportHeight;
              }

              var minWidth = 2;
              var minHeight = 2;

              viz.viewportWidth = Math.max(viz.viewportWidth, minWidth);
              viz.viewportHeight = Math.max(viz.viewportHeight, minHeight);

              viz.viewportWidth = Math.min(viz.viewportWidth, viz.screenCanvas.width);
              viz.viewportHeight = Math.min(viz.viewportHeight, viz.screenCanvas.height);

              if (viz.screenCanvas.hCenter === true) {
                viz.viewportX = Math.max(0, Math.round(0.5 * (viz.screenCanvas.width - viz.viewportWidth)));
              }
              if (viz.screenCanvas.vCenter === true) {
                viz.viewportY = Math.max(0, Math.round(0.5 * (viz.screenCanvas.height - viz.viewportHeight)));
              }
            }

            if (viz.resized === false) {
              viz.resized = true;
            }
          }

          var backgroundImageUrl = vizConfig.backgroundImageUrl;
          // console.log('vizHelper, resize, to_canvas start') ;

          var image;
          if (vizConfig.loadingImageUrl !== undefined) {
            image = $Z.helper.image.adjust_ratio($Z.helper.image.to_canvas(vizConfig.loadingImageUrl));
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

          var vCenter = vizConfig.vCenter;

          if (vCenter === undefined) {
            vCenter = true;
          }

          var hCenter = vizConfig.hCenter;

          if (hCenter === undefined) {
            hCenter = true;
          }

          /*
           *   DEFINE THE VIZ OBJECT:
           */

          var viz = {

            config: vizConfig,
            width: vizWidth,
            height: vizHeight,
            aspectRatio: vizWidth / vizHeight,
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
            resize: resize,
            resizeSkip: resizeSkip,
            resized: false,
            lastCollision: 0,
            lastResize: 0,
            viewportX: 0,
            viewportY: 0,
            viewportWidth: screenCanvas.width,
            viewportHeight: screenCanvas.height,
            viewportScaleX: 1,
            viewportScaleY: 1,
            hCenter: hCenter,
            vCenter: vCenter,
            detect: $Z.helper.action.detect,
            perform: $Z.helper.action.perform,
            image_transition: $Z.helper.transition.step_func('image', frameDuration),
            opacity: vizOpacity,
            fade: $Z.helper.item.method.fade,
            shake: $Z.helper.effect.shake,
            setup_item: $Z.helper.item.setup,
            setup_ui: $Z.helper.ui.setup,
            // setup_score: scoreHelper.setup, //  score setup function for games (optional, don't have to use it for non-games)
            clearSwitch: true,
            input: vizConfig.inputEvent || $Z.helper.input,
            run: vizConfig.run || vizHelper.run,
            stagingArray: vizConfig.item || [],
            screen_callback: vizConfig.screen_callback,
            keyboard_callback: vizConfig.keyboard_callback,

            transitionSet: {
              x: $Z.helper.transition.rounded_linear_transition_func('viewportX', 3 * dur), //function accepting an x end-value and returning a transition object     
              y: $Z.helper.transition.rounded_linear_transition_func('viewportY', 3 * dur) },

            //function accepting an x end-value and returning a transition object     
            collision: null,

            collision_detect: vizConfig.collision_detect || $Z.helper.collision.pixelwise, // pixel-wise collision detection works for any shape and can be used on lower resolution masks compared to the display images

            prep: function viz_prep() {

              if (!this.resized || $Z.iter - this.lastResize > this.resizeSkip) {
                this.screenCanvas.hCenter = this.hCenter;
                this.screenCanvas.vCenter = this.vCenter;

                this.canvas.hCenter = this.hCenter;
                this.canvas.vCenter = this.vCenter;

                this.resize();
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

            zoom_inout: $Z.helper.effect.zoom_inout,

            panX: function panX(dur, xNew) {

              var trans = $Z.helper.transition.sequence(xNew.map(function (x) {
                return $Z.helper.transition.rounded_linear_transition_func('viewportX', dur)(x);
              }));

              // console.log('panX trans', trans) ;
              this.add_transition(trans[0]);
            },

            panY: function panY(dur, yNew) {

              var trans = $Z.helper.transition.sequence(yNew.map(function (y) {
                return $Z.helper.transition.rounded_linear_transition_func('viewportY', dur)(y);
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

              return $Z.helper.effect.image.fade_sequence({

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

          _Object$assign(viz, $Z.helper.transition.method); // viz can be treated as an item
          _Object$assign(viz, $Z.helper.item.method); // viz can be treated as an item
          viz.zoom = $Z.helper.effect.zoom; // override item.zoom

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

        clear_cover: function viz_helper_clear_cover(viz, coverConfig) {

          var overlayImage = $Z.helper.image.create(viz.width, viz.height);

          $Z.helper.effect.image.opacity(overlayImage, 1);

          var overlayConfig = {
            image: overlayImage,
            uiSwitch: true,
            addSwitch: true
          };

          overlayConfig = _Object$assign(overlayConfig, coverConfig);

          return viz.setup_item(overlayConfig);
        }

      };

      _export('default', vizHelper);
    }
  };
});
$__System.register('1', ['2', '4', '40', '41', '42', '44', '45', '46', '47', '48', '49', '50', '54', '4e', '4f'], function (_export) {
  // vizflow modules: some functions for working with vizflow
  // by Daniel Korenblum 5/26/2016
  // https://github.com/vizflow/vizflow

  // define the vizflow helper property ($Z.helper):

  // Object.assign polyfill & wrapper

  // import the helper functions and wrappers attached to the $Z object:

  'use strict';

  var action, asynch, audio, collision, draw, effect, image, input, item, loader, ui, viz, sprite, transition, helper;
  return {
    setters: [function (_) {}, function (_2) {
      action = _2['default'];
    }, function (_3) {
      asynch = _3['default'];
    }, function (_4) {
      audio = _4['default'];
    }, function (_5) {
      collision = _5['default'];
    }, function (_6) {
      draw = _6['default'];
    }, function (_7) {
      effect = _7['default'];
    }, function (_8) {
      image = _8['default'];
    }, function (_9) {
      input = _9['default'];
    }, function (_10) {
      item = _10['default'];
    }, function (_11) {
      loader = _11['default'];
    }, function (_12) {
      ui = _12['default'];
    }, function (_13) {
      viz = _13['default'];
    }, function (_e) {
      sprite = _e['default'];
    }, function (_f) {
      transition = _f['default'];
    }],
    execute: function () {
      helper = { // define the "bling Z helper" property to store the helper modules that can be used when working with vizflow

        action: action,
        async: asynch,
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
        window.$Z.helper = helper;
      }

      _export('default', helper);
    }
  };
});
})
(function(factory) {
  factory();
});
//# sourceMappingURL=vizflow-helper.js.map