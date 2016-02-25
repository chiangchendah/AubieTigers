(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./argon"), require("three"), require("threestrap"));
	else if(typeof define === 'function' && define.amd)
		define(["argon", , ], factory);
	else if(typeof exports === 'object')
		exports["Argon"] = factory(require("./argon")["Argon"], require(undefined), require(undefined));
	else
		root["Argon"] = factory(root["Argon"], root["THREE"], root["THREE"]["Bootstrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_171__, __WEBPACK_EXTERNAL_MODULE_172__, __WEBPACK_EXTERNAL_MODULE_258__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Georgia Tech Research Corporation
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//    http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	//
	// This software was created as part of a research project at the
	// Augmented Environments Lab at Georgia Tech.  To support our research, we
	// request that if you make use of this software, you let us know how
	// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
	//

	'use strict';

	var Argon = module.exports = __webpack_require__(171);
	var THREE = __webpack_require__(172);
	THREE.Bootstrap = __webpack_require__(258);

	if (!THREE) throw new Error("three.js must be loaded before argon-three.js");
	if (!THREE.Bootstrap) throw new Error("threestrap.js must be loaded before argon-three.js");

	__webpack_require__(261);

	var _argonCorePlugins = ['bind', 'renderer', 'size', 'fill', 'time', 'scene', 'camera', 'render', /*'warmup',*/'argon'];
	THREE.Bootstrap.registerAlias('argon-core', _argonCorePlugins);

	if (!THREE.CSS3DRenderer) __webpack_require__(259);
	if (!THREE.MultiRenderer) __webpack_require__(260);

	THREE.Bootstrap.createArgonOptions = function (context) {
	  context = context || Argon.immersiveContext;

	  var options = {};

	  options.plugins = _argonCorePlugins.splice(0);

	  options.argon = {
	    context: context
	  };

	  // options.size = {
	  //   // maxRenderWidth: window.screen.width/3,
	  //   // maxRenderHeight: window.screen.height/3
	  //   scale: 1 / window.devicePixelRatio
	  // }

	  options.element = context.element;

	  options.renderer = {
	    klass: THREE.MultiRenderer,
	    parameters: {
	      renderers: [THREE.WebGLRenderer, THREE.CSS3DRenderer], // stacked back to front
	      parameters: [{
	        alpha: true,
	        depth: true,
	        stencil: true,
	        preserveDrawingBuffer: true,
	        antialias: true,
	        logarithmicDepthBuffer: true
	      }, {} // CSS3DRenderer doesn't have any parameters
	      ]
	    }
	  };

	  return options;
	};

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports) {

	var $Object = Object;
	module.exports = {
	  create:     $Object.create,
	  getProto:   $Object.getPrototypeOf,
	  isEnum:     {}.propertyIsEnumerable,
	  getDesc:    $Object.getOwnPropertyDescriptor,
	  setDesc:    $Object.defineProperty,
	  setDescs:   $Object.defineProperties,
	  getKeys:    $Object.keys,
	  getNames:   $Object.getOwnPropertyNames,
	  getSymbols: $Object.getOwnPropertySymbols,
	  each:       [].forEach
	};

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ function(module, exports) {

	var core = module.exports = {version: '1.2.6'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var store  = __webpack_require__(131)('wks')
	  , uid    = __webpack_require__(53)
	  , Symbol = __webpack_require__(38).Symbol;
	module.exports = function(name){
	  return store[name] || (store[name] =
	    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
	};

/***/ },
/* 15 */,
/* 16 */,
/* 17 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(8)
	  , createDesc = __webpack_require__(76);
	module.exports = __webpack_require__(36) ? function(object, key, value){
	  return $.setDesc(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(38)
	  , core      = __webpack_require__(13)
	  , ctx       = __webpack_require__(29)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
	  }
	};
	// type bitmap
	$export.F = 1;  // forced
	$export.G = 2;  // global
	$export.S = 4;  // static
	$export.P = 8;  // proto
	$export.B = 16; // bind
	$export.W = 32; // wrap
	module.exports = $export;

/***/ },
/* 26 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(17);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(118);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(61)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var ctx         = __webpack_require__(29)
	  , call        = __webpack_require__(127)
	  , isArrayIter = __webpack_require__(125)
	  , anObject    = __webpack_require__(28)
	  , toLength    = __webpack_require__(78)
	  , getIterFn   = __webpack_require__(79);
	module.exports = function(iterable, entries, fn, that){
	  var iterFn = getIterFn(iterable)
	    , f      = ctx(fn, that, entries ? 2 : 1)
	    , index  = 0
	    , length, step, iterator;
	  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
	  // fast case for arrays with default iterator
	  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
	    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
	  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
	    call(iterator, f, step.value, entries);
	  }
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(129)
	  , $export        = __webpack_require__(25)
	  , redefine       = __webpack_require__(50)
	  , hide           = __webpack_require__(21)
	  , has            = __webpack_require__(26)
	  , Iterators      = __webpack_require__(27)
	  , $iterCreate    = __webpack_require__(128)
	  , setToStringTag = __webpack_require__(51)
	  , getProto       = __webpack_require__(8).getProto
	  , ITERATOR       = __webpack_require__(14)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , methods, key;
	  // Fix native
	  if($native){
	    var IteratorPrototype = getProto($default.call(new Base));
	    // Set @@toStringTag to native iterators
	    setToStringTag(IteratorPrototype, TAG, true);
	    // FF fix
	    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    // fix Array#{values, @@iterator}.name in V8 / FF
	    if(DEF_VALUES && $native.name !== VALUES){
	      VALUES_BUG = true;
	      $default = function values(){ return $native.call(this); };
	    }
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES  ? $default : getMethod(VALUES),
	      keys:    IS_SET      ? $default : getMethod(KEYS),
	      entries: !DEF_VALUES ? $default : getMethod('entries')
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var redefine = __webpack_require__(50);
	module.exports = function(target, src){
	  for(var key in src)redefine(target, key, src[key]);
	  return target;
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(8).setDesc
	  , has = __webpack_require__(26)
	  , TAG = __webpack_require__(14)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = function(it, Constructor, name){
	  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
	  return it;
	};

/***/ },
/* 53 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(134);
	var Iterators = __webpack_require__(27);
	Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;

/***/ },
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 62 */,
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(74)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(47)
	  , TAG = __webpack_require__(14)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(8)
	  , global         = __webpack_require__(38)
	  , $export        = __webpack_require__(25)
	  , fails          = __webpack_require__(61)
	  , hide           = __webpack_require__(21)
	  , redefineAll    = __webpack_require__(49)
	  , forOf          = __webpack_require__(37)
	  , strictNew      = __webpack_require__(52)
	  , isObject       = __webpack_require__(17)
	  , setToStringTag = __webpack_require__(51)
	  , DESCRIPTORS    = __webpack_require__(36);

	module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
	  var Base  = global[NAME]
	    , C     = Base
	    , ADDER = IS_MAP ? 'set' : 'add'
	    , proto = C && C.prototype
	    , O     = {};
	  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
	    new C().entries().next();
	  }))){
	    // create collection constructor
	    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
	    redefineAll(C.prototype, methods);
	  } else {
	    C = wrapper(function(target, iterable){
	      strictNew(target, C, NAME);
	      target._c = new Base;
	      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
	    });
	    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
	      var IS_ADDER = KEY == 'add' || KEY == 'set';
	      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
	        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
	        var result = this._c[KEY](a === 0 ? 0 : a, b);
	        return IS_ADDER ? this : result;
	      });
	    });
	    if('size' in proto)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return this._c.size;
	      }
	    });
	  }

	  setToStringTag(C, NAME);

	  O[NAME] = C;
	  $export($export.G + $export.W + $export.F, O);

	  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

	  return C;
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(47);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(77)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(72)
	  , ITERATOR  = __webpack_require__(14)('iterator')
	  , Iterators = __webpack_require__(27);
	module.exports = __webpack_require__(13).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 80 */
