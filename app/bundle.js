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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _views = __webpack_require__(3);

var _views2 = _interopRequireDefault(_views);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var controllers = function () {

    var combination = [];
    var height = $(document).height();
    var width = $(document).width();

    // Detection validation - Verifie les coordonnées
    // ----------------------------------------------

    var _validateDetection = function _validateDetection(x, y, width, height) {

        var posX = Math.floor(Math.random() * width);
        var posY = Math.floor(Math.random() * height);

        return {
            posX: posX,
            posY: posY,
            nextX: posX + 10 * x,
            nextY: posY + 10 * y
        };
    };

    // Game - Mécanisme de jeu
    // -----------------------

    var motionDetect = function motionDetect(width, height) {

        var moveX = void 0,
            moveY = void 0,
            moveZ = void 0,
            forceCounter = 0,
            numbersRevealed = 0;

        window.addEventListener('devicemotion', function (event) {
            moveX = Math.round(event.accelerationIncludingGravity.x);
            moveY = Math.round(event.accelerationIncludingGravity.y);
            moveZ = Math.round(event.accelerationIncludingGravity.z);
        });

        var game = setInterval(function () {
            var nextMove = _validateDetection(moveX, moveY, width, height);
            var force = Math.abs(moveX) + Math.abs(moveY) + Math.abs(moveZ);

            var nextStep = function nextStep(_) {
                numbersRevealed++;
                _combinationGenerator(numbersRevealed);
                if ("vibrate" in window.navigator) {
                    window.navigator.vibrate(200);
                }
            };

            if (force > 20) {
                forceCounter += force;
                _views2.default.addCharm({ x: nextMove.posX, y: nextMove.posY }, { x: nextMove.nextX, y: nextMove.nextY, speed: force * 50 });

                if (forceCounter >= 500 && numbersRevealed < 1) {
                    nextStep();
                } else if (forceCounter >= 1000 && numbersRevealed < 2) {
                    nextStep();
                } else if (forceCounter >= 1500 && numbersRevealed < 3) {
                    nextStep();
                } else if (forceCounter >= 2000 && numbersRevealed < 4) {
                    nextStep();
                } else if (forceCounter >= 2500 && numbersRevealed < 5) {
                    nextStep();
                } else if (forceCounter >= 3000 && numbersRevealed < 6) {
                    nextStep();
                } else if (forceCounter >= 3500 && numbersRevealed < 7) {
                    nextStep();
                }

                if (numbersRevealed === 7) {
                    clearInterval(game);
                    _views2.default.retry();
                }
            }
        }, 50);
    };

    // Combination generator - Génère la combinaison
    // ---------------------------------------------


    var _combinationGenerator = function _combinationGenerator(revealed) {

        if (revealed < 6) {
            var newNumber = Math.floor(Math.random() * 50) + 1;
            if (combination.indexOf(newNumber) !== -1) {
                _combinationGenerator(revealed);
            } else {
                combination.push(newNumber);
                _views2.default.grid.pick('number', newNumber);
                var notificationMessage = 'Numéro ' + newNumber;
                _views2.default.notification(notificationMessage, 2000, 'number');
            }
        } else {
            var newStar = Math.floor(Math.random() * 12) + 1;
            if (combination.indexOf(newStar) !== -1) {
                _combinationGenerator(revealed);
            } else {
                combination.push(newStar);
                _views2.default.grid.pick('star', newStar);
                var _notificationMessage = 'Etoile ' + newStar;
                _views2.default.notification(_notificationMessage, 2000, 'star');
            }
        }
    };

    // Start - Launch the game !
    // -------------------------

    var start = function start() {
        combination = [];
        _views2.default.changeView(_views2.default.grid.build);
        if (window.DeviceMotionEvent) {
            _views2.default.notification('Secoue ton téléphone !', 3000, 'start');
            motionDetect(width, height);
        } else {
            _views2.default.notification("Ton téléphone n'est pas compatible :( !", 20000);
        }
    };

    return {
        motionDetect: motionDetect,
        start: start
    };
}();

exports.default = controllers;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(10)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/index.js!./styles.less", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/less-loader/dist/index.js!./styles.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global $*/


