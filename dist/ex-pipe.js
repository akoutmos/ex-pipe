(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["exPipe"] = factory();
	else
		root["exPipe"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }
	
	exports.ExecPipe = ExecPipe;
	exports.GenPipe = GenPipe;
	
	/**
	 *
	 * Pipe is a simple utility that attempts to mimic the
	 * pipe '|>' functionality found in Elixir, but in JS
	 *
	 */
	
	function ExecPipe(initialInput) {
	    var input = initialInput;
	    var output = initialInput;
	
	    for (var _len = arguments.length, nextFunctions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        nextFunctions[_key - 1] = arguments[_key];
	    }
	
	    while (nextFunctions.length) {
	        var nextPipe = nextFunctions.shift
	
	        // Deal with the next element in the pipeline
	        ();if (typeof nextPipe === 'function') {
	            output = nextPipe(input);
	        } else if (Array.isArray(nextPipe)) {
	            var _nextPipe = _toArray(nextPipe),
	                func = _nextPipe[0],
	                args = _nextPipe.slice(1);
	
	            output = func.apply(undefined, [input].concat(_toConsumableArray(args)));
	        }
	
	        input = output;
	    }
	
	    return output;
	}
	
	/**
	 *
	 * This is used to create a reusable pipeline of
	 * functions
	 *
	 */
	function GenPipe() {
	    for (var _len2 = arguments.length, functions = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        functions[_key2] = arguments[_key2];
	    }
	
	    return function (initialInput) {
	        return ExecPipe.apply(undefined, [initialInput].concat(functions));
	    };
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=ex-pipe.js.map