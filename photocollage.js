function layoutDivide() {
    //ul要素の配列を作る
    const elements = document.getElementsByClassName("js-photocollage");
    for (var i = 0; i < elements.length; i++) {
      var children = elements[i].childNodes;
      var parents = elements[i].parentElement;
      parents.classList.add("parents-layout");
      for (var divNumber = 0; divNumber < children.length; divNumber++) {
        if (children[divNumber].nodeName === "#text") {
          elements[i].removeChild(children[divNumber]); //textノードを削除
        }
      }
      //#textがなくなったdivの配列
      for (var n = 0; n < children.length; n++) {
        children[n].classList.add("list");
      }
      console.log(children[5].childNodes);
      if (children.length > 5) {
        children[4].innerHTML += `<p>+${children.length - 5}件</p>`;
      }
    }
  }
  
  window.onload = () => {
    layoutDivide();
  };
  