/***/ function(module, exports) {

	

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(132)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(48)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 82 */,
/* 83 */,
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(88), __esModule: true };

/***/ },
/* 86 */,
/* 87 */,
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(8);
	module.exports = function create(P, D){
	  return $.create(P, D);
	};

/***/ },
/* 89 */,
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(54);
	__webpack_require__(81);
	module.exports = __webpack_require__(133);

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(54);
	__webpack_require__(135);
	__webpack_require__(137);
	module.exports = __webpack_require__(13).Set;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(80);
	__webpack_require__(54);
	__webpack_require__(136);
	module.exports = __webpack_require__(13).WeakMap;

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	// 0 -> Array#forEach
	// 1 -> Array#map
	// 2 -> Array#filter
	// 3 -> Array#some
	// 4 -> Array#every
	// 5 -> Array#find
	// 6 -> Array#findIndex
	var ctx      = __webpack_require__(29)
	  , IObject  = __webpack_require__(74)
	  , toObject = __webpack_require__(90)
	  , toLength = __webpack_require__(78)
	  , asc      = __webpack_require__(121);
	module.exports = function(TYPE){
	  var IS_MAP        = TYPE == 1
	    , IS_FILTER     = TYPE == 2
	    , IS_SOME       = TYPE == 3
	    , IS_EVERY      = TYPE == 4
	    , IS_FIND_INDEX = TYPE == 6
	    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX;
	  return function($this, callbackfn, that){
	    var O      = toObject($this)
	      , self   = IObject(O)
	      , f      = ctx(callbackfn, that, 3)
	      , length = toLength(self.length)
	      , index  = 0
	      , result = IS_MAP ? asc($this, length) : IS_FILTER ? asc($this, 0) : undefined
	      , val, res;
	    for(;length > index; index++)if(NO_HOLES || index in self){
	      val = self[index];
	      res = f(val, index, O);
	      if(TYPE){
	        if(IS_MAP)result[index] = res;            // map
	        else if(res)switch(TYPE){
	          case 3: return true;                    // some
	          case 5: return val;                     // find
	          case 6: return index;                   // findIndex
	          case 2: result.push(val);               // filter
	        } else if(IS_EVERY)return false;          // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
	  };
	};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

	// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
	var isObject = __webpack_require__(17)
	  , isArray  = __webpack_require__(126)
	  , SPECIES  = __webpack_require__(14)('species');
	module.exports = function(original, length){
	  var C;
	  if(isArray(original)){
	    C = original.constructor;
	    // cross-realm fallback
	    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
	    if(isObject(C)){
	      C = C[SPECIES];
	      if(C === null)C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length);
	};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(8)
	  , hide         = __webpack_require__(21)
	  , redefineAll  = __webpack_require__(49)
	  , ctx          = __webpack_require__(29)
	  , strictNew    = __webpack_require__(52)
	  , defined      = __webpack_require__(35)
	  , forOf        = __webpack_require__(37)
	  , $iterDefine  = __webpack_require__(48)
	  , step         = __webpack_require__(75)
	  , ID           = __webpack_require__(53)('id')
	  , $has         = __webpack_require__(26)
	  , isObject     = __webpack_require__(17)
	  , setSpecies   = __webpack_require__(130)
	  , DESCRIPTORS  = __webpack_require__(36)
	  , isExtensible = Object.isExtensible || isObject
	  , SIZE         = DESCRIPTORS ? '_s' : 'size'
	  , id           = 0;

	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!$has(it, ID)){
	    // can't set id to frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add id
	    if(!create)return 'E';
	    // add missing object id
	    hide(it, ID, ++id);
	  // return object id with prefix
	  } return 'O' + it[ID];
	};

	var getEntry = function(that, key){
	  // fast case
	  var index = fastKey(key), entry;
	  if(index !== 'F')return that._i[index];
	  // frozen object case
	  for(entry = that._f; entry; entry = entry.n){
	    if(entry.k == key)return entry;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = $.create(null); // index
	      that._f = undefined;      // first entry
	      that._l = undefined;      // last entry
	      that[SIZE] = 0;           // size
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear(){
	        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
	          entry.r = true;
	          if(entry.p)entry.p = entry.p.n = undefined;
	          delete data[entry.i];
	        }
	        that._f = that._l = undefined;
	        that[SIZE] = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function(key){
	        var that  = this
	          , entry = getEntry(that, key);
	        if(entry){
	          var next = entry.n
	            , prev = entry.p;
	          delete that._i[entry.i];
	          entry.r = true;
	          if(prev)prev.n = next;
	          if(next)next.p = prev;
	          if(that._f == entry)that._f = next;
	          if(that._l == entry)that._l = prev;
	          that[SIZE]--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /*, that = undefined */){
	        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
	          , entry;
	        while(entry = entry ? entry.n : this._f){
	          f(entry.v, entry.k, this);
	          // revert to the last existing entry
	          while(entry && entry.r)entry = entry.p;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key){
	        return !!getEntry(this, key);
	      }
	    });
	    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
	      get: function(){
	        return defined(this[SIZE]);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    var entry = getEntry(that, key)
	      , prev, index;
	    // change existing entry
	    if(entry){
	      entry.v = value;
	    // create new entry
	    } else {
	      that._l = entry = {
	        i: index = fastKey(key, true), // <- index
	        k: key,                        // <- key
	        v: value,                      // <- value
	        p: prev = that._l,             // <- previous entry
	        n: undefined,                  // <- next entry
	        r: false                       // <- removed
	      };
	      if(!that._f)that._f = entry;
	      if(prev)prev.n = entry;
	      that[SIZE]++;
	      // add to index
	      if(index !== 'F')that._i[index] = entry;
	    } return that;
	  },
	  getEntry: getEntry,
	  setStrong: function(C, NAME, IS_MAP){
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    $iterDefine(C, NAME, function(iterated, kind){
	      this._t = iterated;  // target
	      this._k = kind;      // kind
	      this._l = undefined; // previous
	    }, function(){
	      var that  = this
	        , kind  = that._k
	        , entry = that._l;
	      // revert to the last existing entry
	      while(entry && entry.r)entry = entry.p;
	      // get next entry
	      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
	        // or finish the iteration
	        that._t = undefined;
	        return step(1);
	      }
	      // return step by kind
	      if(kind == 'keys'  )return step(0, entry.k);
	      if(kind == 'values')return step(0, entry.v);
	      return step(0, [entry.k, entry.v]);
	    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(NAME);
	  }
	};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var forOf   = __webpack_require__(37)
	  , classof = __webpack_require__(72);
	module.exports = function(NAME){
	  return function toJSON(){
	    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
	    var arr = [];
	    forOf(this, false, arr.push, arr);
	    return arr;
	  };
	};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var hide              = __webpack_require__(21)
	  , redefineAll       = __webpack_require__(49)
	  , anObject          = __webpack_require__(28)
	  , isObject          = __webpack_require__(17)
	  , strictNew         = __webpack_require__(52)
	  , forOf             = __webpack_require__(37)
	  , createArrayMethod = __webpack_require__(120)
	  , $has              = __webpack_require__(26)
	  , WEAK              = __webpack_require__(53)('weak')
	  , isExtensible      = Object.isExtensible || isObject
	  , arrayFind         = createArrayMethod(5)
	  , arrayFindIndex    = createArrayMethod(6)
	  , id                = 0;

	// fallback for frozen keys
	var frozenStore = function(that){
	  return that._l || (that._l = new FrozenStore);
	};
	var FrozenStore = function(){
	  this.a = [];
	};
	var findFrozen = function(store, key){
	  return arrayFind(store.a, function(it){
	    return it[0] === key;
	  });
	};
	FrozenStore.prototype = {
	  get: function(key){
	    var entry = findFrozen(this, key);
	    if(entry)return entry[1];
	  },
	  has: function(key){
	    return !!findFrozen(this, key);
	  },
	  set: function(key, value){
	    var entry = findFrozen(this, key);
	    if(entry)entry[1] = value;
	    else this.a.push([key, value]);
	  },
	  'delete': function(key){
	    var index = arrayFindIndex(this.a, function(it){
	      return it[0] === key;
	    });
	    if(~index)this.a.splice(index, 1);
	    return !!~index;
	  }
	};

	module.exports = {
	  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
	    var C = wrapper(function(that, iterable){
	      strictNew(that, C, NAME);
	      that._i = id++;      // collection id
	      that._l = undefined; // leak store for frozen objects
	      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
	    });
	    redefineAll(C.prototype, {
	      // 23.3.3.2 WeakMap.prototype.delete(key)
	      // 23.4.3.3 WeakSet.prototype.delete(value)
	      'delete': function(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this)['delete'](key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i) && delete key[WEAK][this._i];
	      },
	      // 23.3.3.4 WeakMap.prototype.has(key)
	      // 23.4.3.4 WeakSet.prototype.has(value)
	      has: function has(key){
	        if(!isObject(key))return false;
	        if(!isExtensible(key))return frozenStore(this).has(key);
	        return $has(key, WEAK) && $has(key[WEAK], this._i);
	      }
	    });
	    return C;
	  },
	  def: function(that, key, value){
	    if(!isExtensible(anObject(key))){
	      frozenStore(that).set(key, value);
	    } else {
	      $has(key, WEAK) || hide(key, WEAK, {});
	      key[WEAK][that._i] = value;
	    } return that;
	  },
	  frozenStore: frozenStore,
	  WEAK: WEAK
	};

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(27)
	  , ITERATOR   = __webpack_require__(14)('iterator')
	  , ArrayProto = Array.prototype;

	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(47);
	module.exports = Array.isArray || function(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(28);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $              = __webpack_require__(8)
	  , descriptor     = __webpack_require__(76)
	  , setToStringTag = __webpack_require__(51)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(21)(IteratorPrototype, __webpack_require__(14)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 129 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var core        = __webpack_require__(13)
	  , $           = __webpack_require__(8)
	  , DESCRIPTORS = __webpack_require__(36)
	  , SPECIES     = __webpack_require__(14)('species');

	module.exports = function(KEY){
	  var C = core[KEY];
	  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
	    configurable: true,
	    get: function(){ return this; }
	  });
	};

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(38)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(77)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(28)
	  , get      = __webpack_require__(79);
	module.exports = __webpack_require__(13).getIterator = function(it){
	  var iterFn = get(it);
	  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
	  return anObject(iterFn.call(it));
	};

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(119)
	  , step             = __webpack_require__(75)
	  , Iterators        = __webpack_require__(27)
	  , toIObject        = __webpack_require__(64);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(48)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strong = __webpack_require__(122);

	// 23.2 Set Objects
	__webpack_require__(73)('Set', function(get){
	  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.2.3.1 Set.prototype.add(value)
	  add: function add(value){
	    return strong.def(this, value = value === 0 ? 0 : value, value);
	  }
	}, strong);

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $            = __webpack_require__(8)
	  , redefine     = __webpack_require__(50)
	  , weak         = __webpack_require__(124)
	  , isObject     = __webpack_require__(17)
	  , has          = __webpack_require__(26)
	  , frozenStore  = weak.frozenStore
	  , WEAK         = weak.WEAK
	  , isExtensible = Object.isExtensible || isObject
	  , tmp          = {};

	// 23.3 WeakMap Objects
	var $WeakMap = __webpack_require__(73)('WeakMap', function(get){
	  return function WeakMap(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
	}, {
	  // 23.3.3.3 WeakMap.prototype.get(key)
	  get: function get(key){
	    if(isObject(key)){
	      if(!isExtensible(key))return frozenStore(this).get(key);
	      if(has(key, WEAK))return key[WEAK][this._i];
	    }
	  },
	  // 23.3.3.5 WeakMap.prototype.set(key, value)
	  set: function set(key, value){
	    return weak.def(this, key, value);
	  }
	}, weak, true, true);

	// IE11 WeakMap frozen keys fix
	if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
	  $.each.call(['delete', 'has', 'get', 'set'], function(key){
	    var proto  = $WeakMap.prototype
	      , method = proto[key];
	    redefine(proto, key, function(a, b){
	      // store frozen objects on leaky map
	      if(isObject(a) && !isExtensible(a)){
	        var result = frozenStore(this)[key](a, b);
	        return key == 'set' ? this : result;
	      // store all the rest on native weakmap
	      } return method.call(this, a, b);
	    });
	  });
	}

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	// https://github.com/DavidBruant/Map-Set.prototype.toJSON
	var $export  = __webpack_require__(25);

	$export($export.P, 'Set', {toJSON: __webpack_require__(123)('Set')});

/***/ },
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_171__;

