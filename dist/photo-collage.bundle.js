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
                var _a, _b, _c, _d, _e;
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
                        alt: (_e = element.getAttribute("alt")) !== null && _e !== void 0 ? _e : "",
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
            //画像が1枚も見つからない場合は何もしない（元の内容を壊さない安全策）。
            //srcAttribute の設定ミス等で中身が消える事故を防ぐ。
            if (photos.length === 0) {
                return;
            }
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
                //alt は元画像から引き継ぐ（無い場合は空文字 = 装飾画像扱い）
                imgElement.setAttribute("alt", photo.alt);
                //width/height も引き継ぎ、レイアウトシフト(CLS)を防ぐ
                if (photo.width !== "") {
                    imgElement.setAttribute("width", photo.width);
                }
                if (photo.height !== "") {
                    imgElement.setAttribute("height", photo.height);
                }
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
                //5枚目（index 4）の中の a 要素に残り枚数の p を追加する
                var overflowAnchor = pictures[4].children[0];
                if (overflowAnchor) {
                    var remaining = photos.length - 5;
                    //既定は単位なしの "+N"。overflowLabel 指定時はその戻り値を使う
                    var label = this.data.overflowLabel
                        ? this.data.overflowLabel(remaining)
                        : "+".concat(remaining);
                    var p = document.createElement("p");
                    p.textContent = label; //innerHTML を使わず安全にテキスト設定
                    overflowAnchor.appendChild(p);
                }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhvdG8tY29sbGFnZS5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsaUdBQU8sQ0FBQyxtQkFBUyxFQUFFLE9BQVMsQ0FBQyxtQ0FBRTtBQUMvQjtBQUNBLElBQUksOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCx3Q0FBd0M7QUFDeEMsSUFBSSxrQkFBZSxpQkFBaUI7QUFDcEMsQ0FBQztBQUFBLGtHQUFDOzs7Ozs7O1VDdktGO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9waG90b2NvbGxhZ2UvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGhvdG9jb2xsYWdlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bob3RvY29sbGFnZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3Bob3RvY29sbGFnZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vcGhvdG9jb2xsYWdlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUoW1wicmVxdWlyZVwiLCBcImV4cG9ydHNcIl0sIGZ1bmN0aW9uIChyZXF1aXJlLCBleHBvcnRzKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuICAgIC8qKlxuICAgICAqIOioreWumuWIneacn+WApFxuICAgICAqL1xuICAgIHZhciBkZWZhdWx0cyA9IHtcbiAgICAgICAgZ2FwOiBcIjVweFwiLFxuICAgICAgICBzcmNBdHRyaWJ1dGU6IFwic3JjXCIsXG4gICAgICAgIG1hcmdpbjogXCIwcHggMHB4IDEwcHggMHB4XCIsXG4gICAgfTtcbiAgICB2YXIgUGhvdG9Db2xsYWdlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBQaG90b0NvbGxhZ2Uoc2VsZWN0b3IsIHNldHRpbmdzKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAgICAgLy/jg6bjg7zjgrbjg7zjgYzmnIDntYLnmoTjgavpgbjjgpPjgaDphY3liJfjga7jg5fjg63jg5Hjg4bjgqPjg7zjgpLov5TjgZlcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0b3IgPSBcIlwiO1xuICAgICAgICAgICAgdGhpcy5zZXR0aW5ncyA9IHt9O1xuICAgICAgICAgICAgLy/jg6bjg7zjgrbjg7zjga7oqK3lrprjgYzlj43mmKDjgZXjgozjgZ/phY3liJfjgpLlpInjgYjjgotcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBzZXR0aW5ncyk7XG4gICAgICAgICAgICAvL+OCr+ODqeOCueaMh+WumuOBl+OBn+imgee0oOOBmeOBueOBpuOCkuWPluW+l1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgLy/jgq/jg6njgrnopoHntKDkuIDjgaTkuIDjgaTjgavlh6bnkIZcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZVwiKTtcbiAgICAgICAgICAgICAgICAvL+OCr+ODqeOCueOBlOOBqOOBruWtkOimgee0oOOBq+OBguOCi+eUu+WDj+OCkuOBsuOBqOOBvuOBqOOBvuOCiuOBq+agvOe0jeOBmeOCi+OBn+OCgeOBrumFjeWIl+OCkuS9nOOCi1xuICAgICAgICAgICAgICAgIHZhciBwaG90b3MgPSBbXTtcbiAgICAgICAgICAgICAgICAvL+mFjeWIl+OBruS4reOBq+eUu+WDj+aDheWgseOCkuagvOe0jeOBmeOCi+ODoeOCveODg+ODiVxuICAgICAgICAgICAgICAgIF90aGlzLmdldFNyYyhlbGVtZW50LCBwaG90b3MpO1xuICAgICAgICAgICAgICAgIF90aGlzLnBsYWNlUGhvdG8oZWxlbWVudCwgcGhvdG9zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKua3seOBleWEquWFiOaOouafu+OBp+eUu+WDj+aDheWgseWPluW+l1xuICAgICAgXG4gICAgICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSBwaG90b3NcbiAgICAgICAgICovXG4gICAgICAgIC8v6Kaq6KaB57SgZWxlbWVudOOBqOacqOani+mAoOOBq+OBguOCi+eUu+WDj+OCkuOBvuOBqOOCgeOBpuagvOe0jeOBmeOCi+OBn+OCgeOBrumFjeWIl+OCkuW8leaVsOOBqOOBmeOCi1xuICAgICAgICBQaG90b0NvbGxhZ2UucHJvdG90eXBlLmdldFNyYyA9IGZ1bmN0aW9uIChlbGVtZW50LCBwaG90b3MpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAvL+imquimgee0oOOBq+WvvuOBl+OBpuOBruWtkOimgee0oOOCkumFjeWIl+OBq+OBmeOCi1xuICAgICAgICAgICAgdmFyIGVsID0gQXJyYXkuZnJvbShlbGVtZW50LmNoaWxkcmVuKTtcbiAgICAgICAgICAgIC8v5a2Q6KaB57Sg44GM44GC44KL5YiG44Or44O844OX44GZ44KLXG4gICAgICAgICAgICBlbC5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2MsIF9kLCBfZTtcbiAgICAgICAgICAgICAgICAvL+WtkOimgee0oOOBruS4reOBp+ODpuODvOOCtuODvOOBjOioreWumuOBl+OBn+WxnuaAp+OCkuaMgeOBpOOBquOCiVxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50Lmhhc0F0dHJpYnV0ZShfdGhpcy5kYXRhLnNyY0F0dHJpYnV0ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy/nj77mrrXpmo7jga7opoHntKDjgYvjgonjgb/jgZ/opqropoHntKDjga7kuK3jgafnm7Tov5HjgavjgYLjgoth44K/44Kw44KS5Y+W5b6XXG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gZWxlbWVudC5jbG9zZXN0KFwiYVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy/mnKjmp4vpgKDjgavjgYLjgaPjgZ/nlLvlg4/mg4XloLHjgpLmoLzntI3jgZnjgotcbiAgICAgICAgICAgICAgICAgICAgcGhvdG9zLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiAoX2EgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShfdGhpcy5kYXRhLnNyY0F0dHJpYnV0ZSkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBocmVmOiAoX2IgPSBhID09PSBudWxsIHx8IGEgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGEuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAoX2MgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIndpZHRoXCIpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiAoX2QgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImhlaWdodFwiKSkgIT09IG51bGwgJiYgX2QgIT09IHZvaWQgMCA/IF9kIDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsdDogKF9lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJhbHRcIikpICE9PSBudWxsICYmIF9lICE9PSB2b2lkIDAgPyBfZSA6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL+a3seOBleWEquWFiOaOouafu+OAgeW8leaVsOOBrmVsZW1lbnTjgavlhaXjgovopoHntKDjgYzkuIvjga7pmo7lsaTjga7opoHntKDjgavjgarjgaPjgabjgYTjgotcbiAgICAgICAgICAgICAgICBfdGhpcy5nZXRTcmMoZWxlbWVudCwgcGhvdG9zKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICAvKipcbiAgICAgICAgICrmlrDjgZ/jgarpmo7lsaTjgpLnlJ/miJBcbiAgICAgICAgXG4gICAgICAgICAqIEBwYXJhbSBlbGVtZW50XG4gICAgICAgICAqIEBwYXJhbSBwaG90b3NcbiAgICAgICAgICovXG4gICAgICAgIFBob3RvQ29sbGFnZS5wcm90b3R5cGUucGxhY2VQaG90byA9IGZ1bmN0aW9uIChlbGVtZW50LCBwaG90b3MpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAgICAgLy/nlLvlg4/jgYwx5p6a44KC6KaL44Gk44GL44KJ44Gq44GE5aC05ZCI44Gv5L2V44KC44GX44Gq44GE77yI5YWD44Gu5YaF5a6544KS5aOK44GV44Gq44GE5a6J5YWo562W77yJ44CCXG4gICAgICAgICAgICAvL3NyY0F0dHJpYnV0ZSDjga7oqK3lrprjg5/jgrnnrYnjgafkuK3ouqvjgYzmtojjgYjjgovkuovmlYXjgpLpmLLjgZDjgIJcbiAgICAgICAgICAgIGlmIChwaG90b3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy/lhajpg6jjga7opoHntKDmtojjgZlcbiAgICAgICAgICAgIHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcGFyZW50RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwaG90by1sYXlvdXRcIik7XG4gICAgICAgICAgICBwaG90b3MuZm9yRWFjaChmdW5jdGlvbiAocGhvdG8pIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBjaGlsZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvXCIpO1xuICAgICAgICAgICAgICAgIC8vaW1n44K/44Kw55Sf5oiQXG4gICAgICAgICAgICAgICAgdmFyIGltZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICAgICAgICAgIGlmIChfdGhpcy5kYXRhLmltZ0NsYXNzICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpbWdFbGVtZW50LmNsYXNzTGlzdC5hZGQoX3RoaXMuZGF0YS5pbWdDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGltZ0VsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHBob3RvLnNyYyk7XG4gICAgICAgICAgICAgICAgLy9hbHQg44Gv5YWD55S75YOP44GL44KJ5byV44GN57aZ44GQ77yI54Sh44GE5aC05ZCI44Gv56m65paH5a2XID0g6KOF6aO+55S75YOP5omx44GE77yJXG4gICAgICAgICAgICAgICAgaW1nRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgcGhvdG8uYWx0KTtcbiAgICAgICAgICAgICAgICAvL3dpZHRoL2hlaWdodCDjgoLlvJXjgY3ntpnjgY7jgIHjg6zjgqTjgqLjgqbjg4jjgrfjg5Xjg4goQ0xTKeOCkumYsuOBkFxuICAgICAgICAgICAgICAgIGlmIChwaG90by53aWR0aCAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpbWdFbGVtZW50LnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHBob3RvLndpZHRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHBob3RvLmhlaWdodCAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBpbWdFbGVtZW50LnNldEF0dHJpYnV0ZShcImhlaWdodFwiLCBwaG90by5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL2Hjgr/jgrDjga7nlJ/miJBcbiAgICAgICAgICAgICAgICB2YXIgYUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZGF0YS5hQ2xhc3MgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGFFbGVtZW50LmNsYXNzTGlzdC5hZGQoX3RoaXMuZGF0YS5hQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocGhvdG8uaHJlZiAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICBhRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHBob3RvLmhyZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBwaG90by5zcmMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuZGF0YS5hQXR0cmlidXRlICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3QuZW50cmllcyhfdGhpcy5kYXRhLmFBdHRyaWJ1dGUpLmZvckVhY2goZnVuY3Rpb24gKGRhdGFzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhRWxlbWVudC5zZXRBdHRyaWJ1dGUoZGF0YXNbMF0sIGRhdGFzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8v44K/44Kw5oy/5YWlXG4gICAgICAgICAgICAgICAgYUVsZW1lbnQuYXBwZW5kQ2hpbGQoaW1nRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50LmFwcGVuZENoaWxkKGFFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hcHBlbmRDaGlsZChwYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy/jg6zjgqTjgqLjgqbjg4jjgqrjg5fjgrfjg6fjg7NcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUubWFyZ2luID0gKF9hID0gdGhpcy5kYXRhLm1hcmdpbikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogXCJcIjtcbiAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuc3R5bGUuZ2FwID0gKF9iID0gdGhpcy5kYXRhLmdhcCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogXCJcIjtcbiAgICAgICAgICAgIC8vdWzjgavjgq/jg6njgrnjgpLjgaTjgZHjgabjgIHnuKbmqKrmnprmlbDjgpLliKTliKVcbiAgICAgICAgICAgIC8vd2lkdGgvaGVpZ2h0IOOBr+WxnuaAp+eUseadpeOBruaWh+Wtl+WIl+OBquOBruOBp+aVsOWApOWMluOBl+OBpuavlOi8g+OBmeOCi1xuICAgICAgICAgICAgdmFyIHdpZHRoID0gTnVtYmVyKHBob3Rvc1swXS53aWR0aCk7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gTnVtYmVyKHBob3Rvc1swXS5oZWlnaHQpO1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gcGhvdG9zLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjb3VudCA9PT0gNSkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZU51bWJlclwiICsgY291bnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY291bnQgPiA1KSB7XG4gICAgICAgICAgICAgICAgcGFyZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicGhvdG9jb2xsYWdlTW9yZTVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh3aWR0aCA9PT0gaGVpZ2h0ICYmIGNvdW50ID4gMikge1xuICAgICAgICAgICAgICAgIC8v5q2j5pa55b2i77yIM+OAnDTmnprvvInjgILmqKrplbfliKTlrprjgojjgorlhYjjgavoqZXkvqHjgZfjgarjgYTjgajliLDpgZTjgafjgY3jgarjgYRcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwaG90b2NvbGxhZ2VTcXVhcmVcIiArIGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHdpZHRoID49IGhlaWdodCkge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZVlva29cIiArIGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBob3RvY29sbGFnZVRhdGVcIiArIGNvdW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vdWzjga7kuK3jga5kaXbjgpLmjIflrprjgZfjgIHlha3mnprku6XkuIrjga7mmYLjga5w44K/44Kw44Gn5q6L44KK5p6a5pWw6KGo56S6XG4gICAgICAgICAgICB2YXIgcGljdHVyZXMgPSBBcnJheS5mcm9tKHBhcmVudEVsZW1lbnQuY2hpbGRyZW4pO1xuICAgICAgICAgICAgaWYgKHBpY3R1cmVzLmxlbmd0aCA+IDUpIHtcbiAgICAgICAgICAgICAgICAvLzXmnprnm67vvIhpbmRleCA077yJ44Gu5Lit44GuIGEg6KaB57Sg44Gr5q6L44KK5p6a5pWw44GuIHAg44KS6L+95Yqg44GZ44KLXG4gICAgICAgICAgICAgICAgdmFyIG92ZXJmbG93QW5jaG9yID0gcGljdHVyZXNbNF0uY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJmbG93QW5jaG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSBwaG90b3MubGVuZ3RoIC0gNTtcbiAgICAgICAgICAgICAgICAgICAgLy/ml6Llrprjga/ljZjkvY3jgarjgZfjga4gXCIrTlwi44CCb3ZlcmZsb3dMYWJlbCDmjIflrprmmYLjga/jgZ3jga7miLvjgorlgKTjgpLkvb/jgYZcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhYmVsID0gdGhpcy5kYXRhLm92ZXJmbG93TGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5kYXRhLm92ZXJmbG93TGFiZWwocmVtYWluaW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIitcIi5jb25jYXQocmVtYWluaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcC50ZXh0Q29udGVudCA9IGxhYmVsOyAvL2lubmVySFRNTCDjgpLkvb/jgo/jgZrlronlhajjgavjg4bjgq3jgrnjg4joqK3lrppcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmZsb3dBbmNob3IuYXBwZW5kQ2hpbGQocCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUGhvdG9Db2xsYWdlO1xuICAgIH0oKSk7XG4gICAgd2luZG93LlBob3RvQ29sbGFnZSA9IFBob3RvQ29sbGFnZTsgLy8gc2NyaXB044K/44Kw44GrSlPjgpLoqJjov7DjgZnjgovloLTlkIjnlKhcbiAgICBleHBvcnRzLmRlZmF1bHQgPSBQaG90b0NvbGxhZ2U7IC8vIEpT44OV44Kh44Kk44Or44GL44KJ6Kqt44G/6L6844KA55SoXG59KTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIHVzZWQgJ21vZHVsZScgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=