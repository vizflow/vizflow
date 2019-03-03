/* */ 
module.exports = minimatch;
minimatch.Minimatch = Minimatch;
var path = {sep: '/'};
try {
  path = require('path');
} catch (er) {}
var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
var expand = require('brace-expansion');
var plTypes = {
  '!': {
    open: '(?:(?!(?:',
    close: '))[^/]*?)'
  },
  '?': {
    open: '(?:',
    close: ')?'
  },
  '+': {
    open: '(?:',
    close: ')+'
  },
  '*': {
    open: '(?:',
    close: ')*'
  },
  '@': {
    open: '(?:',
    close: ')'
  }
};
var qmark = '[^/]';
var star = qmark + '*?';
var twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?';
var twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?';
var reSpecials = charSet('().*{}+?[]^$\\!');
function charSet(s) {
  return s.split('').reduce(function(set, c) {
    set[c] = true;
    return set;
  }, {});
}
var slashSplit = /\/+/;
minimatch.filter = filter;
function filter(pattern, options) {
  options = options || {};
  return function(p, i, list) {
    return minimatch(p, pattern, options);
  };
}
function ext(a, b) {
  a = a || {};
  b = b || {};
  var t = {};
  Object.keys(b).forEach(function(k) {
    t[k] = b[k];
  });
  Object.keys(a).forEach(function(k) {
    t[k] = a[k];
  });
  return t;
}
minimatch.defaults = function(def) {
  if (!def || !Object.keys(def).length)
    return minimatch;
  var orig = minimatch;
  var m = function minimatch(p, pattern, options) {
    return orig.minimatch(p, pattern, ext(def, options));
  };
  m.Minimatch = function Minimatch(pattern, options) {
    return new orig.Minimatch(pattern, ext(def, options));
  };
  return m;
};
Minimatch.defaults = function(def) {
  if (!def || !Object.keys(def).length)
    return Minimatch;
  return minimatch.defaults(def).Minimatch;
};
function minimatch(p, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required');
  }
  if (!options)
    options = {};
  if (!options.nocomment && pattern.charAt(0) === '#') {
    return false;
  }
  if (pattern.trim() === '')
    return p === '';
  return new Minimatch(pattern, options).match(p);
}
function Minimatch(pattern, options) {
  if (!(this instanceof Minimatch)) {
    return new Minimatch(pattern, options);
  }
  if (typeof pattern !== 'string') {
    throw new TypeError('glob pattern string required');
  }
  if (!options)
    options = {};
  pattern = pattern.trim();
  if (path.sep !== '/') {
    pattern = pattern.split(path.sep).join('/');
  }
  this.options = options;
  this.set = [];
  this.pattern = pattern;
  this.regexp = null;
  this.negate = false;
  this.comment = false;
  this.empty = false;
  this.make();
}
Minimatch.prototype.debug = function() {};
Minimatch.prototype.make = make;
function make() {
  if (this._made)
    return;
  var pattern = this.pattern;
  var options = this.options;
  if (!options.nocomment && pattern.charAt(0) === '#') {
    this.comment = true;
    return;
  }
  if (!pattern) {
    this.empty = true;
    return;
  }
  this.parseNegate();
  var set = this.globSet = this.braceExpand();
  if (options.debug)
    this.debug = console.error;
  this.debug(this.pattern, set);
  set = this.globParts = set.map(function(s) {
    return s.split(slashSplit);
  });
  this.debug(this.pattern, set);
  set = set.map(function(s, si, set) {
    return s.map(this.parse, this);
  }, this);
  this.debug(this.pattern, set);
  set = set.filter(function(s) {
    return s.indexOf(false) === -1;
  });
  this.debug(this.pattern, set);
  this.set = set;
}
Minimatch.prototype.parseNegate = parseNegate;
function parseNegate() {
  var pattern = this.pattern;
  var negate = false;
  var options = this.options;
  var negateOffset = 0;
  if (options.nonegate)
    return;
  for (var i = 0,
      l = pattern.length; i < l && pattern.charAt(i) === '!'; i++) {
    negate = !negate;
    negateOffset++;
  }
  if (negateOffset)
    this.pattern = pattern.substr(negateOffset);
  this.negate = negate;
}
minimatch.braceExpand = function(pattern, options) {
  return braceExpand(pattern, options);
};
Minimatch.prototype.braceExpand = braceExpand;
function braceExpand(pattern, options) {
  if (!options) {
    if (this instanceof Minimatch) {
      options = this.options;
    } else {
      options = {};
    }
  }
  pattern = typeof pattern === 'undefined' ? this.pattern : pattern;
  if (typeof pattern === 'undefined') {
    throw new TypeError('undefined pattern');
  }
  if (options.nobrace || !pattern.match(/\{.*\}/)) {
    return [pattern];
  }
  return expand(pattern);
}
Minimatch.prototype.parse = parse;
var SUBPARSE = {};
function parse(pattern, isSub) {
  if (pattern.length > 1024 * 64) {
    throw new TypeError('pattern is too long');
  }
  var options = this.options;
  if (!options.noglobstar && pattern === '**')
    return GLOBSTAR;
  if (pattern === '')
    return '';
  var re = '';
  var hasMagic = !!options.nocase;
  var escaping = false;
  var patternListStack = [];
  var negativeLists = [];
  var stateChar;
  var inClass = false;
  var reClassStart = -1;
  var classStart = -1;
  var patternStart = pattern.charAt(0) === '.' ? '' : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
  var self = this;
  function clearStateChar() {
    if (stateChar) {
      switch (stateChar) {
        case '*':
          re += star;
          hasMagic = true;
          break;
        case '?':
          re += qmark;
          hasMagic = true;
          break;
        default:
          re += '\\' + stateChar;
          break;
      }
      self.debug('clearStateChar %j %j', stateChar, re);
      stateChar = false;
    }
  }
  for (var i = 0,
      len = pattern.length,
      c; (i < len) && (c = pattern.charAt(i)); i++) {
    this.debug('%s\t%s %s %j', pattern, i, re, c);
    if (escaping && reSpecials[c]) {
      re += '\\' + c;
      escaping = false;
      continue;
    }
    switch (c) {
      case '/':
        return false;
      case '\\':
        clearStateChar();
        escaping = true;
        continue;
      case '?':
      case '*':
      case '+':
      case '@':
      case '!':
        this.debug('%s\t%s %s %j <-- stateChar', pattern, i, re, c);
        if (inClass) {
          this.debug('  in class');
          if (c === '!' && i === classStart + 1)
            c = '^';
          re += c;
          continue;
        }
        self.debug('call clearStateChar %j', stateChar);
        clearStateChar();
        stateChar = c;
        if (options.noext)
          clearStateChar();
        continue;
      case '(':
        if (inClass) {
          re += '(';
          continue;
        }
        if (!stateChar) {
          re += '\\(';
          continue;
        }
        patternListStack.push({
          type: stateChar,
          start: i - 1,
          reStart: re.length,
          open: plTypes[stateChar].open,
          close: plTypes[stateChar].close
        });
        re += stateChar === '!' ? '(?:(?!(?:' : '(?:';
        this.debug('plType %j %j', stateChar, re);
        stateChar = false;
        continue;
      case ')':
        if (inClass || !patternListStack.length) {
          re += '\\)';
          continue;
        }
        clearStateChar();
        hasMagic = true;
        var pl = patternListStack.pop();
        re += pl.close;
        if (pl.type === '!') {
          negativeLists.push(pl);
        }
        pl.reEnd = re.length;
        continue;
      case '|':
        if (inClass || !patternListStack.length || escaping) {
          re += '\\|';
          escaping = false;
          continue;
        }
        clearStateChar();
        re += '|';
        continue;
      case '[':
        clearStateChar();
        if (inClass) {
          re += '\\' + c;
          continue;
        }
        inClass = true;
        classStart = i;
        reClassStart = re.length;
        re += c;
        continue;
      case ']':
        if (i === classStart + 1 || !inClass) {
          re += '\\' + c;
          escaping = false;
          continue;
        }
        if (inClass) {
          var cs = pattern.substring(classStart + 1, i);
          try {
            RegExp('[' + cs + ']');
          } catch (er) {
            var sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0] + '\\]';
            hasMagic = hasMagic || sp[1];
            inClass = false;
            continue;
          }
        }
        hasMagic = true;
        inClass = false;
        re += c;
        continue;
      default:
        clearStateChar();
        if (escaping) {
          escaping = false;
        } else if (reSpecials[c] && !(c === '^' && inClass)) {
          re += '\\';
        }
        re += c;
    }
  }
  if (inClass) {
    cs = pattern.substr(classStart + 1);
    sp = this.parse(cs, SUBPARSE);
    re = re.substr(0, reClassStart) + '\\[' + sp[0];
    hasMagic = hasMagic || sp[1];
  }
  for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
    var tail = re.slice(pl.reStart + pl.open.length);
    this.debug('setting tail', re, pl);
    tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
      if (!$2) {
        $2 = '\\';
      }
      return $1 + $1 + $2 + '|';
    });
    this.debug('tail=%j\n   %s', tail, tail, pl, re);
    var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
    hasMagic = true;
    re = re.slice(0, pl.reStart) + t + '\\(' + tail;
  }
  clearStateChar();
  if (escaping) {
    re += '\\\\';
  }
  var addPatternStart = false;
  switch (re.charAt(0)) {
    case '.':
    case '[':
    case '(':
      addPatternStart = true;
  }
  for (var n = negativeLists.length - 1; n > -1; n--) {
    var nl = negativeLists[n];
    var nlBefore = re.slice(0, nl.reStart);
    var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
    var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
    var nlAfter = re.slice(nl.reEnd);
    nlLast += nlAfter;
    var openParensBefore = nlBefore.split('(').length - 1;
    var cleanAfter = nlAfter;
    for (i = 0; i < openParensBefore; i++) {
      cleanAfter = cleanAfter.replace(/\)[+*?]?/, '');
    }
    nlAfter = cleanAfter;
    var dollar = '';
    if (nlAfter === '' && isSub !== SUBPARSE) {
      dollar = '$';
    }
    var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
    re = newRe;
  }
  if (re !== '' && hasMagic) {
    re = '(?=.)' + re;
  }
  if (addPatternStart) {
    re = patternStart + re;
  }
  if (isSub === SUBPARSE) {
    return [re, hasMagic];
  }
  if (!hasMagic) {
    return globUnescape(pattern);
  }
  var flags = options.nocase ? 'i' : '';
  try {
    var regExp = new RegExp('^' + re + '$', flags);
  } catch (er) {
    return new RegExp('$.');
  }
  regExp._glob = pattern;
  regExp._src = re;
  return regExp;
}
minimatch.makeRe = function(pattern, options) {
  return new Minimatch(pattern, options || {}).makeRe();
};
Minimatch.prototype.makeRe = makeRe;
function makeRe() {
  if (this.regexp || this.regexp === false)
    return this.regexp;
  var set = this.set;
  if (!set.length) {
    this.regexp = false;
    return this.regexp;
  }
  var options = this.options;
  var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
  var flags = options.nocase ? 'i' : '';
  var re = set.map(function(pattern) {
    return pattern.map(function(p) {
      return (p === GLOBSTAR) ? twoStar : (typeof p === 'string') ? regExpEscape(p) : p._src;
    }).join('\\\/');
  }).join('|');
  re = '^(?:' + re + ')$';
  if (this.negate)
    re = '^(?!' + re + ').*$';
  try {
    this.regexp = new RegExp(re, flags);
  } catch (ex) {
    this.regexp = false;
  }
  return this.regexp;
}
minimatch.match = function(list, pattern, options) {
  options = options || {};
  var mm = new Minimatch(pattern, options);
  list = list.filter(function(f) {
    return mm.match(f);
  });
  if (mm.options.nonull && !list.length) {
    list.push(pattern);
  }
  return list;
};
Minimatch.prototype.match = match;
function match(f, partial) {
  this.debug('match', f, this.pattern);
  if (this.comment)
    return false;
  if (this.empty)
    return f === '';
  if (f === '/' && partial)
    return true;
  var options = this.options;
  if (path.sep !== '/') {
    f = f.split(path.sep).join('/');
  }
  f = f.split(slashSplit);
  this.debug(this.pattern, 'split', f);
  var set = this.set;
  this.debug(this.pattern, 'set', set);
  var filename;
  var i;
  for (i = f.length - 1; i >= 0; i--) {
    filename = f[i];
    if (filename)
      break;
  }
  for (i = 0; i < set.length; i++) {
    var pattern = set[i];
    var file = f;
    if (options.matchBase && pattern.length === 1) {
      file = [filename];
    }
    var hit = this.matchOne(file, pattern, partial);
    if (hit) {
      if (options.flipNegate)
        return true;
      return !this.negate;
    }
  }
  if (options.flipNegate)
    return false;
  return this.negate;
}
Minimatch.prototype.matchOne = function(file, pattern, partial) {
  var options = this.options;
  this.debug('matchOne', {
    'this': this,
    file: file,
    pattern: pattern
  });
  this.debug('matchOne', file.length, pattern.length);
  for (var fi = 0,
      pi = 0,
      fl = file.length,
      pl = pattern.length; (fi < fl) && (pi < pl); fi++, pi++) {
    this.debug('matchOne loop');
    var p = pattern[pi];
    var f = file[fi];
    this.debug(pattern, p, f);
    if (p === false)
      return false;
    if (p === GLOBSTAR) {
      this.debug('GLOBSTAR', [pattern, p, f]);
      var fr = fi;
      var pr = pi + 1;
      if (pr === pl) {
        this.debug('** at the end');
        for (; fi < fl; fi++) {
          if (file[fi] === '.' || file[fi] === '..' || (!options.dot && file[fi].charAt(0) === '.'))
            return false;
        }
        return true;
      }
      while (fr < fl) {
        var swallowee = file[fr];
        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);
        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
          this.debug('globstar found match!', fr, fl, swallowee);
          return true;
        } else {
          if (swallowee === '.' || swallowee === '..' || (!options.dot && swallowee.charAt(0) === '.')) {
            this.debug('dot detected!', file, fr, pattern, pr);
            break;
          }
          this.debug('globstar swallow a segment, and continue');
          fr++;
        }
      }
      if (partial) {
        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
        if (fr === fl)
          return true;
      }
      return false;
    }
    var hit;
    if (typeof p === 'string') {
      if (options.nocase) {
        hit = f.toLowerCase() === p.toLowerCase();
      } else {
        hit = f === p;
      }
      this.debug('string match', p, f, hit);
    } else {
      hit = f.match(p);
      this.debug('pattern match', p, f, hit);
    }
    if (!hit)
      return false;
  }
  if (fi === fl && pi === pl) {
    return true;
  } else if (fi === fl) {
    return partial;
  } else if (pi === pl) {
    var emptyFileEnd = (fi === fl - 1) && (file[fi] === '');
    return emptyFileEnd;
  }
  throw new Error('wtf?');
};
function globUnescape(s) {
  return s.replace(/\\(.)/g, '$1');
}
function regExpEscape(s) {
  return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}
