/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/class/game.js":
/*!***************************!*\
  !*** ./src/class/game.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return game; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar game =\n/*#__PURE__*/\nfunction () {\n  function game(roomId) {\n    _classCallCheck(this, game);\n\n    this.roomID = roomId;\n    this.stageProps = {\n      size: 500,\n      num_rows: 5,\n      num_cols: 5,\n      block_size: 500 / 5\n    }; //Obviously need a better way of doing this for bigger boards\n\n    this.board = {\n      \"tile\": [{\n        \"row\": 0,\n        \"col\": 0,\n        \"status\": 0\n      }, {\n        \"row\": 0,\n        \"col\": 1,\n        \"status\": 0\n      }, {\n        \"row\": 0,\n        \"col\": 2,\n        \"status\": 0\n      }, {\n        \"row\": 0,\n        \"col\": 3,\n        \"status\": 0\n      }, {\n        \"row\": 0,\n        \"col\": 4,\n        \"status\": 0\n      }, {\n        \"row\": 1,\n        \"col\": 0,\n        \"status\": 0\n      }, {\n        \"row\": 1,\n        \"col\": 1,\n        \"status\": 0\n      }, {\n        \"row\": 1,\n        \"col\": 2,\n        \"status\": 0\n      }, {\n        \"row\": 1,\n        \"col\": 3,\n        \"status\": 0\n      }, {\n        \"row\": 1,\n        \"col\": 4,\n        \"status\": 0\n      }, {\n        \"row\": 2,\n        \"col\": 0,\n        \"status\": 0\n      }, {\n        \"row\": 2,\n        \"col\": 1,\n        \"status\": 0\n      }, {\n        \"row\": 2,\n        \"col\": 2,\n        \"status\": 0\n      }, {\n        \"row\": 2,\n        \"col\": 3,\n        \"status\": 0\n      }, {\n        \"row\": 2,\n        \"col\": 4,\n        \"status\": 0\n      }, {\n        \"row\": 3,\n        \"col\": 0,\n        \"status\": 0\n      }, {\n        \"row\": 3,\n        \"col\": 1,\n        \"status\": 0\n      }, {\n        \"row\": 3,\n        \"col\": 2,\n        \"status\": 0\n      }, {\n        \"row\": 3,\n        \"col\": 3,\n        \"status\": 0\n      }, {\n        \"row\": 3,\n        \"col\": 4,\n        \"status\": 0\n      }, {\n        \"row\": 4,\n        \"col\": 0,\n        \"status\": 0\n      }, {\n        \"row\": 4,\n        \"col\": 1,\n        \"status\": 0\n      }, {\n        \"row\": 4,\n        \"col\": 2,\n        \"status\": 0\n      }, {\n        \"row\": 4,\n        \"col\": 3,\n        \"status\": 0\n      }, {\n        \"row\": 4,\n        \"col\": 4,\n        \"status\": 0\n      }]\n    };\n    this.moves = 0;\n  }\n\n  _createClass(game, [{\n    key: \"displayBoard\",\n    value: function displayBoard(ctx) {\n      for (var r = 0; r < this.stageProps.num_rows; r++) {\n        for (var b = 0; b < this.stageProps.num_rows; b++) {\n          ctx.strokeRect(r * this.stageProps.block_size, b * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n        }\n      }\n    }\n  }]);\n\n  return game;\n}();\n\n\n\n//# sourceURL=webpack:///./src/class/game.js?");

/***/ }),

/***/ "./src/class/myCanvas.js":
/*!*******************************!*\
  !*** ./src/class/myCanvas.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return myCanvas; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar myCanvas = function myCanvas() {\n  _classCallCheck(this, myCanvas);\n\n  this.canvas = document.getElementById('canvas');\n  this.ctx = canvas.getContext('2d');\n  this.stageProps = {\n    size: 500,\n    num_rows: 5,\n    num_cols: 5,\n    block_size: 500 / 5\n  };\n  this.canvas.width = 500;\n  this.canvas.height = 500;\n};\n\n\n\n//# sourceURL=webpack:///./src/class/myCanvas.js?");

/***/ }),

/***/ "./src/class/player.js":
/*!*****************************!*\
  !*** ./src/class/player.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return player; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar player =\n/*#__PURE__*/\nfunction () {\n  function player(name, startx, starty, opy, opx) {\n    _classCallCheck(this, player);\n\n    this.name = name;\n    this.stageProps = {\n      size: 500,\n      num_rows: 5,\n      num_cols: 5,\n      block_size: 500 / 5\n    };\n    this.arrow;\n    this.piece = {\n      \"row\": starty,\n      \"col\": startx\n    };\n    this.oppPiece = {\n      \"row\": opy,\n      \"col\": opx\n    };\n  }\n\n  _createClass(player, [{\n    key: \"default\",\n    value: function _default(ctx) {\n      ctx.fillRect(this.piece.row * this.stageProps.block_size, this.piece.col * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"move\",\n    value: function move(ctx, gx, gy) {\n      this.piece.move(ctx, gx, gy);\n    }\n  }, {\n    key: \"shoot\",\n    value: function shoot(ctx, x, y) {\n      this.piece.move(ctx, 3, 4);\n    }\n  }, {\n    key: \"getPosition\",\n    value: function getPosition() {\n      return this.piece.getPiece();\n    }\n  }]);\n\n  return player;\n}();\n\n\n\n//# sourceURL=webpack:///./src/class/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _class_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/player */ \"./src/class/player.js\");\n/* harmony import */ var _class_myCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/myCanvas */ \"./src/class/myCanvas.js\");\n/* harmony import */ var _class_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class/game */ \"./src/class/game.js\");\n\n\n\nvar socket = io.connect('http://localhost:5000');\nvar canvas = new _class_myCanvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar player, game; //New game\n\n$('#new').on('click', function () {\n  var name = $('#nameNew').val();\n  socket.emit('createGame', {\n    name: name\n  }); //server.js on.createGame\n\n  player = new _class_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, 0, 0, 4, 4); //first player with name and initial starting point\n}); //Join created game\n\n$('#join').on('click', function () {\n  var name = $('#nameJoin').val();\n  var roomID = $('#room').val();\n  socket.emit('joinGame', {\n    name: name,\n    room: roomID\n  }); //server.js on.joinGame \n\n  player = new _class_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, 4, 4, 0, 0); //second player with name and initial starting point\n}); //Called by server.js with on.createGame\n//It passes back the name of the player and the room name that was created\n\nsocket.on('newGame', function (data) {\n  game = new _class_game__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.room);\n  game.displayBoard(canvas.ctx);\n  document.getElementById(\"message\").innerHTML = data.room;\n}); //Called by server.js, broadcast to player 1 by player 2\n//sends player 1 the room name and a name\n//CHECK WHAT NAME IS SENT BACK?\n\nsocket.on('player1', function (data) {\n  var message = 'Hello, player1';\n  player[\"default\"](canvas.ctx); //Sends back to server.js player1s initial position, which is broadcasted to player 2   \n\n  socket.emit('default', {\n    row: player.piece.row,\n    col: player.piece.col,\n    room: data.room\n  });\n}); //Displays board and does the same as on.'player1'\n\nsocket.on('player2', function (data) {\n  var message = 'Hello, player2';\n  game = new _class_game__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.room);\n  game.displayBoard(canvas.ctx);\n  document.getElementById(\"message\").innerHTML = data.room;\n  player[\"default\"](canvas.ctx);\n  socket.emit('default', {\n    row: player.piece.row,\n    col: player.piece.col,\n    room: data.room\n  });\n}); //Temporary fill of opponents space and setting op piece\n\nsocket.on('oppDefault', function (data) {\n  player.oppPiece.opy = data.row;\n  player.oppPiece.opx = data.col;\n  canvas.ctx.fillRect(data.row * 100, data.col * 100, 100, 100);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });