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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return board; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * This class takes care of the visual board\r\n * Notes: find better way to do padding\r\n */\nvar board =\n/*#__PURE__*/\nfunction () {\n  function board(ctx, room, player) {\n    _classCallCheck(this, board);\n\n    this.room = room;\n    this.player = player;\n    this.stageProps = {\n      size: 500,\n      num_rows: 10,\n      num_cols: 10,\n      block_size: 500 / 10\n    };\n    this.ctx = ctx;\n  }\n\n  _createClass(board, [{\n    key: \"displayBoard\",\n    value: function displayBoard() {\n      for (var r = 0; r < this.stageProps.num_rows; r++) {\n        for (var b = 0; b < this.stageProps.num_rows; b++) {\n          this.ctx.strokeRect(r * this.stageProps.block_size, b * this.stageProps.block_size, this.stageProps.block_size, this.stageProps.block_size);\n        }\n      }\n    }\n  }, {\n    key: \"default\",\n    value: function _default() {\n      var _this = this;\n\n      this.player.pieces.forEach(function (value) {\n        console.log('default');\n        console.log(_this.player.image);\n\n        _this.ctx.drawImage(_this.player.image, value.col * _this.stageProps.block_size + 5, value.row * _this.stageProps.block_size + 5, _this.stageProps.block_size - 10, _this.stageProps.block_size - 10);\n      });\n    }\n  }, {\n    key: \"oppDefault\",\n    value: function oppDefault() {\n      var _this2 = this;\n\n      this.player.oppPieces.forEach(function (value) {\n        console.log('oppDefault');\n\n        _this2.ctx.drawImage(_this2.player.oppImage, value.col * _this2.stageProps.block_size + 5, value.row * _this2.stageProps.block_size + 5, _this2.stageProps.block_size - 10, _this2.stageProps.block_size - 10);\n      });\n    }\n  }, {\n    key: \"moveStart\",\n    value: function moveStart() {\n      this.ctx.fillStyle = 'rgba(0,0,225,0.5)';\n      this.ctx.fillRect(this.player.selection.col * this.stageProps.block_size + 1, this.player.selection.row * this.stageProps.block_size + 1, this.stageProps.block_size - 2, this.stageProps.block_size - 2);\n    }\n  }, {\n    key: \"moveEnd\",\n    value: function moveEnd(x, y) {\n      this.ctx.drawImage(this.player.image, x * this.stageProps.block_size + 5, y * this.stageProps.block_size + 5, this.stageProps.block_size - 10, this.stageProps.block_size - 10);\n    }\n  }, {\n    key: \"shoot\",\n    value: function shoot(x, y) {\n      this.ctx.fillStyle = 'black';\n      this.ctx.fillRect(x * this.stageProps.block_size + 1, y * this.stageProps.block_size + 1, this.stageProps.block_size - 2, this.stageProps.block_size - 2);\n    }\n  }, {\n    key: \"oppShoot\",\n    value: function oppShoot(x, y) {\n      this.ctx.fillStyle = 'black';\n      this.ctx.fillRect(x * this.stageProps.block_size + 1, y * this.stageProps.block_size + 1, this.stageProps.block_size - 2, this.stageProps.block_size - 2);\n    }\n  }, {\n    key: \"oppMove\",\n    value: function oppMove(x, y) {\n      this.ctx.drawImage(this.player.oppImage, x * this.stageProps.block_size + 5, y * this.stageProps.block_size + 5, this.stageProps.block_size - 10, this.stageProps.block_size - 10);\n    }\n  }, {\n    key: \"resetBlock\",\n    value: function resetBlock(x, y) {\n      this.ctx.fillStyle = 'white';\n      this.ctx.fillRect(x * this.stageProps.block_size + 1, y * this.stageProps.block_size + 1, this.stageProps.block_size - 2, this.stageProps.block_size - 2);\n    }\n  }, {\n    key: \"validMoves\",\n    value: function validMoves(_validMoves, type) {\n      var _this3 = this;\n\n      this.ctx.fillStyle = type == 0 ? 'rgba(0,225,0,0.5)' : 'rgba(225,0,0,0.5)';\n\n      _validMoves.forEach(function (element) {\n        var x = element % 10;\n        var y = ~~(element / 10);\n\n        _this3.ctx.fillRect(x * _this3.stageProps.block_size + 1, y * _this3.stageProps.block_size + 1, _this3.stageProps.block_size - 2, _this3.stageProps.block_size - 2);\n      });\n    }\n  }, {\n    key: \"clearValidMoves\",\n    value: function clearValidMoves(validMoves) {\n      var _this4 = this;\n\n      this.ctx.fillStyle = 'white';\n      validMoves.forEach(function (element) {\n        var x = element % 10;\n        var y = ~~(element / 10);\n\n        _this4.ctx.fillRect(x * _this4.stageProps.block_size + 1, y * _this4.stageProps.block_size + 1, _this4.stageProps.block_size - 2, _this4.stageProps.block_size - 2);\n      });\n    }\n  }]);\n\n  return board;\n}();\n\n\n\n//# sourceURL=webpack:///./src/class/board.js?");

/***/ }),

/***/ "./src/class/game.js":
/*!***************************!*\
  !*** ./src/class/game.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return game; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * This class takes care of the games logic\r\n */\nvar game =\n/*#__PURE__*/\nfunction () {\n  function game(roomId, player) {\n    _classCallCheck(this, game);\n\n    this.roomID = roomId;\n    this.empty = 0;\n    this.arrow = 9;\n    this.player = player;\n    this.player1IDs = [1, 2, 3, 4];\n    this.player2IDs = [5, 6, 7, 8];\n    this.player1Pos = [{\n      \"row\": 3,\n      \"col\": 0\n    }, {\n      \"row\": 0,\n      \"col\": 3\n    }, {\n      \"row\": 0,\n      \"col\": 6\n    }, {\n      \"row\": 3,\n      \"col\": 9\n    }];\n    this.player2Pos = [{\n      \"row\": 6,\n      \"col\": 0\n    }, {\n      \"row\": 9,\n      \"col\": 3\n    }, {\n      \"row\": 9,\n      \"col\": 6\n    }, {\n      \"row\": 6,\n      \"col\": 9\n    }];\n    this.board = [[0, 0, 0, 2, 0, 0, 3, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 4], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [5, 0, 0, 0, 0, 0, 0, 0, 0, 8], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 6, 0, 0, 7, 0, 0, 0]];\n    this.moves = 0;\n  }\n\n  _createClass(game, [{\n    key: \"moveEnd\",\n    value: function moveEnd(x, y) {\n      if (this.board[y][x] == this.empty) {\n        this.board[this.player.selection.row][this.player.selection.col] = 0;\n        this.player.pieces.set(this.player.selection.ID, {\n          row: y,\n          col: x\n        });\n        this.board[y][x] = this.player.selection.ID;\n        return true;\n      } else {\n        return false;\n      }\n    }\n  }, {\n    key: \"oppMove\",\n    value: function oppMove(ID, x, y) {\n      this.board[this.player.oppPieces.get(ID).row][this.player.oppPieces.get(ID).col] = 0;\n      this.player.oppPieces.set(ID, {\n        row: y,\n        col: x\n      });\n      this.board[y][x] = ID;\n    }\n  }, {\n    key: \"shoot\",\n    value: function shoot(x, y) {\n      if (this.board[y][x] == this.empty) {\n        this.board[y][x] = this.arrow; //print the board to check\n\n        return true;\n      } else {\n        return false;\n      }\n    }\n  }, {\n    key: \"oppShoot\",\n    value: function oppShoot(x, y) {\n      this.board[y][x] = this.arrow;\n    }\n    /**\r\n     * \r\n     * Checks path for move and shoot, and returns an array of available positions\r\n     * The calling function, using x and y\r\n     * checks if it exists in the returned array\r\n     * \r\n     */\n\n  }, {\n    key: \"checkPath\",\n    value: function checkPath(x, y) {\n      var validMoves = [];\n      var sel = x + y * 10; //First up\n\n      var up = sel - 10;\n\n      while (up >= 0 && this.board[~~(up / 10)][up % 10] == 0) {\n        validMoves.push(up);\n        up -= 10;\n      } //Then down\n\n\n      var down = sel + 10;\n\n      while (down <= 99 && this.board[~~(down / 10)][down % 10] == 0) {\n        validMoves.push(down);\n        down += 10;\n      } //yadda yadda\n\n\n      var right = sel + 1;\n\n      while (right % 10 != 0 && this.board[~~(right / 10)][right % 10] == 0) {\n        validMoves.push(right);\n        right++;\n      }\n\n      var left = sel - 1;\n\n      while (left % 10 != 9 && this.board[~~(left / 10)][left % 10] == 0) {\n        validMoves.push(left);\n        left--;\n      }\n\n      var upleftx = x - 1;\n      var uplefty = y - 1;\n\n      while (upleftx >= 0 && uplefty >= 0 && this.board[uplefty][upleftx] == 0) {\n        validMoves.push(upleftx + uplefty * 10);\n        upleftx--;\n        uplefty--;\n      }\n\n      var uprightx = x + 1;\n      var uprighty = y - 1;\n\n      while (uprightx <= 9 && uprighty >= 0 && this.board[uprighty][uprightx] == 0) {\n        validMoves.push(uprightx + uprighty * 10);\n        uprightx++;\n        uprighty--;\n      }\n\n      var downleftx = x - 1;\n      var downlefty = y + 1;\n\n      while (downleftx >= 0 && downlefty <= 9 && this.board[downlefty][downleftx] == 0) {\n        console.log(downleftx);\n        console.log(downlefty);\n        console.log('\\n');\n        validMoves.push(downleftx + downlefty * 10);\n        downleftx--;\n        downlefty++;\n        console.log('truth?');\n        console.log();\n      }\n\n      var downrightx = x + 1;\n      var downrighty = y + 1;\n\n      while (downrightx <= 9 && downrighty <= 9 && this.board[downrighty][downrightx] == 0) {\n        validMoves.push(downrightx + downrighty * 10);\n        downrightx++;\n        downrighty++;\n      }\n\n      return validMoves;\n    }\n  }]);\n\n  return game;\n}();\n\n\n\n//# sourceURL=webpack:///./src/class/game.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return player; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n/**\r\n * This class is mostly for player identifying variables for now\r\n */\nvar player =\n/*#__PURE__*/\nfunction () {\n  function player(name, src, oppSrc, turn) {\n    _classCallCheck(this, player);\n\n    this.myTurnStart = turn;\n    this.myTurnEnd = false;\n    this.myShoot = false;\n    this.oppImage = new Image();\n    this.image = new Image();\n    this.src = src;\n    this.oppSrc = oppSrc;\n    this.name = name;\n    this.selection = {\n      ID: 0,\n      row: 0,\n      //row and col may not be needed\n      col: 0\n    };\n    this.pieces = new Map();\n    this.oppPieces = new Map();\n  }\n\n  _createClass(player, [{\n    key: \"setup\",\n    value: function setup(ID, startPos, oppID, oppStartPos) {\n      this.oppImage.src = this.oppSrc;\n      this.image.src = this.src;\n      this.pieces.set(ID[0], startPos[0]);\n      this.pieces.set(ID[1], startPos[1]);\n      this.pieces.set(ID[2], startPos[2]);\n      this.pieces.set(ID[3], startPos[3]); //This might not be needed either, but I'll keep it and update it \n      //it for now just incase :)\n\n      this.oppPieces.set(oppID[0], oppStartPos[0]);\n      this.oppPieces.set(oppID[1], oppStartPos[1]);\n      this.oppPieces.set(oppID[2], oppStartPos[2]);\n      this.oppPieces.set(oppID[3], oppStartPos[3]);\n    }\n  }, {\n    key: \"updateSel\",\n    value: function updateSel(id, x, y) {\n      this.selection.ID = id;\n      this.selection.row = y;\n      this.selection.col = x;\n    }\n  }]);\n\n  return player;\n}();\n\n\n\n//# sourceURL=webpack:///./src/class/player.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _class_player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./class/player */ \"./src/class/player.js\");\n/* harmony import */ var _class_myCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./class/myCanvas */ \"./src/class/myCanvas.js\");\n/* harmony import */ var _class_game__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class/game */ \"./src/class/game.js\");\n/* harmony import */ var _class_board__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./class/board */ \"./src/class/board.js\");\n\n\n\n\nvar socket = io.connect('http://localhost:5000');\nvar canvas = new _class_myCanvas__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\nvar player, game, board, validMoves;\n/***************************************************************************************\r\n * Player 1 functions\r\n */\n//New game\n\n$('#new').on('click', function () {\n  var name = $('#nameNew').val();\n  player = new _class_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, 'images/queen.jpg', 'images/queen2.jpg', true);\n  socket.emit('createGame', {\n    name: name\n  }); //server.js on.createGame\n  //first player with name and initial starting point\n}); //Called by server.js with on.createGame\n//It passes back the name of the player and the room name that was created\n\nsocket.on('newGame', function (data) {\n  game = new _class_game__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.room, player);\n  board = new _class_board__WEBPACK_IMPORTED_MODULE_3__[\"default\"](canvas.ctx, data.room, player);\n  player.setup(game.player1IDs, game.player1Pos, game.player2IDs, game.player2Pos);\n  board.displayBoard();\n  document.getElementById(\"message\").innerHTML = data.room + ' ' + player.name + ' ' + player.myTurnStart;\n}); //Called by server.js, broadcast to player 1 by player 2\n//sends player 1 the room name and a name\n//CHECK WHAT NAME IS SENT BACK?\n\nsocket.on('player1', function (data) {\n  var message = 'Hello, player1'; //Default value are hardcoded in game and player class\n\n  board[\"default\"]();\n  board.oppDefault();\n  canvas.canvas.addEventListener('click', function (e) {\n    processClick(e.clientX, e.clientY);\n  });\n});\n/****************************************************************************************\r\n * Player 2 functions\r\n */\n//Join created game\n\n$('#join').on('click', function () {\n  var name = $('#nameJoin').val();\n  var roomID = $('#room').val(); //second player with name and initial starting point\n\n  player = new _class_player__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, 'images/queen2.jpg', 'images/queen.jpg', false);\n  socket.emit('joinGame', {\n    name: name,\n    room: roomID\n  }); //server.js on.joinGame    \n}); //Displays board and does the same as on.'player1'\n\nsocket.on('player2', function (data) {\n  var message = 'Hello, player2';\n  game = new _class_game__WEBPACK_IMPORTED_MODULE_2__[\"default\"](data.room, player);\n  board = new _class_board__WEBPACK_IMPORTED_MODULE_3__[\"default\"](canvas.ctx, data.room, player);\n  board.displayBoard();\n  player.setup(game.player2IDs, game.player2Pos, game.player1IDs, game.player1Pos);\n  document.getElementById(\"message\").innerHTML = data.room; //This doesn't work every time!\n\n  player.image.onload = function () {\n    board[\"default\"]();\n    board.oppDefault();\n  };\n\n  canvas.canvas.addEventListener('click', function (e) {\n    processClick(e.clientX, e.clientY);\n  });\n});\n/**************************************************************************\r\n* Game Controller functions\r\n* Game class controls the logic while board class controls the\r\n* visuals. Player class also keeps track of own pieces, opponent\r\n* pieces and selected piece\r\n**************************************************************************/\n\n/**\r\n * Opponent functions to update board with data from server\r\n */\n//Update Move\n\nsocket.on('oppMove', function (data) {\n  console.log('oppmove');\n  board.resetBlock(player.oppPieces.get(data.selID).col, player.oppPieces.get(data.selID).row);\n  game.oppMove(data.selID, data.col, data.row);\n  board.oppMove(data.col, data.row);\n}); //Update opponents arrow\n\nsocket.on('oppShoot', function (data) {\n  game.oppShoot(data.col, data.row);\n  board.oppShoot(data.col, data.row);\n  player.myTurnStart = true;\n}); //The event listener is always listening, \n//but the action that is takes depends on player variables\n\nfunction processClick(x, y) {\n  if (player.myTurnStart == true) {\n    var xcoord = ~~((x - canvas.canvas.offsetLeft) / 50);\n    var ycoord = ~~((y - canvas.canvas.offsetTop) / 50);\n\n    if (processMoveStart(xcoord, ycoord) == true) {\n      player.myTurnStart = false;\n      player.myTurnEnd = true;\n    } else {\n      console.log(\"Not your piece\");\n    }\n  } else if (player.myTurnEnd == true) {\n    var _xcoord = ~~((x - canvas.canvas.offsetLeft) / 50);\n\n    var _ycoord = ~~((y - canvas.canvas.offsetTop) / 50);\n\n    if (processMoveEnd(_xcoord, _ycoord) == true) {\n      socket.emit('playersMove', {\n        selID: player.selection.ID,\n        newrow: _ycoord,\n        newcol: _xcoord,\n        room: game.roomID\n      });\n      player.myTurnEnd = false;\n      player.myShoot = true;\n    } else {\n      console.log('Not Legal Move');\n    }\n  } else if (player.myShoot == true) {\n    var _xcoord2 = ~~((x - canvas.canvas.offsetLeft) / 50);\n\n    var _ycoord2 = ~~((y - canvas.canvas.offsetTop) / 50);\n\n    if (processShoot(_xcoord2, _ycoord2) == true) {\n      socket.emit('playersShoot', {\n        row: _ycoord2,\n        col: _xcoord2,\n        room: game.roomID\n      });\n      player.myShoot = false;\n      console.log(game.board);\n    } else {\n      console.log(\"Not legal shot\");\n    }\n  } else {\n    console.log(\"not your turn\");\n  }\n\n  function processMoveStart(x, y) {\n    if (player.pieces.has(game.board[y][x])) {\n      player.updateSel(game.board[y][x], x, y);\n      board.moveStart();\n      validMoves = game.checkPath(x, y);\n      board.validMoves(validMoves, 0);\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  function processMoveEnd(x, y) {\n    //CheckPath starts at the original place\n    if (validMoves.includes(x + y * 10) && game.moveEnd(x, y) == true) {\n      board.clearValidMoves(validMoves);\n      board.resetBlock(player.selection.col, player.selection.row);\n      board.moveEnd(x, y);\n      validMoves = game.checkPath(player.pieces.get(player.selection.ID).col, player.pieces.get(player.selection.ID).row);\n      board.validMoves(validMoves, 1);\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  function processShoot(x, y) {\n    //checkpath starts at the new player piece position\n    if (validMoves.includes(x + y * 10) && game.shoot(x, y) == true) {\n      board.clearValidMoves(validMoves);\n      board.shoot(x, y);\n      return true;\n    } else {\n      return false;\n    }\n  }\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });