function layoutDivide() {
    //ul要素の配列を作る
    const elements = document.getElementsByClassName("js-photocollage");
    for (var i = 0; i < elements.length; i++) {
      var children = elements[i].childNodes;
      var parents = elements[i].parentElement;
      parents.classList.add("parents-layout");
      for (var divNumber = 0; divNumber < children.length; divNumber++) {
        if (children[divNumber].nodeName === "#text") {
          elements[i].removeChild(children[divNumber]); //子要素の配列からtextノードを削除
        }
      }
      //#textがなくなった子要素の配列)
      let imgrow = elements[i].getElementsByTagName("img");//imgタグの配列
      if (imgrow[0].naturalHeight < imgrow[0].naturalWidth && children.length< 5) {
        elements[i].classList.add("yoko" + [children.length])
      } else if (imgrow[0].naturalWidth < imgrow[0].naturalHeight && children.length< 5) {
        //ulタグのクラス指定
        elements[i].classList.add("tate" + [children.length]);
      } else if(imgrow[0].naturalWidth === imgrow[0].naturalHeight && children.length< 5) {
        //ulタグのクラス指定
        elements[i].classList.add("square" + [children.length]);
      } else if (children.length===5) {
        elements[i].classList.add("number" + [children.length]);
      } else{
        elements[i].classList.add("more5");
      }

      for (var n = 0; n < children.length; n++) {
        children[n].classList.add("list");
      } 

      if (children.length > 5) {
        var display= children[4].childNodes;
        for (var m = 0;m < display.length; m++){
          if(display[m].nodeName === "#text") {
            children[4].removeChild(display[m]);//textノードを削除
          };
        };
        display[0].innerHTML += `<p>+${children.length - 5}件</p>`;
      }
    }
  }
  
  window.onload = () => {
    layoutDivide();
  };
  