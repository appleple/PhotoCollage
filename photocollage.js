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

      if (children.length > 5) {
        var display= children[4].childNodes;
        for (var m = 0;m < display.length; m++){
          if(display[m].nodeName === "#text") {
            children[4].removeChild(display[m]);//textノードを削除
          };
        };
        display[0].innerHTML += `<p>+${children.length - 5}件</p>`;
        console.log(display);
      }
    }
  }
  
  window.onload = () => {
    layoutDivide();
  };
  