/**
 * コンフィグ
 */
interface Config {
  gap: string
  srcAttribute: string
  padding?: string
  margin?: string
  imgClass?:string
  aClass?:string
  aAttribute?: { [key:string] : string }
}

/**
 * 画像情報
 */
interface Photo {
  src: string
  href:string
  width:string
  height:string
}

/**
 * 設定初期値
 */
const defaults: Config = {
  gap: "5px",
  srcAttribute: "src",
  padding:"0px"
}

class PhotoCollage {
  selector:string;
  settings:{gap?: string, srcAttribute?: string};
  data: Config;
  elements: NodeListOf<Element>;

  public constructor(selector:string,settings: {gap?: string, srcAttribute?: string}) {
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
  placePhoto(element:Element,photos: Photo[]) {
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
    //画像の幅を真ん中に設定
    parentElement.style.margin = this.data.margin ?? "";
    parentElement.style.padding = this.data.padding ?? "";
    parentElement.style.gap = this.data.gap ?? "";
    });
    //ulにクラスをつけて、縦横枚数を判別
    if (photos.length === 0){
      return;
    }
    if (photos[0].width >= photos[0].height && photos.length < 5) {
      parentElement.classList.add("photocollageYoko" + [photos.length]);
    } else if (photos[0].width < photos[0].height && photos.length < 5) {
      parentElement.classList.add("photocollageTate" + [photos.length]);
    } else if (photos[0].width === photos[0].height && photos.length < 5) {
      parentElement.classList.add("photocollageSquare" + [photos.length]);
    } else if (photos[0].width === photos[0].height && 2 < photos.length) {
      //ここおかしい
      parentElement.classList.add("photocollageSquare" + [photos.length]);
    } else if (photos.length === 5) {
      parentElement.classList.add("photocollageNumber" + [photos.length]);
    } else {
      parentElement.classList.add("photocollageMore5");
    }
    //ulの中のdivを指定し、六枚以上の時のpタグで残り枚数表示
    const pictures = Array.from(parentElement.children);
    if (pictures.length > 5) {
      const targetphotos = Array.from(pictures[4].children);
      targetphotos[0].innerHTML += `<p>+${photos.length - 5}件</p>`;
    }
    }
  }



window.PhotoCollage = PhotoCollage;  // scriptタグにJSを記述する場合用
export default PhotoCollage; // JSファイルから読み込む用
