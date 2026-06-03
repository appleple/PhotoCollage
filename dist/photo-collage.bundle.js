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
            var _a, _b;
            //全部の要素消す
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            var parentElement = document.createElement("div");
            parentElement.classList.add("photo-layout");
            photos.forEach(function (photo) {
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
            });
            //レイアウトオプション
            element.style.margin = (_a = this.data.margin) !== null && _a !== void 0 ? _a : "";
            parentElement.style.gap = (_b = this.data.gap) !== null && _b !== void 0 ? _b : "";
            //ulにクラスをつけて、縦横枚数を判別
            if (photos.length === 0) {
                return;
            }
            //width/height は属性由来の文字列なので数値化して比較する
            var width = Number(photos[0].width);
            var height = Number(photos[0].height);
            var count = photos.length;
            if (count === 5) {
                parentElement.classList.add("photocollageNumber" + count);
            }
            else if (count > 5) {
                parentElement.classList.add("photocollageMore5");
            }
            else if (width === height && count > 2) {
                //正方形（3〜4枚）。横長判定より先に評価しないと到達できない
                parentElement.classList.add("photocollageSquare" + count);
            }
            else if (width >= height) {
                parentElement.classList.add("photocollageYoko" + count);
            }
            else {
                parentElement.classList.add("photocollageTate" + count);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG8tY29sbGFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaUdBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsQ0FBQyxtQ0FBRTtBQUMvQjtBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHdDQUF3QztBQUN4QyxJQUFJLGtCQUFlLGlCQUFpQjtBQUNwQyxDQUFDO0FBQUEsa0dBQUM7Ozs7Ozs7VUNqSkY7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVRXRCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3Bob3RvY29sbGFnZS8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9waG90b2NvbGxhZ2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGhvdG9jb2xsYWdlL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vcGhvdG9jb2xsYWdlL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9waG90b2NvbGxhZ2Uvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImRlZmluZShbXCJyZXF1aXJlXCIsIFwiZXhwb3J0c1wiXSwgZnVuY3Rpb24gKHJlcXVpcmUsIGV4cG9ydHMpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG4gICAgLyoqXG4gICAgICog6Kit5a6a5Yid5pyf5YCkXG4gICAgICovXG4gICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICBnYXA6IFwiNXB4XCIsXG4gICAgICAgIHNyY0F0dHJpYnV0ZTogXCJzcmNcIixcbiAgICAgICAgbWFyZ2luOiBcIjBweCAwcHggMTBweCAwcHhcIixcbiAgICB9O1xuICAgIHZhciBQaG90b0NvbGxhZ2UgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFBob3RvQ29sbGFnZShzZWxlY3Rvciwgc2V0dGluZ3MpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAvL+ODpuODvOOCtuODvOOBjOacgOe1gueahOOBq+mBuOOCk+OBoOmFjeWIl+OBruODl+ODreODkeODhuOCo+ODvOOCkui/lOOBmVxuICAgICAgICAgICAgdGhpcy5zZWxlY3RvciA9IFwiXCI7XG4gICAgICAgICAgICB0aGlzLnNldHRpbmdzID0ge307XG4gICAgICAgICAgICAvL+ODpuODvOOCtuODvOOBruioreWumuOBjOWPjeaYoOOBleOCjOOBn+mFjeWIl+OCkuWkieOBiOOCi1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIHNldHRpbmdzKTtcbiAgICAgICAgICAgIC8v44Kv44Op44K55oyH5a6a44GX44Gf6KaB57Sg44GZ44G544Gm44KS5Y+W5b6XXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAvL+OCr+ODqeOCueimgee0oOS4gOOBpOS4gOOBpOOBq+WHpueQhlxuICAgICAgICAgICAgdGhpcy5lbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGhvdG9jb2xsYWdlXCIpO1xuICAgICAgICAgICAgICAgIC8v44Kv44Op44K544GU44Go44Gu5a2Q6KaB57Sg44Gr44GC44KL55S75YOP44KS44Gy44Go44G+44Go44G+44KK44Gr5qC857SN44GZ44KL44Gf44KB44Gu6YWN5YiX44KS5L2c44KLXG4gICAgICAgICAgICAgICAgdmFyIHBob3RvcyA9IFtdO1xuICAgICAgICAgICAgICAgIC8v6YWN5YiX44Gu5Lit44Gr55S75YOP5oOF5aCx44KS5qC857SN44GZ44KL44Oh44K944OD44OJXG4gICAgICAgICAgICAgICAgX3RoaXMuZ2V0U3JjKGVsZW1lbnQsIHBob3Rvcyk7XG4gICAgICAgICAgICAgICAgX3RoaXMucGxhY2VQaG90byhlbGVtZW50LCBwaG90b3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqXG4gICAgICAgICAq5rex44GV5YSq5YWI5o6i5p+744Gn55S75YOP5oOF5aCx5Y+W5b6XXG4gICAgICBcbiAgICAgICAgICogQHBhcmFtIGVsZW1lbnRcbiAgICAgICAgICogQHBhcmFtIHBob3Rvc1xuICAgICAgICAgKi9cbiAgICAgICAgLy/opqropoHntKBlbGVtZW5044Go5pyo5qeL6YCg44Gr44GC44KL55S75YOP44KS44G+44Go44KB44Gm5qC857SN44GZ44KL44Gf44KB44Gu6YWN5YiX44KS5byV5pWw44Go44GZ44KLXG4gICAgICAgIFBob3RvQ29sbGFnZS5wcm90b3R5cGUuZ2V0U3JjID0gZnVuY3Rpb24gKGVsZW1lbnQsIHBob3Rvcykge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgICAgIC8v6Kaq6KaB57Sg44Gr5a++44GX44Gm44Gu5a2Q6KaB57Sg44KS6YWN5YiX44Gr44GZ44KLXG4gICAgICAgICAgICB2YXIgZWwgPSBBcnJheS5mcm9tKGVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgLy/lrZDopoHntKDjgYzjgYLjgovliIbjg6vjg7zjg5fjgZnjgotcbiAgICAgICAgICAgIGVsLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2Q7XG4gICAgICAgICAgICAgICAgLy/lrZDopoHntKDjga7kuK3jgafjg6bjg7zjgrbjg7zjgYzoqK3lrprjgZfjgZ/lsZ7mgKfjgpLmjIHjgaTjgarjgolcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoX3RoaXMuZGF0YS5zcmNBdHRyaWJ1dGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v54++5q616ZqO44Gu6KaB57Sg44GL44KJ44G/44Gf6Kaq6KaB57Sg44Gu5Lit44Gn55u06L+R44Gr44GC44KLYeOCv+OCsOOCkuWPluW+l1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IGVsZW1lbnQuY2xvc2VzdChcImFcIik7XG4gICAgICAgICAgICAgICAgICAgIC8v5pyo5qeL6YCg44Gr44GC44Gj44Gf55S75YOP5oOF5aCx44KS5qC857SN44GZ44KLXG4gICAgICAgICAgICAgICAgICAgIHBob3Rvcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogKF9hID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoX3RoaXMuZGF0YS5zcmNBdHRyaWJ1dGUpKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaHJlZjogKF9iID0gYSA9PT0gbnVsbCB8fCBhID09PSB2b2lkIDAgPyB2b2lkIDAgOiBhLmdldEF0dHJpYnV0ZShcImhyZWZcIikpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogKF9jID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKSkgIT09IG51bGwgJiYgX2MgIT09IHZvaWQgMCA/IF9jIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogKF9kID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIikpICE9PSBudWxsICYmIF9kICE9PSB2b2lkIDAgPyBfZCA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+a3seOBleWEquWFiOaOouafu+OAgeW8leaVsOOBrmVsZW1lbnTjgavlhaXjgovopoHntKDjgYzkuIvjga7pmo7lsaTjga7opoHntKDjgavjgarjgaPjgabjgYTjgotcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRTcmMoZWxlbWVudCwgcGhvdG9zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICrmlrDjgZ/jgarpmo7lsaTjgpLnlJ/miJBcbiAgICAgICAgXG4gICAgICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSBwaG90b3NcbiAgICAgICAgICovXG4gICAgICAgIFBob3RvQ29sbGFnZS5wcm90b3R5cGUucGxhY2VQaG90byA9IGZ1bmN0aW9uIChlbGVtZW50LCBwaG90b3MpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgLy/lhajpg6jjga7opoHntKDmtojjgZlcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwaG90by1sYXlvdXRcIik7XG4gICAgICAgICAgICBwaG90b3MuZm9yRWFjaChmdW5jdGlvbiAocGhvdG8pIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvXCIpO1xuICAgICAgICAgICAgICAgIC8vaW1n44K/44Kw55Sf5oiQXG4gICAgICAgICAgICAgICAgdmFyIGltZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kYXRhLmltZ0NsYXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdFbGVtZW50LmNsYXNzTGlzdC5hZGQoX3RoaXMuZGF0YS5pbWdDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltZ0VsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHBob3RvLnNyYyk7XG4gICAgICAgICAgICAgICAgLy9h44K/44Kw44Gu55Sf5oiQXG4gICAgICAgICAgICAgICAgdmFyIGFFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRhdGEuYUNsYXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBhRWxlbWVudC5jbGFzc0xpc3QuYWRkKF90aGlzLmRhdGEuYUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBob3RvLmhyZWYgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBwaG90by5ocmVmKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFFbGVtZW50LnNldEF0dHJpYnV0ZShcImhyZWZcIiwgcGhvdG8uc3JjKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmRhdGEuYUF0dHJpYnV0ZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmVudHJpZXMoX3RoaXMuZGF0YS5hQXR0cmlidXRlKS5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYUVsZW1lbnQuc2V0QXR0cmlidXRlKGRhdGFzWzBdLCBkYXRhc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+OCv+OCsOaMv+WFpVxuICAgICAgICAgICAgICAgIGFFbGVtZW50LmFwcGVuZENoaWxkKGltZ0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5hcHBlbmRDaGlsZChhRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZEVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYXBwZW5kQ2hpbGQocGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8v44Os44Kk44Ki44Km44OI44Kq44OX44K344On44OzXG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLm1hcmdpbiA9IChfYSA9IHRoaXMuZGF0YS5tYXJnaW4pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiXCI7XG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LnN0eWxlLmdhcCA9IChfYiA9IHRoaXMuZGF0YS5nYXApICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IFwiXCI7XG4gICAgICAgICAgICAvL3Vs44Gr44Kv44Op44K544KS44Gk44GR44Gm44CB57im5qiq5p6a5pWw44KS5Yik5YilXG4gICAgICAgICAgICBpZiAocGhvdG9zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vd2lkdGgvaGVpZ2h0IOOBr+WxnuaAp+eUseadpeOBruaWh+Wtl+WIl+OBquOBruOBp+aVsOWApOWMluOBl+OBpuavlOi8g+OBmeOCi1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gTnVtYmVyKHBob3Rvc1swXS53aWR0aCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gTnVtYmVyKHBob3Rvc1swXS5oZWlnaHQpO1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gcGhvdG9zLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZU51bWJlclwiICsgY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY291bnQgPiA1KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGhvdG9jb2xsYWdlTW9yZTVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3aWR0aCA9PT0gaGVpZ2h0ICYmIGNvdW50ID4gMikge1xuICAgICAgICAgICAgICAgIC8v5q2j5pa55b2i77yIM+OAnDTmnprvvInjgILmqKrplbfliKTlrprjgojjgorlhYjjgavoqZXkvqHjgZfjgarjgYTjgajliLDpgZTjgafjgY3jgarjgYRcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwaG90b2NvbGxhZ2VTcXVhcmVcIiArIGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZHRoID49IGhlaWdodCkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZVlva29cIiArIGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZVRhdGVcIiArIGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdWzjga7kuK3jga5kaXbjgpLmjIflrprjgZfjgIHlha3mnprku6XkuIrjga7mmYLjga5w44K/44Kw44Gn5q6L44KK5p6a5pWw6KGo56S6XG4gICAgICAgICAgICB2YXIgcGljdHVyZXMgPSBBcnJheS5mcm9tKHBhcmVudEVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgaWYgKHBpY3R1cmVzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0cGhvdG9zID0gQXJyYXkuZnJvbShwaWN0dXJlc1s0XS5jaGlsZHJlbik7XG4gICAgICAgICAgICAgICAgdGFyZ2V0cGhvdG9zWzBdLmlubmVySFRNTCArPSBcIjxwPitcIi5jb25jYXQocGhvdG9zLmxlbmd0aCAtIDUsIFwiXFx1NEVGNjwvcD5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBQaG90b0NvbGxhZ2U7XG4gICAgfSgpKTtcbiAgICB3aW5kb3cuUGhvdG9Db2xsYWdlID0gUGhvdG9Db2xsYWdlOyAvLyBzY3JpcHTjgr/jgrDjgatKU+OCkuiomOi/sOOBmeOCi+WgtOWQiOeUqFxuICAgIGV4cG9ydHMuZGVmYXVsdCA9IFBob3RvQ29sbGFnZTsgLy8gSlPjg5XjgqHjgqTjg6vjgYvjgonoqq3jgb/ovrzjgoDnlKhcbn0pO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgdXNlZCAnbW9kdWxlJyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC50c1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==