class PhotoCollage {
  public constructor()
  {
    console.log('hello');
  }
}

window.PhotoCollage = PhotoCollage;  // scriptタグにJSを記述する場合用
export default PhotoCollage; // JSファイルから読み込む用