/***/ },
/* 172 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_172__;

/***/ },
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_258__;

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Object$create = __webpack_require__(85)['default'];

	var THREE = __webpack_require__(172);

	/**
	 * Based on http://www.emagix.net/academic/mscs-project/item/camera-sync-with-css3-and-webgl-threejs
	 * @author mrdoob / http://mrdoob.com/
	 */

	THREE.CSS3DObject = function (element) {

		THREE.Object3D.call(this);

		this.element = element;
		this.element.style.position = 'absolute';

		this.addEventListener('removed', function (event) {

			if (this.element.parentNode !== null) {

				this.element.parentNode.removeChild(this.element);
			}
		});
	};

	THREE.CSS3DObject.prototype = _Object$create(THREE.Object3D.prototype);

	THREE.CSS3DSprite = function (element) {

		THREE.CSS3DObject.call(this, element);
	};

	THREE.CSS3DSprite.prototype = _Object$create(THREE.CSS3DObject.prototype);

	//

	THREE.CSS3DRenderer = function () {

		console.log('THREE.CSS3DRenderer', THREE.REVISION);

		var _width, _height;
		var _widthHalf, _heightHalf;

		var matrix = new THREE.Matrix4();

		var cache = {
			camera: { fov: 0, style: '' },
			objects: {}
		};

		var domElement = document.createElement('div');
		domElement.style.overflow = 'hidden';

		domElement.style.WebkitTransformStyle = 'preserve-3d';
		domElement.style.MozTransformStyle = 'preserve-3d';
		domElement.style.oTransformStyle = 'preserve-3d';
		domElement.style.transformStyle = 'preserve-3d';

		this.domElement = domElement;

		var cameraElement = document.createElement('div');

		cameraElement.style.WebkitTransformStyle = 'preserve-3d';
		cameraElement.style.MozTransformStyle = 'preserve-3d';
		cameraElement.style.oTransformStyle = 'preserve-3d';
		cameraElement.style.transformStyle = 'preserve-3d';

		domElement.appendChild(cameraElement);

		this.setClearColor = function () {};

		this.setSize = function (width, height) {

			_width = width;
			_height = height;

			_widthHalf = _width / 2;
			_heightHalf = _height / 2;

			domElement.style.width = width + 'px';
			domElement.style.height = height + 'px';

			cameraElement.style.width = width + 'px';
			cameraElement.style.height = height + 'px';
		};

		var epsilon = function epsilon(value) {

			return Math.abs(value) < 0.000001 ? 0 : value;
		};

		var getCameraCSSMatrix = function getCameraCSSMatrix(m) {

			if (matrix != m) matrix.copy(m);
			matrix.multiplyScalar(100);
			var elements = matrix.elements;

			return 'matrix3d(' + epsilon(elements[0]) + ',' + epsilon(-elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(elements[6]) + ',' + epsilon(elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(-elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(-elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
		};

		var getObjectCSSMatrix = function getObjectCSSMatrix(m) {

			if (matrix != m) matrix.copy(m);
			matrix.multiplyScalar(100);
			var elements = matrix.elements;

			return 'translate3d(-50%,-50%,0) matrix3d(' + epsilon(elements[0]) + ',' + epsilon(elements[1]) + ',' + epsilon(elements[2]) + ',' + epsilon(elements[3]) + ',' + epsilon(-elements[4]) + ',' + epsilon(-elements[5]) + ',' + epsilon(-elements[6]) + ',' + epsilon(-elements[7]) + ',' + epsilon(elements[8]) + ',' + epsilon(elements[9]) + ',' + epsilon(elements[10]) + ',' + epsilon(elements[11]) + ',' + epsilon(elements[12]) + ',' + epsilon(elements[13]) + ',' + epsilon(elements[14]) + ',' + epsilon(elements[15]) + ')';
		};

		var renderObject = function renderObject(object, camera) {

			if (object instanceof THREE.CSS3DObject) {

				var style;

				if (object instanceof THREE.CSS3DSprite) {

					// http://swiftcoder.wordpress.com/2008/11/25/constructing-a-billboard-matrix/

					matrix.copy(camera.matrixWorldInverse);
					matrix.transpose();
					matrix.copyPosition(object.matrixWorld);
					matrix.scale(object.scale);

					matrix.elements[3] = 0;
					matrix.elements[7] = 0;
					matrix.elements[11] = 0;
					matrix.elements[15] = 1;

					style = getObjectCSSMatrix(matrix);
				} else {

					style = getObjectCSSMatrix(object.matrixWorld);
				}

				var element = object.element;
				var cachedStyle = cache.objects[object.id];

				if (cachedStyle === undefined || cachedStyle !== style) {

					element.style.WebkitTransform = style;
					element.style.MozTransform = style;
					element.style.oTransform = style;
					element.style.transform = style;

					cache.objects[object.id] = style;
				}

				if (element.parentNode !== cameraElement) {

					cameraElement.appendChild(element);
				}
			}

			for (var i = 0, l = object.children.length; i < l; i++) {

				renderObject(object.children[i], camera);
			}
		};

		this.render = function (scene, camera) {

			var fov = 0.5 / Math.tan(THREE.Math.degToRad(camera.fov * 0.5)) * _height;

			if (cache.camera.fov !== fov) {

				domElement.style.WebkitPerspective = fov + "px";
				domElement.style.MozPerspective = fov + "px";
				domElement.style.oPerspective = fov + "px";
				domElement.style.perspective = fov + "px";

				cache.camera.fov = fov;
			}

			scene.updateMatrixWorld();

			if (camera.parent === undefined) camera.updateMatrixWorld();

			camera.matrixWorldInverse.getInverse(camera.matrixWorld);

			var style = "translate3d(0,0," + fov + "px)" + getCameraCSSMatrix(camera.matrixWorldInverse) + " translate3d(" + _widthHalf + "px," + _heightHalf + "px, 0)";

			if (cache.camera.style !== style) {

				cameraElement.style.WebkitTransform = style;
				cameraElement.style.MozTransform = style;
				cameraElement.style.oTransform = style;
				cameraElement.style.transform = style;

				cache.camera.style = style;
			}

			renderObject(scene, camera);
		};
	};

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Georgia Tech Research Corporation
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//    http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	//
	// This software was created as part of a research project at the
	// Augmented Environments Lab at Georgia Tech.  To support our research, we
	// request that if you make use of this software, you let us know how
	// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
	//

	'use strict';

	var THREE = __webpack_require__(172);

	/**
	 * Allows a stack of renderers to be treated as a single renderer.
	 * @author Gheric Speiginer
	 */

	THREE.MultiRenderer = function (parameters) {

	  console.log('THREE.MultiRenderer', THREE.REVISION);

	  this.domElement = document.createElement('div');
	  this.domElement.style.position = 'relative';

	  this.renderers = [];
	  this._renderSizeSet = false;

	  var rendererClasses = parameters.renderers || [];
	  var rendererParameters = parameters.parameters || [];

	  // elements are stacked back-to-front
	  for (var i = 0; i < rendererClasses.length; i++) {
	    var renderer = new rendererClasses[i](rendererParameters[i]);
	    renderer.domElement.style.position = 'absolute';
	    renderer.domElement.style.top = '0px';
	    renderer.domElement.style.left = '0px';
	    this.domElement.appendChild(renderer.domElement);
	    this.renderers.push(renderer);
	  }
	};

	THREE.MultiRenderer.prototype.setSize = function (w, h) {

	  this.domElement.style.width = w + 'px';
	  this.domElement.style.height = h + 'px';

	  for (var i = 0; i < this.renderers.length; i++) {
	    var renderer = this.renderers[i];
	    var el = renderer.domElement;

	    if (!this._renderSizeSet || el && el.tagName !== 'CANVAS') {
	      renderer.setSize(w, h);
	    }

	    el.style.width = w + 'px';
	    el.style.height = h + 'px';
	  }
	};

	THREE.MultiRenderer.prototype.setRenderSize = function (rw, rh) {

	  this._renderSizeSet = true;

	  for (var i = 0; i < this.renderers.length; i++) {
	    var renderer = this.renderers[i];
	    var el = renderer.domElement;

	    if (el && el.tagName === 'CANVAS') {
	      renderer.setSize(rw, rh, false);
	    }
	  }
	};

	THREE.MultiRenderer.prototype.render = function (scene, camera) {

	  for (var i = 0; i < this.renderers.length; i++) {
	    this.renderers[i].render(scene, camera);
	  }
	};

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright 2015 Georgia Tech Research Corporation
	//
	// Licensed under the Apache License, Version 2.0 (the "License");
	// you may not use this file except in compliance with the License.
	// You may obtain a copy of the License at
	//
	//    http://www.apache.org/licenses/LICENSE-2.0
	//
	// Unless required by applicable law or agreed to in writing, software
	// distributed under the License is distributed on an "AS IS" BASIS,
	// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	// See the License for the specific language governing permissions and
	// limitations under the License.
	//
	// This software was created as part of a research project at the
	// Augmented Environments Lab at Georgia Tech.  To support our research, we
	// request that if you make use of this software, you let us know how
	// you used it by sending mail to Blair MacIntyre (blair@cc.gatech.edu).
	//

	'use strict';

	var _Set = __webpack_require__(114)['default'];

	var _WeakMap = __webpack_require__(63)['default'];

	var _getIterator = __webpack_require__(84)['default'];

	var Argon = __webpack_require__(171);
	var THREE = __webpack_require__(172);
	THREE.Bootstrap = __webpack_require__(258);

	var Cesium = Argon.Cesium;
	var Matrix3 = Cesium.Matrix3;
	var Matrix4 = Cesium.Matrix4;
	var Quaternion = Cesium.Quaternion;
	var Cartesian3 = Cesium.Cartesian3;
	var Util = Argon.Util;

	var _v = new THREE.Vector3();
	var _q = new THREE.Quaternion();
	var _q2 = new THREE.Quaternion();
	var _mat = new THREE.Matrix4();
	var _mat2 = new THREE.Matrix4();
	var _matrixScratch = new Matrix4();

	var x90 = Quaternion.fromAxisAngle(Cartesian3.UNIT_X, Math.PI / 2);
	var x90Rotation = Matrix3.fromQuaternion(x90);
	var x90Transform = Matrix4.fromRotationTranslation(x90Rotation, Cartesian3.ZERO);

	var scratchMatrix4 = Matrix4.clone(Matrix4.IDENTITY);
	var scratch2Matrix4 = Matrix4.clone(Matrix4.IDENTITY);
	var scratchQuaternion = Quaternion.clone(Quaternion.IDENTITY);
	var scratchCartesian3 = Cartesian3.clone(Cartesian3.ZERO);

	function setPose(object, position, orientation) {
	  if (!object.parent || object.parent.type === 'Scene') {
	    object.position.copy(position);
	    object.quaternion.copy(orientation);
	    object.updateMatrix();
	  } else {
	    var localPosition = object.parent.worldToLocal(_v.copy(position));
	    var parentWorldQuaternion = object.parent.getWorldQuaternion(_q);
	    var inverseParentWorldQuaternion = parentWorldQuaternion.conjugate();
	    var localQuaternion = inverseParentWorldQuaternion.multiply(_q2.copy(orientation));
	    object.position.copy(localPosition);
	    object.quaternion.copy(localQuaternion);
	    object.updateMatrix();
	  }
	  // need to update the matrixWorld in case the programmer wants to look at the world coordinates of objects
	  // attached to entities
	  object.updateMatrixWorld();
	}

	THREE.Bootstrap.registerPlugin('argon', {

	  defaults: {
	    start: true,
	    context: Argon.immersiveContext
	  },

	  listen: ['ready'],

	  install: function install(three) {

	    var argonContext = this.options.context;

	    var objects = new _Set();
	    var entityMap = new _WeakMap();

	    function _updateEntityFromObject(object, entity) {
	      var pos = object.getWorldPosition();
	      var objectPos = new Cesium.Cartesian3(pos.x, pos.y, pos.z);

	      entity.position.setValue(objectPos, argonContext.localOriginEastUpSouth);
	      entity.orientation.setValue(Cesium.Quaternion.clone(object.quaternion));

	      // use the last saved argon update time
	      var time = three.argon.time;

	      if (entity.isAvailable(time)) {
	        var cartesian = Util.getEntityPositionInReferenceFrame(entity, time, argonContext.eye.position.referenceFrame, scratchCartesian3);
	        if (cartesian) {
	          var quaternion = Util.getEntityOrientationInReferenceFrame(entity, time, argonContext.eye.position.referenceFrame, scratchQuaternion);

	          if (cartesian && quaternion) {
	            Quaternion.multiply(x90, quaternion, quaternion);
	            entity.position.setValue(cartesian, argonContext.eye.position.referenceFrame);
	            entity.orientation.setValue(quaternion);
	          }
	        }
	      }
	    }

	    function updateObjectFromEntity(object, entity, time) {
	      var position = undefined,
	          orientation = undefined;
	      if (entity.isAvailable(time)) {
	        position = Util.getEntityPositionInReferenceFrame(entity, time, argonContext.localOriginEastUpSouth, scratchCartesian3);
	        if (position) {
	          orientation = Util.getEntityOrientationInReferenceFrame(entity, time, argonContext.localOriginEastUpSouth, scratchQuaternion);
	        }
	      }

	      if (position && orientation) {
	        // rotate the transform so that Y means "local up"
	        Quaternion.multiply(orientation, x90, orientation);
	        setPose(object, position, orientation);
	        if (!object.__argonFound) {
	          object.__argonFound = true;
	          object.dispatchEvent({ type: 'argon:found' });
	        }
	      } else {
	        if (object.__argonFound) {
	          object.__argonFound = false;
	          object.dispatchEvent({ type: 'argon:lost' });
	        }
	      }
	    }

	    three.argon = {
	      time: Cesium.JulianDate.now, // we are going to save the time passed to update
	      deltaTime: 0, // time since last update

	      objectFromEntity: function objectFromEntity(entity, klass) {
	        if (!entity) throw new Error('entity is required');
	        if (!klass) klass = THREE.Object3D;
	        var object3D = new klass();
	        object3D.matrixAutoUpdate = false;
	        object3D.name = entity.name;
	        three.scene.add(object3D);

	        objects.add(object3D);
	        entityMap.set(object3D, entity);

	        // set the objects initial pose, just it case the programer wants to use it
	        updateObjectFromEntity(object3D, entity, three.argon.time);
	        return object3D;
	      },
	      entityFromObject: function entityFromObject(object) {
	        var context = argonContext;
	        var entity = entityMap.get(object);
	        if (entity) {
	          return entity;
	        }
	        // create a new one
	        entity = new Cesium.Entity({
	          name: object.name || object.uuid,
	          position: new Cesium.ConstantPositionProperty(),
	          orientation: new Cesium.ConstantProperty()
	        });

	        _updateEntityFromObject(object, entity);

	        objects.add(object);
	        entityMap.set(object, entity);
	        return entity;
	      },
	      updateEntityFromObject: function updateEntityFromObject(object) {
	        var entity = entityMap.get(object);
	        if (entity) {
	          _updateEntityFromObject(object, entity);
	        }
	      },
	      createObjectFromCartographicDegrees: function createObjectFromCartographicDegrees(name, lla, klass) {
	        var entity = new Cesium.Entity({
	          name: name,
	          position: Cesium.Cartesian3.fromDegrees(lla[0], lla[1], lla[2])
	        });
	        return three.argon.objectFromEntity(entity, klass);
	      },
	      createObjectFromCartesian: function createObjectFromCartesian(name, cart, klass) {
	        var entity = new Cesium.Entity({
	          name: name,
	          position: cart
	        });
	        return three.argon.objectFromEntity(entity, klass);
	      },
	      getCartographicDegreesFromEntity: function getCartographicDegreesFromEntity(entity) {
	        if (entity.isAvailable(three.argon.time)) {
	          var position = entity.position.getValue(three.argon.time);
	          if (position) {
	            var pos = Cesium.Ellipsoid.WGS84.cartesianToCartographic(position);
	            if (pos) {
	              return [Cesium.Math.toDegrees(pos.longitude), Cesium.Math.toDegrees(pos.latitude), pos.height];
	            }
	          }
	        }
	        return undefined;
	      },
	      getEntity: function getEntity(object) {
	        return entityMap.get(object);
	      }
	    };

	    var trigger = three.trigger.bind(three);
	    var newReality = undefined;
	    var newOrigin = false;

	    argonContext.on('originChange', function () {
	      newOrigin = true;
	    });

	    argonContext.on('realityChange', function (state) {
	      newReality = state;
	    });

	    argonContext.on('update', function (state) {
	      var time = state.time;
	      var origin = argonContext.localOriginEastUpSouth;
	      var eye = argonContext.eye;
	      var frustum = argonContext.frustum;

	      // save a copy of argon time and compute delta time
	      three.argon.deltaTime = Cesium.JulianDate.secondsDifference(time, three.argon.time);
	      three.argon.time = state.time;

	      var eyePosition = Util.getEntityPositionInReferenceFrame(eye, time, origin, scratchCartesian3);
	      var eyeOrientation = Util.getEntityOrientationInReferenceFrame(eye, time, origin, scratchQuaternion);
	      setPose(three.camera, eyePosition, eyeOrientation);

	      three.camera.fov = frustum.fovy * 180 / Math.PI;
	      three.camera.aspect = frustum.aspectRatio;
	      // three.camera.updateProjectionMatrix()
	      three.camera.projectionMatrix.fromArray(frustum.infiniteProjectionMatrix);

	      // update all the objects
	      // BUG: at some point, we may want to optimize this, but checking if the Entity values have changed
	      // since the last time we updated the object.  For now, we'll just be safe and inefficient
	      for (var _iterator = objects, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _getIterator(_iterator);;) {
	        var _ref;

	        if (_isArray) {
	          if (_i >= _iterator.length) break;
	          _ref = _iterator[_i++];
	        } else {
	          _i = _iterator.next();
	          if (_i.done) break;
	          _ref = _i.value;
	        }

	        var o = _ref;

	        var e = entityMap.get(o);
	        updateObjectFromEntity(o, e, time);
	      }

	      // trigger the various threestrap events, plus any addition argon events
	      three.trigger({ type: 'pre' });

	      if (newOrigin) {
	        newOrigin = false;
	        three.trigger({ type: 'argon:originChange' });
	      }
	      if (newReality) {
	        three.trigger({ type: 'argon:realityChange', reality: newReality.reality, previousReality: newReality.previousReality });
	        newReality = undefined;
	      }
	      three.trigger({ type: 'update', argonState: state });
	      three.trigger({ type: 'render' });
	      three.trigger({ type: 'post' });
	    });
	  },

	  uninstall: function uninstall(three) {},

	  ready: function ready(event, three) {
	    three.camera.near = 0.5;
	    three.camera.far = 1e10;
	    three.camera.updateProjectionMatrix();
	    three.scene.add(three.camera);
	  }

	});

/***/ }
/******/ ])
});
;