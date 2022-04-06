/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, exports, __webpack_require__) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = (function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    /**
     * 設定初期値
     */
    var defaults = {
        gap: "5px",
        srcAttribute: "src",
        margin: "0px 0px 10px 0px",
    };
    var PhotoCollage = /** @class */ (function () {
        function PhotoCollage(selector, settings) {
            var _this = this;
            //ユーザーが最終的に選んだ配列のプロパティーを返す
            this.selector = "";
            this.settings = {};
            //ユーザーの設定が反映された配列を変える
            this.data = Object.assign({}, defaults, settings);
            //クラス指定した要素すべてを取得
            this.elements = document.querySelectorAll(selector);
            //クラス要素一つ一つに処理
            this.elements.forEach(function (element) {
                element.classList.add("photocollage");
                //クラスごとの子要素にある画像をひとまとまりに格納するための配列を作る
                var photos = [];
                //配列の中に画像情報を格納するメソッド
                _this.getSrc(element, photos);
                _this.placePhoto(element, photos);
            });
        }
        /**
         *深さ優先探査で画像情報取得
      
         * @param element
         * @param photos
         */
        //親要素elementと木構造にある画像をまとめて格納するための配列を引数とする
        PhotoCollage.prototype.getSrc = function (element, photos) {
            var _this = this;
            //親要素に対しての子要素を配列にする
            var el = Array.from(element.children);
            //子要素がある分ループする
            el.forEach(function (element) {
                var _a, _b, _c, _d;
                //子要素の中でユーザーが設定した属性を持つなら
                if (element.hasAttribute(_this.data.srcAttribute)) {
                    //現段階の要素からみた親要素の中で直近にあるaタグを取得
                    var a = element.closest("a");
                    //木構造にあった画像情報を格納する
                    photos.push({
                        src: (_a = element.getAttribute(_this.data.srcAttribute)) !== null && _a !== void 0 ? _a : "",
                        href: (_b = a === null || a === void 0 ? void 0 : a.getAttribute("href")) !== null && _b !== void 0 ? _b : "",
                        width: (_c = element.getAttribute("width")) !== null && _c !== void 0 ? _c : "",
                        height: (_d = element.getAttribute("height")) !== null && _d !== void 0 ? _d : "",
                    });
                }
                //深さ優先探査、引数のelementに入る要素が下の階層の要素になっている
                _this.getSrc(element, photos);
            });
        };
        /**
         *新たな階層を生成
        
         * @param element
         * @param photos
         */
        PhotoCollage.prototype.placePhoto = function (element, photos) {
            var _this = this;
            //全部の要素消す
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            var parentElement = document.createElement("div");
            parentElement.classList.add("photo-layout");
            photos.forEach(function (photo) {
                var _a, _b;
                var childElement = document.createElement("div");
                childElement.classList.add("photo");
                //imgタグ生成
                var imgElement = document.createElement("img");
                if (_this.data.imgClass != undefined) {
                    imgElement.classList.add(_this.data.imgClass);
                }
                imgElement.setAttribute("src", photo.src);
                //aタグの生成
                var aElement = document.createElement("a");
                if (_this.data.aClass != undefined) {
                    aElement.classList.add(_this.data.aClass);
                }
                if (photo.href !== "") {
                    aElement.setAttribute("href", photo.href);
                }
                else {
                    aElement.setAttribute("href", photo.src);
                }
                if (_this.data.aAttribute != undefined) {
                    Object.entries(_this.data.aAttribute).forEach(function (datas) {
                        aElement.setAttribute(datas[0], datas[1]);
                    });
                }
                //タグ挿入
                aElement.appendChild(imgElement);
                childElement.appendChild(aElement);
                parentElement.appendChild(childElement);
                element.appendChild(parentElement);
                //レイアウトオプション
                element.style.margin = (_a = _this.data.margin) !== null && _a !== void 0 ? _a : "";
                parentElement.style.gap = (_b = _this.data.gap) !== null && _b !== void 0 ? _b : "";
            });
            //ulにクラスをつけて、縦横枚数を判別
            if (photos.length === 0) {
                return;
            }
            if (photos[0].width >= photos[0].height && photos.length < 5) {
                parentElement.classList.add("photocollageYoko" + [photos.length]);
            }
            else if (photos[0].width < photos[0].height && photos.length < 5) {
                parentElement.classList.add("photocollageTate" + [photos.length]);
            }
            else if (photos[0].width === photos[0].height && 2 < photos.length && photos.length < 5) {
                parentElement.classList.add("photocollageSquare" + [photos.length]);
            }
            else if (photos.length === 5) {
                parentElement.classList.add("photocollageNumber" + [photos.length]);
            }
            else {
                parentElement.classList.add("photocollageMore5");
            }
            //ulの中のdivを指定し、六枚以上の時のpタグで残り枚数表示
            var pictures = Array.from(parentElement.children);
            if (pictures.length > 5) {
                var targetphotos = Array.from(pictures[4].children);
                targetphotos[0].innerHTML += "<p>+".concat(photos.length - 5, "\u4EF6</p>");
            }
        };
        return PhotoCollage;
    }());
    window.PhotoCollage = PhotoCollage; // scriptタグにJSを記述する場合用
    exports["default"] = PhotoCollage; // JSファイルから読み込む用
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module used 'module' so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG8tY29sbGFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaUdBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsQ0FBQyxtQ0FBRTtBQUMvQjtBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsd0NBQXdDO0FBQ3hDLElBQUksa0JBQWUsaUJBQWlCO0FBQ3BDLENBQUM7QUFBQSxrR0FBQzs7Ozs7OztVQzVJRjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VFdEJBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcGhvdG9jb2xsYWdlLy4vc3JjL2luZGV4LnRzIiwid2VicGFjazovL3Bob3RvY29sbGFnZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9waG90b2NvbGxhZ2Uvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9waG90b2NvbGxhZ2Uvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3Bob3RvY29sbGFnZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lKFtcInJlcXVpcmVcIiwgXCJleHBvcnRzXCJdLCBmdW5jdGlvbiAocmVxdWlyZSwgZXhwb3J0cykge1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbiAgICAvKipcbiAgICAgKiDoqK3lrprliJ3mnJ/lgKRcbiAgICAgKi9cbiAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgIGdhcDogXCI1cHhcIixcbiAgICAgICAgc3JjQXR0cmlidXRlOiBcInNyY1wiLFxuICAgICAgICBtYXJnaW46IFwiMHB4IDBweCAxMHB4IDBweFwiLFxuICAgIH07XG4gICAgdmFyIFBob3RvQ29sbGFnZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUGhvdG9Db2xsYWdlKHNlbGVjdG9yLCBzZXR0aW5ncykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIC8v44Om44O844K244O844GM5pyA57WC55qE44Gr6YG444KT44Gg6YWN5YiX44Gu44OX44Ot44OR44OG44Kj44O844KS6L+U44GZXG4gICAgICAgICAgICB0aGlzLnNlbGVjdG9yID0gXCJcIjtcbiAgICAgICAgICAgIHRoaXMuc2V0dGluZ3MgPSB7fTtcbiAgICAgICAgICAgIC8v44Om44O844K244O844Gu6Kit5a6a44GM5Y+N5pig44GV44KM44Gf6YWN5YiX44KS5aSJ44GI44KLXG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgc2V0dGluZ3MpO1xuICAgICAgICAgICAgLy/jgq/jg6njgrnmjIflrprjgZfjgZ/opoHntKDjgZnjgbnjgabjgpLlj5blvpdcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIC8v44Kv44Op44K56KaB57Sg5LiA44Gk5LiA44Gk44Gr5Yem55CGXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwaG90b2NvbGxhZ2VcIik7XG4gICAgICAgICAgICAgICAgLy/jgq/jg6njgrnjgZTjgajjga7lrZDopoHntKDjgavjgYLjgovnlLvlg4/jgpLjgbLjgajjgb7jgajjgb7jgorjgavmoLzntI3jgZnjgovjgZ/jgoHjga7phY3liJfjgpLkvZzjgotcbiAgICAgICAgICAgICAgICB2YXIgcGhvdG9zID0gW107XG4gICAgICAgICAgICAgICAgLy/phY3liJfjga7kuK3jgavnlLvlg4/mg4XloLHjgpLmoLzntI3jgZnjgovjg6Hjgr3jg4Pjg4lcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRTcmMoZWxlbWVudCwgcGhvdG9zKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5wbGFjZVBob3RvKGVsZW1lbnQsIHBob3Rvcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipcbiAgICAgICAgICrmt7HjgZXlhKrlhYjmjqLmn7vjgafnlLvlg4/mg4XloLHlj5blvpdcbiAgICAgIFxuICAgICAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAgICAgKiBAcGFyYW0gcGhvdG9zXG4gICAgICAgICAqL1xuICAgICAgICAvL+imquimgee0oGVsZW1lbnTjgajmnKjmp4vpgKDjgavjgYLjgovnlLvlg4/jgpLjgb7jgajjgoHjgabmoLzntI3jgZnjgovjgZ/jgoHjga7phY3liJfjgpLlvJXmlbDjgajjgZnjgotcbiAgICAgICAgUGhvdG9Db2xsYWdlLnByb3RvdHlwZS5nZXRTcmMgPSBmdW5jdGlvbiAoZWxlbWVudCwgcGhvdG9zKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgLy/opqropoHntKDjgavlr77jgZfjgabjga7lrZDopoHntKDjgpLphY3liJfjgavjgZnjgotcbiAgICAgICAgICAgIHZhciBlbCA9IEFycmF5LmZyb20oZWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICAvL+WtkOimgee0oOOBjOOBguOCi+WIhuODq+ODvOODl+OBmeOCi1xuICAgICAgICAgICAgZWwuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZDtcbiAgICAgICAgICAgICAgICAvL+WtkOimgee0oOOBruS4reOBp+ODpuODvOOCtuODvOOBjOioreWumuOBl+OBn+WxnuaAp+OCkuaMgeOBpOOBquOCiVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZShfdGhpcy5kYXRhLnNyY0F0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/nj77mrrXpmo7jga7opoHntKDjgYvjgonjgb/jgZ/opqropoHntKDjga7kuK3jgafnm7Tov5HjgavjgYLjgoth44K/44Kw44KS5Y+W5b6XXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gZWxlbWVudC5jbG9zZXN0KFwiYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKjmp4vpgKDjgavjgYLjgaPjgZ/nlLvlg4/mg4XloLHjgpLmoLzntI3jgZnjgotcbiAgICAgICAgICAgICAgICAgICAgcGhvdG9zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAoX2EgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShfdGhpcy5kYXRhLnNyY0F0dHJpYnV0ZSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAoX2IgPSBhID09PSBudWxsIHx8IGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAoX2MgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIndpZHRoXCIpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAoX2QgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v5rex44GV5YSq5YWI5o6i5p+744CB5byV5pWw44GuZWxlbWVudOOBq+WFpeOCi+imgee0oOOBjOS4i+OBrumajuWxpOOBruimgee0oOOBq+OBquOBo+OBpuOBhOOCi1xuICAgICAgICAgICAgICAgIF90aGlzLmdldFNyYyhlbGVtZW50LCBwaG90b3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qKlxuICAgICAgICAgKuaWsOOBn+OBqumajuWxpOOCkueUn+aIkFxuICAgICAgICBcbiAgICAgICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHBob3Rvc1xuICAgICAgICAgKi9cbiAgICAgICAgUGhvdG9Db2xsYWdlLnByb3RvdHlwZS5wbGFjZVBob3RvID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBob3Rvcykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIC8v5YWo6YOo44Gu6KaB57Sg5raI44GZXG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBhcmVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGhvdG8tbGF5b3V0XCIpO1xuICAgICAgICAgICAgcGhvdG9zLmZvckVhY2goZnVuY3Rpb24gKHBob3RvKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvXCIpO1xuICAgICAgICAgICAgICAgIC8vaW1n44K/44Kw55Sf5oiQXG4gICAgICAgICAgICAgICAgdmFyIGltZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kYXRhLmltZ0NsYXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdFbGVtZW50LmNsYXNzTGlzdC5hZGQoX3RoaXMuZGF0YS5pbWdDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltZ0VsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHBob3RvLnNyYyk7XG4gICAgICAgICAgICAgICAgLy9h44K/44Kw44Gu55Sf5oiQXG4gICAgICAgICAgICAgICAgdmFyIGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRhdGEuYUNsYXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBhRWxlbWVudC5jbGFzc0xpc3QuYWRkKF90aGlzLmRhdGEuYUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBob3RvLmhyZWYgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBwaG90by5ocmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFFbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcGhvdG8uc3JjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRhdGEuYUF0dHJpYnV0ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoX3RoaXMuZGF0YS5hQXR0cmlidXRlKS5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYUVsZW1lbnQuc2V0QXR0cmlidXRlKGRhdGFzWzBdLCBkYXRhc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+OCv+OCsOaMv+WFpVxuICAgICAgICAgICAgICAgIGFFbGVtZW50LmFwcGVuZENoaWxkKGltZ0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5hcHBlbmRDaGlsZChhRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgLy/jg6zjgqTjgqLjgqbjg4jjgqrjg5fjgrfjg6fjg7NcbiAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1hcmdpbiA9IChfYSA9IF90aGlzLmRhdGEubWFyZ2luKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIlwiO1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuc3R5bGUuZ2FwID0gKF9iID0gX3RoaXMuZGF0YS5nYXApICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFwiXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vdWzjgavjgq/jg6njgrnjgpLjgaTjgZHjgabjgIHnuKbmqKrmnprmlbDjgpLliKTliKVcbiAgICAgICAgICAgIGlmIChwaG90b3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBob3Rvc1swXS53aWR0aCA+PSBwaG90b3NbMF0uaGVpZ2h0ICYmIHBob3Rvcy5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGhvdG9jb2xsYWdlWW9rb1wiICsgW3Bob3Rvcy5sZW5ndGhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHBob3Rvc1swXS53aWR0aCA8IHBob3Rvc1swXS5oZWlnaHQgJiYgcGhvdG9zLmxlbmd0aCA8IDUpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwaG90b2NvbGxhZ2VUYXRlXCIgKyBbcGhvdG9zLmxlbmd0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGhvdG9zWzBdLndpZHRoID09PSBwaG90b3NbMF0uaGVpZ2h0ICYmIDIgPCBwaG90b3MubGVuZ3RoICYmIHBob3Rvcy5sZW5ndGggPCA1KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGhvdG9jb2xsYWdlU3F1YXJlXCIgKyBbcGhvdG9zLmxlbmd0aF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGhvdG9zLmxlbmd0aCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZU51bWJlclwiICsgW3Bob3Rvcy5sZW5ndGhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZU1vcmU1XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy91bOOBruS4reOBrmRpduOCkuaMh+WumuOBl+OAgeWFreaemuS7peS4iuOBruaZguOBrnDjgr/jgrDjgafmrovjgormnprmlbDooajnpLpcbiAgICAgICAgICAgIHZhciBwaWN0dXJlcyA9IEFycmF5LmZyb20ocGFyZW50RWxlbWVudC5jaGlsZHJlbik7XG4gICAgICAgICAgICBpZiAocGljdHVyZXMubGVuZ3RoID4gNSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRwaG90b3MgPSBBcnJheS5mcm9tKHBpY3R1cmVzWzRdLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRwaG90b3NbMF0uaW5uZXJIVE1MICs9IFwiPHA+K1wiLmNvbmNhdChwaG90b3MubGVuZ3RoIC0gNSwgXCJcXHU0RUY2PC9wPlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFBob3RvQ29sbGFnZTtcbiAgICB9KCkpO1xuICAgIHdpbmRvdy5QaG90b0NvbGxhZ2UgPSBQaG90b0NvbGxhZ2U7IC8vIHNjcmlwdOOCv+OCsOOBq0pT44KS6KiY6L+w44GZ44KL5aC05ZCI55SoXG4gICAgZXhwb3J0cy5kZWZhdWx0ID0gUGhvdG9Db2xsYWdlOyAvLyBKU+ODleOCoeOCpOODq+OBi+OCieiqreOBv+i+vOOCgOeUqFxufSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSB1c2VkICdtb2R1bGUnIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9