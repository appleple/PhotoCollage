/**
 * コンフィグ
 */
interface Config {
  gap: string
  srcAttribute: string
  margin?: string
  imgClass?:string
  aClass?:string
  aAttribute?: { [key:string] : string }
  // 6枚以上のとき5枚目に重ねる残り枚数の表示文言を返す関数。
  // 既定は "+N"（単位なし）。例: (n) => `+${n}件` で「+3件」と表示できる。
  overflowLabel?: (remaining: number) => string
}

/**
 * 画像情報
 */
interface Photo {
  src: string
  href:string
  width:string
  height:string
  alt:string
}

/**
 * 設定初期値
 */
const defaults: Config = {
  gap: "5px",
  srcAttribute: "src",
  margin: "0px 0px 10px 0px",
}

class PhotoCollage {
  selector:string;
  settings:Partial<Config>;
  data: Config;
  elements: NodeListOf<HTMLDivElement>;

  public constructor(selector:string,settings: Partial<Config>) {
    //ユーザーが最終的に選んだ配列のプロパティーを返す
    this.selector = ""
    this.settings = {}
    //ユーザーの設定が反映された配列を変える
    this.data = Object.assign({},defaults,settings)
    //クラス指定した要素すべてを取得
    this.elements = document.querySelectorAll(selector);
    //クラス要素一つ一つに処理
    this.elements.forEach((element) => {
      element.classList.add("photocollage")
      //クラスごとの子要素にある画像をひとまとまりに格納するための配列を作る
      const photos: Photo[] = [];
      //配列の中に画像情報を格納するメソッド
      this.getSrc(element, photos);
      this.placePhoto(element,photos);
    });
  }

  /**
   *深さ優先探査で画像情報取得

   * @param element
   * @param photos
   */
  //親要素elementと木構造にある画像をまとめて格納するための配列を引数とする
  getSrc(element: Element, photos: Photo[]){
    //親要素に対しての子要素を配列にする
    const el = Array.from(element.children)
    //子要素がある分ループする
    el.forEach(element => {
      //子要素の中でユーザーが設定した属性を持つなら
      if (element.hasAttribute(this.data.srcAttribute)) {
        //現段階の要素からみた親要素の中で直近にあるaタグを取得
        const a = element.closest("a")
        //木構造にあった画像情報を格納する
        photos.push({
          src: element.getAttribute(this.data.srcAttribute) ?? "",
          href: a?.getAttribute("href") ?? "",
          width: element.getAttribute("width") ?? "",
          height: element.getAttribute("height") ?? "",
          alt: element.getAttribute("alt") ?? "",
        })
      }
      //深さ優先探査、引数のelementに入る要素が下の階層の要素になっている
      this.getSrc(element, photos);
    });
  }


/**
 *新たな階層を生成

 * @param element
 * @param photos
 */
  placePhoto(element:HTMLDivElement,photos: Photo[]) {
    //画像が1枚も見つからない場合は何もしない（元の内容を壊さない安全策）。
    //srcAttribute の設定ミス等で中身が消える事故を防ぐ。
    if (photos.length === 0) {
      return;
    }
    //全部の要素消す
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
    const parentElement = document.createElement("div");
    parentElement.classList.add("photo-layout");
    photos.forEach((photo) => {
    const childElement = document.createElement("div");
    childElement.classList.add("photo");
    //imgタグ生成
    const imgElement = document.createElement("img");
    if (this.data.imgClass != undefined){
      imgElement.classList.add(this.data.imgClass);
    }
    imgElement.setAttribute("src",photo.src);
    //alt は元画像から引き継ぐ（無い場合は空文字 = 装飾画像扱い）
    imgElement.setAttribute("alt",photo.alt);
    //width/height も引き継ぎ、レイアウトシフト(CLS)を防ぐ
    if (photo.width !== "") {
      imgElement.setAttribute("width",photo.width);
    }
    if (photo.height !== "") {
      imgElement.setAttribute("height",photo.height);
    }
    //aタグの生成
    const aElement = document.createElement("a");
    if (this.data.aClass != undefined){
      aElement.classList.add(this.data.aClass);
    }
    if (photo.href !== "") {
      aElement.setAttribute("href",photo.href);
    }else {
      aElement.setAttribute("href",photo.src);
    }
    if (this.data.aAttribute != undefined){
      Object.entries(this.data.aAttribute).forEach((datas) => {
          aElement.setAttribute(datas[0],datas[1])
      })
    }
    //タグ挿入
    aElement.appendChild(imgElement);
    childElement.appendChild(aElement);

    parentElement.appendChild(childElement);
    element.appendChild(parentElement);
    });
    //レイアウトオプション
    element.style.margin = this.data.margin ?? "";
    parentElement.style.gap = this.data.gap ?? "";
    //ulにクラスをつけて、縦横枚数を判別
    //width/height は属性由来の文字列なので数値化して比較する
    const width = Number(photos[0].width);
    const height = Number(photos[0].height);
    const count = photos.length;
    if (count === 5) {
      parentElement.classList.add("photocollageNumber" + count);
    } else if (count > 5) {
      parentElement.classList.add("photocollageMore5");
    } else if (width === height && count > 2) {
      //正方形（3〜4枚）。横長判定より先に評価しないと到達できない
      parentElement.classList.add("photocollageSquare" + count);
    } else if (width >= height) {
      parentElement.classList.add("photocollageYoko" + count);
    } else {
      parentElement.classList.add("photocollageTate" + count);
    }
    //ulの中のdivを指定し、六枚以上の時のpタグで残り枚数表示
    const pictures = Array.from(parentElement.children);
    if (pictures.length > 5) {
      //5枚目（index 4）の中の a 要素に残り枚数の p を追加する
      const overflowAnchor = pictures[4].children[0];
      if (overflowAnchor) {
        const remaining = photos.length - 5;
        //既定は単位なしの "+N"。overflowLabel 指定時はその戻り値を使う
        const label = this.data.overflowLabel
          ? this.data.overflowLabel(remaining)
          : `+${remaining}`;
        const p = document.createElement("p");
        p.textContent = label;  //innerHTML を使わず安全にテキスト設定
        overflowAnchor.appendChild(p);
      }
    }
    }
  }



window.PhotoCollage = PhotoCollage;  // scriptタグにJSを記述する場合用
export default PhotoCollage; // JSファイルから読み込む用