__webpack_require__(1);

var _controllers = __webpack_require__(0);

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_controllers2.default.start();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*global $*/



Object.defineProperty(exports, "__esModule", {
    value: true
});

var _controllers = __webpack_require__(0);

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var views = function () {

    var height = $(document).height();
    var $root = $('#root');
    var notificationRunning = false;
    var charms = [];

    // View Add - Ajoute l'élément à la vue
    // ------------------------------------

    var _paint = function _paint(element) {
        $root.append(element);
    };

    // View change - Bascule d'une vue à l'autre
    // -----------------------------------------

    var changeView = function changeView(nextViewBuilder) {
        $root.empty();
        nextViewBuilder();
    };

    // Notifications - Popup de notification
    //--------------------------------------

    var notification = function notification(message, time, img) {

        var imgSelect = function imgSelect(img) {

            var baseUrl = '../img/';

            if (img === 'start') {
                return baseUrl + 'magic.png';
            } else if (img === 'number') {
                return baseUrl + 'charm4.png';
            } else if (img === 'star') {
                return baseUrl + 'charm1.png';
            } else {
                return 'charm2.png';
            }
        };

        if (!notificationRunning) {

            notificationRunning = true;
            $('#grid-box').append("<div class='notification-box flex-column'><img src='" + imgSelect(img) + "'></img><div class='notification-message'>" + message + "</div></div>");

            setTimeout(function () {
                $('.notification-box').fadeOut(300, function () {
                    $('.notification-box').remove();
                });
                notificationRunning = false;
            }, time);
        }
    };

    // Grid - Grille de jeu
    // --------------------

    var grid = {

        build: function build(_) {

            var numberSize = Math.round(height / 30);
            var starSize = Math.round(height / 25);
            var numbers = 1,
                stars = 1;

            _paint('<div id="grid-box"><div id="numbers"></div><div id="stars"></div></div>');

            for (var i = 0; i < 10; i++) {
                $('#numbers').append('<div class="row" id="' + "row" + i + '"></div>');
                for (var j = 0; j < 5; j++) {
                    $('#row' + i).append("<div class='cell number' id='number" + numbers + "' style='width:" + numberSize + "px;height:" + numberSize + "px'>" + numbers + "</div>");
                    numbers++;
                }
            }

            for (var _i = 0; _i < 3; _i++) {
                $('#stars').append('<div class="row" id="' + "starRow" + _i + '"></div>');
                for (var _j = 0; _j < 4; _j++) {
                    $('#starRow' + _i).append("<div class='cell star' id='star" + stars + "' style='width:" + starSize + "px;height:" + starSize + "px'>" + stars + "</div>");
                    stars++;
                }
            }
        },

        pick: function pick(type, id) {
            if (type === 'number') {
                $('#number' + id).append("<div class='check'></div>");
            } else if (type === 'star') {
                $('#star' + id).append("<div class='check'></div>");
            }
        }

    };

    // Charms animation - Fait apparaitre les portes-bonheur
    // -----------------------------------------------------

    var Charm = function Charm(pos, nextPos, id) {
        _classCallCheck(this, Charm);

        this.posX = pos.x;
        this.posY = pos.y;
        this.nextPosX = nextPos.x;
        this.nextPosY = nextPos.y;
        this.speed = nextPos.speed;
        this.id = id;
    };

    Charm.prototype.build = function () {
        var _this = this;

        var charmRandom = function charmRandom(_) {
            var random = Math.floor(Math.random() * 20) + 1;
            if (random > 5 && random < 15) {
                return 4;
            } else if (random >= 15 && random <= 20) {
                return 5;
            } else {
                return random;
            }
        };

        _paint('<img src="../img/charm' + charmRandom() + '.png" class="charm" id="' + this.id + '"></img>');
        $('#' + this.id).css({ "left": this.posX + "px", "top": this.posY + "px" }).animate({ left: this.nextPosX + "px", top: this.nextPosY + "px" }, this.speed, function (_) {
            $('#' + _this.id).animate({ opacity: 0 }, 250, function (_) {
                $('#' + _this.id).remove();
            });
        });
    };

    var addCharm = function addCharm(pos, nextPos) {
        var currentCharm = charms.length;
        charms.push(new Charm(pos, nextPos, charms.length + 1));
        charms[currentCharm].build();
    };

    // Final - Retry button
    // --------------------

    var retry = function retry(_) {

        $('#grid-box').append('<div class="retry"></div>');

        $('.retry').click(function () {
            _controllers2.default.start();
        });
    };

    // Error - Affiché si device non-compatible
    // ----------------------------------------


    return {
        grid: grid,
        changeView: changeView,
        notification: notification,
        addCharm: addCharm,
        retry: retry
    };
}(); // End module

exports.default = views;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
	// get current location
	var location = typeof window !== "undefined" && window.location;

	if (!location) {
		throw new Error("fixUrls requires window.location");
	}

	// blank or null?
	if (!css || typeof css !== "string") {
		return css;
	}

	var baseUrl = location.protocol + "//" + location.host;
	var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
 This regular expression is just a way to recursively match brackets within
 a string.
 	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
    (  = Start a capturing group
      (?:  = Start a non-capturing group
          [^)(]  = Match anything that isn't a parentheses
          |  = OR
          \(  = Match a start parentheses
              (?:  = Start another non-capturing groups
                  [^)(]+  = Match anything that isn't a parentheses
                  |  = OR
                  \(  = Match a start parentheses
                      [^)(]*  = Match anything that isn't a parentheses
                  \)  = Match a end parentheses
              )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
  \)  = Match a close parens
 	 /gi  = Get all matches, not the first.  Be case insensitive.
  */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function (fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl.trim().replace(/^"(.*)"$/, function (o, $1) {
			return $1;
		}).replace(/^'(.*)'$/, function (o, $1) {
			return $1;
		});

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
			//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)(undefined);
// imports


// module
exports.push([module.i, "html {\n  overflow: hidden;\n  font-family: 'Lato', sans-serif;\n  background-image: url(" + __webpack_require__(8) + ");\n  background-repeat: repeat;\n  background-size: 400px;\n}\n#root {\n  display: flex;\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  justify-content: center;\n  align-items: center;\n  flex-direction: column;\n}\n#grid-box {\n  position: relative;\n  padding: 25px;\n  border: 5px solid #dbbe18;\n  border-radius: 15px;\n  background-color: #FFF;\n  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);\n}\n.row {\n  display: flex;\n  justify-content: center;\n}\n.cell {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  margin-left: 5px;\n  margin-right: 5px;\n  margin-bottom: 10px;\n  font-size: .9rem;\n  color: #1A1A1A;\n}\n#numbers {\n  margin-bottom: 20px;\n}\n.number {\n  border: 1px solid red;\n  border-radius: 2px;\n  background-color: #FFFFFF;\n}\n.star {\n  border-radius: 2px;\n  background-image: url(" + __webpack_require__(9) + ");\n  background-size: contain;\n}\n.check {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-image: url(" + __webpack_require__(7) + ");\n  background-size: contain;\n}\n.notification-box {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  background-color: #143036;\n  border-radius: 10px;\n}\n.notification-box img {\n  width: 50%;\n}\n.flex-column {\n  flex-direction: column;\n}\n.flex-row {\n  flex-direction: row;\n}\n.notification-message {\n  position: relative;\n  padding: 15% 20%;\n  font-size: 1.5em;\n  font-weight: 900;\n  text-align: center;\n  color: #FFF;\n  line-height: 100%;\n}\n.charm {\n  position: absolute;\n  width: 50px;\n  height: 50px;\n  animation-name: charmRotation;\n  animation-duration: 3.5s;\n}\n@keyframes charmRotation {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.retry {\n  position: absolute;\n  left: 0;\n  right: 0;\n  bottom: -23px;\n  margin: auto;\n  width: 40px;\n  height: 40px;\n  border-radius: 100%;\n  background-image: url(" + __webpack_require__(11) + ");\n  background-size: contain;\n}\n", ""]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/img/check.png";

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/img/pattern.png";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/img/star.png";

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);

	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "/img/refresh.png";

/***/ })
/******/ ]);