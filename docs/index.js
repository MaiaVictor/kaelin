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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// ::::::::::::\n// :: Vector ::\n// ::::::::::::\n\nconst add2 = ([ax,ay],[bx,by]) => [ax + bx, ay + by];\n\n// :::::::::::::::\n// :: Direction ::\n// :::::::::::::::\n\nconst Right = 0;\nconst Down = 1;\nconst Left = 2;\nconst Up = 3;\n\nconst dir_delta = (dir) => {\n  switch (dir) {\n    case Right : return [ 1,  0];\n    case Down  : return [ 0,  1];\n    case Left  : return [-1,  0];\n    case Up    : return [ 0, -1];\n  }\n};\n\nconst swap = (game, pos_a, pos_b) => {\n  var a = get_thing(game, pos_a);\n  var b = get_thing(game, pos_b);\n  set_thing(game, pos_a, b);\n  set_thing(game, pos_b, a);\n  if (a.pid !== null) game.heroes[a.pid].pos = pos_b;\n  if (b.pid !== null) game.heroes[b.pid].pos = pos_a;\n};\n\nconst get_active_pos = (game) => {\n  return game.heroes[game.turn % 10].pos;\n};\n\nconst get_active_hero = (game) => {\n  return get_thing(game, get_active_pos(game));\n};\n\nconst walk = (game, a_pos, a_dir) => {\n  var a_val = get_thing(game, a_pos);\n  if (a_val && a_val.walks) {\n    var b_pos = add2(a_pos, dir_delta(a_dir));\n    var b_val = get_thing(game, b_pos);\n    if (b_val && b_val.walkable) {\n      a_val.steps += 1;\n      console.log(a_val.steps);\n      swap(game, a_pos, b_pos);\n      if (a_val.steps >= a_val.speed) {\n        end_turn(game);\n      }\n      return true;\n    }\n  }\n  return false;\n};\n\n// :::::::::::\n// :: Floor ::\n// :::::::::::\n\nconst Empty = () => ({});\n\n// :::::::::::\n// :: Thing ::\n// :::::::::::\n\nconst Void = () => ({\n  pid: null,\n  color: null,\n  walks: false,\n  walkable: true,\n  speed: 0,\n  hp: 0,\n});\n\nconst Wall = () => ({\n  pid: null,\n  color: \"#202020\",\n  walks: false,\n  walkable: false,\n  speed: 0,\n  hp: 0,\n});\n\nconst Throne = () => ({\n  pid: null,\n  color: \"#E04020\",\n  walks: false,\n  walkable: true,\n  speed: 0,\n  hp: 0,\n});\n\nconst Guard = () => ({\n  pid: null,\n  color: \"#203020\",\n  walks: true,\n  walkable: false,\n  speed: 0,\n  hp: 32,\n});\n\nconst Hero = (pid) => ({\n  pid: pid,\n  color: \"#809080\",\n  walks: true,\n  walkable: false,\n  speed: 4,\n  hp: 32,\n  steps: 0,\n});\n\n// :::::::::\n// :: Game ::\n// :::::::::\n\nconst Game = (data) => {\n  var heroes = {A: {}, B: {}};\n  var dim = [data[0].length / 2, data.length];\n  var map = data.map((line,j) => {\n    var arr = [];\n    for (var i = 0; i < dim[0]; ++i) {\n      const pos = [i,j];\n      const Floor = (chr) => {\n        switch (chr) {\n          default : return Empty();\n        }\n      }\n      const Thing = (chr) => {\n        switch (chr) {\n          case \"X\" : return Wall();\n          case \"T\" : return Throne();\n          case \"G\" : return Guard();\n          case \"0\" : heroes[0] = {pos}; return Hero(0);\n          case \"1\" : heroes[1] = {pos}; return Hero(1);\n          case \"2\" : heroes[2] = {pos}; return Hero(2);\n          case \"3\" : heroes[3] = {pos}; return Hero(3);\n          case \"4\" : heroes[4] = {pos}; return Hero(4);\n          case \"5\" : heroes[5] = {pos}; return Hero(5);\n          case \"6\" : heroes[6] = {pos}; return Hero(6);\n          case \"7\" : heroes[7] = {pos}; return Hero(7);\n          case \"8\" : heroes[8] = {pos}; return Hero(8);\n          case \"9\" : heroes[9] = {pos}; return Hero(9);\n          default  : return Void();\n        }\n      }\n      arr[i] = [Floor(line[i * 2]), Thing(line[i * 2 + 1])];\n    }\n    return arr;\n  });\n  return {dim, map, heroes, turn: 0};\n};\n\nconst end_turn = (game) => {\n  var hero = get_active_hero(game);\n  hero.steps = 0;\n  game.turn += 1;\n};\n\nconst act = (game, key) => {\n  var pos  = get_active_pos(game);\n  var hero = get_active_hero(game);\n  switch (key) {\n    case \"a\":\n    case \"s\":\n    case \"d\":\n    case \"w\":\n      walk(game, pos, ({a: Left, s: Down, d: Right, w: Up})[key]);\n      break;\n    case \"Enter\":\n      end_turn(game);\n      break;\n  }\n};\nconst get_floor = (game, pos) => game.map[pos[1]] && game.map[pos[1]][pos[0]] && game.map[pos[1]][pos[0]][0] || null;\nconst get_thing = (game, pos) => game.map[pos[1]] && game.map[pos[1]][pos[0]] && game.map[pos[1]][pos[0]][1] || null;\nconst set_floor = (game, pos, thing) => game.map[pos[1]][pos[0]][0] = thing;\nconst set_thing = (game, pos, thing) => game.map[pos[1]][pos[0]][1] = thing;\n\nconst default_map_data = [\n// |               ,               ;               .               |               ,               ;               ,               |\n  \" X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//--------0\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//-- 8\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//---- 16\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//-- 24\n  \" X X X X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X X X X\",\n  \" X . . . X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X . . . X\",\n  \" X . . . X X X X X X X X X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X X X X X X X X X . . . X\",\n  \" X . . . . . . . . . . . . X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X . . . . . . . . . . . . X\",\n  \" X . X G G G G G G G G X . X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X . X G G G G G G G G X . X\",\n  \" X . 0 . . . . . . . . X G X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X G X . . . . . . . . 5 . X\",\n  \" X X 1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . 6 X X\",\n  \" X T 2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . 7 T X\",//-------- 32\n  \" X X 3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . 8 X X\",\n  \" X . 4 . . . . . . . . X G X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X G X . . . . . . . . 9 . X\",\n  \" X . X G G G G G G G G X . X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X . X G G G G G G G G X . X\",\n  \" X . . . . . . . . . . . . X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X . . . . . . . . . . . . X\",\n  \" X . . . X X X X X X X X X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X X X X X X X X X . . . X\",\n  \" X . . . X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X . . . X\",\n  \" X X X X X . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . X X X X X\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//-- 40\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//---- 48\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",//-- 56\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n  \" . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .\",\n];                                                                                                                                  //-------- 64\n\n// :::::::::::::::\n// :: Rendering ::\n// :::::::::::::::\n\nconst fps = (function fps() {\n  var fps = 0;\n  var frames = 0;\n  var last = Date.now() / 1000;\n  return function frame() {\n    ++frames;\n    if (Date.now() / 1000 - last > 1) {\n      fps = frames;\n      console.log(\"fps:\" + fps);\n      frames = 0;\n      last = Date.now() / 1000;\n    }\n  };\n})();\n\nconst Keyboard = (callbacks) => {\n  callbacks.down = callbacks.down || function(){};\n  callbacks.up = callbacks.up || function(){};\n  var key = {};\n  document.addEventListener(\"keydown\", e => { key[e.key] = 1; callbacks.down(e.key); });\n  document.addEventListener(\"keyup\", e => { key[e.key] = 0; callbacks.up(e.key); });\n  return key;\n};\n\nconst Mouse = () => {\n  var mouse = [window.innerWidth * 0.5, window.innerHeight * 0.5];\n  document.addEventListener(\"mousemove\", e => { mouse[0] = e.pageX; mouse[1] = e.pageY; });\n  document.addEventListener(\"mouseout\", e => { mouse[0] = e.pageX; mouse[1] = e.pageY; });\n  return mouse;\n};\n\nwindow.onload = () => {\n  // Initialize canvas and defaults\n  var canvas = document.createElement(\"canvas\");\n  var ctx = canvas.getContext(\"2d\");\n  var W = canvas.width = window.innerWidth;\n  var H = canvas.height = window.innerHeight;\n  canvas.style.margin = \"0px\";\n  canvas.style.padding = \"0px\";\n  ctx.font = \"10px Arial\";\n  ctx.textBaseline = \"middle\"; \n  ctx.textAlign = \"center\";\n  document.body.appendChild(canvas);\n  document.body.style.background = \"#404040\";\n\n  // Game state\n  var game = Game(default_map_data);\n  var acts = [];\n  var move = (key) => {\n    acts.push(key);\n    act(game, key);\n  };\n\n  // Renderer state\n  var project  = ([x,y]) => [x - pos[0] + W * 0.5, y - pos[1] + H * 0.5];\n  var unproject = ([x,y]) => [x + pos[0] - W * 0.5, y + pos[1] - H * 0.5];\n  var key = Keyboard({down: key => move(key)});\n  var mouse = Mouse();\n  var SIZ = 48;\n  var pos = [0,SIZ*game.dim[1]*0.5];\n\n  // Main loop\n  const render = () => {\n\n    // Time\n    fps();\n    var T = Date.now() / 1000;\n\n    // heroes position\n    pos[0] += ((key.ArrowRight||0) - (key.ArrowLeft||0)) * 12;\n    pos[1] += ((key.ArrowDown||0) - (key.ArrowUp||0)) * 12;\n    var idx = [Math.floor(pos[0] / SIZ), Math.floor(pos[1] / SIZ)];\n    var ofs = [pos[0] % SIZ, pos[1] % SIZ];\n    var scr = [Math.floor(W / SIZ * 0.5 + 2), Math.floor(H / SIZ * 0.5 + 2)]; // screen radius\n\n    // Camera movement\n    if ( mouse[0] <     16\n      || mouse[0] > W - 16\n      || mouse[1] <     16\n      || mouse[1] > H - 16) {\n      var dir = [mouse[0] - W * 0.5, mouse[1] - H * 0.5];\n      var len = Math.sqrt(dir[0] * dir[0] + dir[1] * dir[1]);\n      var mov = [dir[0] / len * 32, dir[1] / len * 32];\n      pos[0] += mov[0];\n      pos[1] += mov[1];\n    }\n    if (key[\" \"]) {\n      var pid = game.turn % 10;\n      pos[0] = game.heroes[pid].pos[0] * SIZ;\n      pos[1] = game.heroes[pid].pos[1] * SIZ;\n    }\n\n    // Clears screen\n    ctx.clearRect(0, 0, W, H);\n\n    // Draws tiles\n    for (var dj = -scr[1]; dj <= scr[1]; ++dj) {\n      for (var di = -scr[0]; di <= scr[0]; ++di) {\n        var [i,j] = [idx[0] + di, idx[1] + dj];\n        var [x,y] = project([i * SIZ, j * SIZ]);\n        var thing = get_thing(game, [i,j]);\n        var floor = get_floor(game, [i,j]);\n\n        // Info\n        if (floor) {\n          ctx.strokeStyle = \"#606060\";\n          ctx.beginPath();\n          ctx.rect(x, y, SIZ, SIZ);\n          ctx.stroke();\n          ctx.closePath();\n          ctx.fillStyle = \"#A0A0A0\";\n          ctx.fillText(i, x + SIZ * 0.5, y + SIZ * 0.25);\n          ctx.fillText(j, x + SIZ * 0.5, y + SIZ * 0.75);\n        }\n\n        // Thing\n        if (thing && thing.color) {\n          ctx.fillStyle = thing.color;\n          ctx.beginPath();\n          ctx.rect(x, y, SIZ, SIZ);\n          ctx.fill();\n          ctx.closePath();\n        }\n      }\n    }\n\n    // Draws heroes\n    //ctx.strokeStyle = ctx.fillStyle = \"#000000\";\n    //var [x,y] = add2(project(pos), [-4, -4]);\n    //ctx.beginPath();\n    //ctx.rect(x, y, 8, 8);\n    //ctx.fill();\n    //ctx.closePath();\n\n    // Draws minimap\n    ctx.strokeStyle = ctx.fillStyle = \"rgba(128,128,128,0.5)\";\n    ctx.beginPath();\n    ctx.rect(W - 128, H - 128, 128, 128);\n    ctx.fill();\n    ctx.closePath();\n\n    // Draws screen on minimap\n    ctx.beginPath();\n    ctx.fillStyle = \"rgb(255,255,255,0.25)\";\n    var X0 = Math.min(Math.max(W - 128 + (idx[0] - scr[0] - 0) * 2, W - 128), W);\n    var Y0 = Math.min(Math.max(H - 128 + (idx[1] - scr[1] - 0) * 2, H - 128), H);\n    var X1 = Math.min(Math.max(W - 128 + (idx[0] + scr[0] + 1) * 2, W - 128), W);\n    var Y1 = Math.min(Math.max(H - 128 + (idx[1] + scr[1] + 1) * 2, H - 128), H);\n    ctx.rect(X0, Y0, X1 - X0, Y1 - Y0);\n    ctx.fill();\n    ctx.closePath();\n\n    // Draws camera on minimap\n    //ctx.beginPath();\n    //ctx.fillStyle = \"rgb(0,0,0)\";\n    //ctx.rect(W - 128 + idx[0] * 2, H - 128 + idx[1] * 2, 2, 2);\n    //ctx.fill();\n    //ctx.closePath();\n\n    // Draws units on minimap\n    for (var j = 0; j < game.dim[1]; ++j) {\n      for (var i = 0; i < game.dim[1]; ++i) {\n        var [x,y] = [W - 128 + i * 2, H - 128 + j * 2];\n        var floor = get_floor(game, [i, j]);\n        var thing = get_thing(game, [i, j]);\n\n        // Thing\n        if (thing && thing.color) {\n          ctx.fillStyle = thing.color;\n          ctx.beginPath();\n          ctx.rect(x, y, 2, 2);\n          ctx.fill();\n          ctx.closePath();\n        }\n      }\n    }\n\n\n    window.requestAnimationFrame(render);\n  };\n\n  window.requestAnimationFrame(render);\n};\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });