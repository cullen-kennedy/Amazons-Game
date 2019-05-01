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

/***/ "./src/class/board.js":
/*!****************************!*\
  !*** ./src/class/board.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return board; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * This class takes care of the visual board\r\n */\nvar board =\n/*#__PURE__*/\nfunction () {\n  function board(room) {\n    _classCallCheck(this, board);\n\n    this.room = room;\n    this.stageProps = {\n      size: 500,\n      num_rows: 5,\n      num_cols: 5,\n      block_size: 500 / 5\n    };\n  }\n\n  _createClass(board, [{\n    key: \"displayBoard\",\n    value: function displayBoard(ctx) {\n      for (var r = 0; r < this.stageProps.num_rows; r++) {\n        for (var b = 0; b < this.stageProps.num_rows; b++) {\n          ctx.strokeRect(r * this.stageProps.block_size, b * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n        }\n      }\n    }\n  }, {\n    key: \"default\",\n    value: function _default(ctx, player) {\n      ctx.fillStyle = player.colour;\n      ctx.fillRect(player.piece.col * this.stageProps.block_size, player.piece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"oppDefault\",\n    value: function oppDefault(ctx, player) {\n      ctx.fillStyle = player.oppcolour;\n      ctx.fillRect(player.oppPiece.col * this.stageProps.block_size, player.oppPiece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"moveStart\",\n    value: function moveStart(ctx, player) {\n      ctx.fillStyle = 'green';\n      ctx.fillRect(player.piece.col * this.stageProps.block_size, player.piece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"moveEnd\",\n    value: function moveEnd(ctx, player) {\n      ctx.fillStyle = player.colour;\n      ctx.fillRect(player.piece.col * this.stageProps.block_size, player.piece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"shoot\",\n    value: function shoot(ctx, x, y) {\n      ctx.fillStyle = 'black';\n      ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"oppMove\",\n    value: function oppMove(ctx, player) {\n      ctx.fillStyle = player.oppcolour;\n      ctx.fillRect(player.oppPiece.col * this.stageProps.block_size, player.oppPiece.row * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }, {\n    key: \"oppShoot\",\n    value: function oppShoot(ctx, x, y) {\n      ctx.fillStyle = 'black';\n      ctx.fillRect(x * this.stageProps.block_size, y * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n    }\n  }]);\n\n  return board;\n}();\n\n\n\n//# sourceURL=webpack:///./src/class/board.js?");

/***/ }),

/***/ "./src/class/game.js":
/*!***************************!*\
  !*** ./src/class/game.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return game; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * This class takes care of the games logic\r\n */\nvar game = function game(roomId) {\n  _classCallCheck(this, game);\n\n  this.roomID = roomId; //Obviously need a better way of doing this for bigger boards\n  //0 for empty, 1 for piece, 2 for arrow\n\n  this.board = {\n    \"tile\": [{\n      \"row\": 0,\n      \"col\": 0,\n      \"status\": 1\n    }, {\n      \"row\": 0,\n      \"col\": 1,\n      \"status\": 0\n    }, {\n      \"row\": 0,\n      \"col\": 2,\n      \"status\": 0\n    }, {\n      \"row\": 0,\n      \"col\": 3,\n      \"status\": 0\n    }, {\n      \"row\": 0,\n      \"col\": 4,\n      \"status\": 0\n    }, {\n      \"row\": 1,\n      \"col\": 0,\n      \"status\": 0\n    }, {\n      \"row\": 1,\n      \"col\": 1,\n      \"status\": 0\n    }, {\n      \"row\": 1,\n      \"col\": 2,\n      \"status\": 0\n    }, {\n      \"row\": 1,\n      \"col\": 3,\n      \"status\": 0\n    }, {\n      \"row\": 1,\n      \"col\": 4,\n      \"status\": 0\n    }, {\n      \"row\": 2,\n      \"col\": 0,\n      \"status\": 0\n    }, {\n      \"row\": 2,\n      \"col\": 1,\n      \"status\": 0\n    }, {\n      \"row\": 2,\n      \"col\": 2,\n      \"status\": 0\n    }, {\n      \"row\": 2,\n      \"col\": 3,\n      \"status\": 0\n    }, {\n      \"row\": 2,\n      \"col\": 4,\n      \"status\": 0\n    }, {\n      \"row\": 3,\n      \"col\": 0,\n      \"status\": 0\n    }, {\n      \"row\": 3,\n      \"col\": 1,\n      \"status\": 0\n    }, {\n      \"row\": 3,\n      \"col\": 2,\n      \"status\": 0\n    }, {\n      \"row\": 3,\n      \"col\": 3,\n      \"status\": 0\n    }, {\n      \"row\": 3,\n      \"col\": 4,\n      \"status\": 0\n    }, {\n      \"row\": 4,\n      \"col\": 0,\n      \"status\": 0\n    }, {\n      \"row\": 4,\n      \"col\": 1,\n      \"status\": 0\n    }, {\n      \"row\": 4,\n      \"col\": 2,\n      \"status\": 0\n    }, {\n      \"row\": 4,\n      \"col\": 3,\n      \"status\": 0\n    }, {\n      \"row\": 4,\n      \"col\": 4,\n      \"status\": 1\n    }]\n  };\n  this.moves = 0;\n};\n\n\n\n//# sourceURL=webpack:///./src/class/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return player; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\r\n * This class is mostly for player identifying variables for now\r\n */\nvar player = function player(name, startx, starty, opy, opx, colour, oppcolour, turn) {\n  _classCallCheck(this, player);\n\n  this.myTurnStart = turn;\n  this.myTurnEnd = false;\n  this.myShoot = false;\n  this.colour = colour;\n  this.oppcolour = oppcolour;\n  this.name = name;\n  this.stageProps = {\n    size: 500,\n    num_rows: 5,\n    num_cols: 5,\n    block_size: 500 / 5\n  };\n  this.arrow;\n  this.piece = {\n    \"row\": starty,\n    \"col\": startx\n  };\n  this.oppPiece = {\n    \"row\": opy,\n    \"col\": opx\n  };\n};\n\n\n\n//# sourceURL=webpack:///./src/class/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _class_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/player */ \"./src/class/player.js\");\n/* harmony import */ var _class_myCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/myCanvas */ \"./src/class/myCanvas.js\");\n/* harmony import */ var _class_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class/game */ \"./src/class/game.js\");\n/* harmony import */ var _class_board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./class/board */ \"./src/class/board.js\");\n\n\n\n\nvar socket = io.connect('http://localhost:5000');\nvar canvas = new _class_myCanvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar player, game, board, controller;\n/***************************************************************************************\r\n * Player 1 functions\r\n */\n//New game\n\n$('#new').on('click', function () {\n  var name = $('#nameNew').val();\n  socket.emit('createGame', {\n    name: name\n  }); //server.js on.createGame\n\n  player = new _class_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, 0, 0, 4, 4, 'blue', 'red', true); //first player with name and initial starting point\n}); //Called by server.js with on.createGame\n//It passes back the name of the player and the room name that was created\n\nsocket.on('newGame', function (data) {\n  game = new _class_game__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.room);\n  board = new _class_board__WEBPACK_IMPORTED_MODULE_3__[\"default\"](data.room);\n  board.displayBoard(canvas.ctx);\n  document.getElementById(\"message\").innerHTML = data.room + ' ' + player.name + ' ' + player.myTurnStart;\n}); //Called by server.js, broadcast to player 1 by player 2\n//sends player 1 the room name and a name\n//CHECK WHAT NAME IS SENT BACK?\n\nsocket.on('player1', function (data) {\n  var message = 'Hello, player1';\n  board[\"default\"](canvas.ctx, player); //Sends back to server.js player1s initial position, which is broadcasted to player 2   \n\n  socket.emit('default', {\n    row: player.piece.row,\n    col: player.piece.col,\n    room: data.room\n  });\n  canvas.canvas.addEventListener('click', function (e) {\n    processClick(e.clientX, e.clientY);\n  });\n});\n/****************************************************************************************\r\n * Player 2 functions\r\n */\n//Join created game\n\n$('#join').on('click', function () {\n  var name = $('#nameJoin').val();\n  var roomID = $('#room').val();\n  socket.emit('joinGame', {\n    name: name,\n    room: roomID\n  }); //server.js on.joinGame \n\n  player = new _class_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, 4, 4, 0, 0, 'red', 'blue', false); //second player with name and initial starting point\n}); //Displays board and does the same as on.'player1'\n\nsocket.on('player2', function (data) {\n  var message = 'Hello, player2';\n  game = new _class_game__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.room);\n  board = new _class_board__WEBPACK_IMPORTED_MODULE_3__[\"default\"](data.room);\n  document.getElementById(\"message\").innerHTML = data.room;\n  board.displayBoard(canvas.ctx);\n  board[\"default\"](canvas.ctx, player);\n  socket.emit('default', {\n    row: player.piece.row,\n    col: player.piece.col,\n    room: data.room\n  });\n  canvas.canvas.addEventListener('click', function (e) {\n    processClick(e.clientX, e.clientY);\n  });\n});\n/***********************************************************************************\r\n * General functions\r\n */\n//fill of opponents space on setup\n\nsocket.on('oppDefault', function (data) {\n  player.oppPiece.row = data.row;\n  player.oppPiece.col = data.col;\n  board.oppDefault(canvas.ctx, player);\n}); //Update opponents move\n\nsocket.on('oppMove', function (data) {\n  //Replace these next two lines with a function\n  canvas.ctx.fillStyle = 'white';\n  canvas.ctx.fillRect(player.oppPiece.col * 100, player.oppPiece.row * 100, 100, 100);\n  player.oppPiece.row = data.row;\n  player.oppPiece.col = data.col;\n  board.oppMove(canvas.ctx, player);\n}); //Update opponents arrow\n\nsocket.on('oppShoot', function (data) {\n  board.oppShoot(canvas.ctx, data.col, data.row);\n  player.myTurnStart = true;\n}); //The event listener is always listening, but the action that is takes depends on player variables\n\nfunction processClick(x, y) {\n  if (player.myTurnStart == true) {\n    var xcoord = ~~((x - canvas.canvas.offsetLeft) / 100);\n    var ycoord = ~~((y - canvas.canvas.offsetTop) / 100);\n    processMoveStart(xcoord, ycoord);\n    player.myTurnStart = false;\n    player.myTurnEnd = true;\n  } else if (player.myTurnEnd == true) {\n    var _xcoord = ~~((x - canvas.canvas.offsetLeft) / 100);\n\n    var _ycoord = ~~((y - canvas.canvas.offsetTop) / 100);\n\n    processMoveEnd(_xcoord, _ycoord);\n    socket.emit('playersMove', {\n      row: player.piece.row,\n      col: player.piece.col,\n      room: game.roomID\n    });\n    player.myTurnEnd = false;\n    player.myShoot = true;\n  } else if (player.myShoot == true) {\n    var _xcoord2 = ~~((x - canvas.canvas.offsetLeft) / 100);\n\n    var _ycoord2 = ~~((y - canvas.canvas.offsetTop) / 100);\n\n    processShoot(_xcoord2, _ycoord2);\n    console.log('emit');\n    console.log(game.room);\n    socket.emit('playersShoot', {\n      row: _ycoord2,\n      col: _xcoord2,\n      room: game.roomID\n    });\n    player.myShoot = false;\n  } else {\n    console.log(\"not your turn\");\n  }\n\n  function processMoveStart(x, y) {\n    if (player.piece.row == y && player.piece.col == x) {\n      board.moveStart(canvas.ctx, player);\n    }\n  }\n\n  function processMoveEnd(x, y) {\n    //check if space is available\n    //Replace these next two lines with a function\n    canvas.ctx.fillStyle = 'white';\n    canvas.ctx.fillRect(player.piece.col * 100, player.piece.row * 100, 100, 100);\n    player.piece.row = y;\n    player.piece.col = x;\n    board.moveEnd(canvas.ctx, player);\n  }\n\n  function processShoot(x, y) {\n    board.shoot(canvas.ctx, x, y);\n  }\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });