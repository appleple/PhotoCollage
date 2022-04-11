# PhotoCollage

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/document-outliner/master/LICENSE)

A utility that changes the display method according to the aspect ratio and order of images when uploading multiple images at once.

## Usage
Include the PhotoCollage .js/.css file in your site.
```html
<script src="/path/to/js/photocollage.bundle.js"></script>
```
```html
<link rel="stylesheet" href="/path/to/css/photocollage.css">
```
photocollage.js
```js
document.addEventListener('DOMContentLoaded',function(){
    new PhotoCollage(".js-photocollage");
});
```

jquery-photocollage.js
```js
$(function(){
    $(".js-photocollage").PhotoCollage();
});
```

### Basic Standalone Usage
At the time of five vertically long sheets
```html
<div class="js-photocollage">
  <img src="example1.jpg" width="480" height="640">
  <img src="example2.jpg" width="480" height="640">
  <img src="example3.jpg" width="480" height="640">
  <img src="example4.jpg" width="480" height="640">
  <img src="example5.jpg" width="480" height="640">
</div>
<link rel="stylesheet" href="./css/photocollage.css">
<script src="./js/photocollage.bundle.js"></script>
<script>
document.addEventListener('DOMContentLoaded',function(){
  new PhotoCollage(".js-photocollage");
});
</script>
```

### Option

<table>
	<tr>
		<th>変数名</th>
		<th>説明</th>
		<th>デフォルト値</th>
	</tr>
	<tr>
		<td>gap</td>
		<td>画像間の間隔</td>
		<td>5px</td>
	</tr>
	<tr>
		<td>srcAttribute</td>
		<td>画像ソース</td>
		<td>src</td>
	</tr>
	<tr>
		<td>margin</td>
		<td>アルバムの間隔</td>
		<td>0px 0px 10px 0px</td>
	</tr>
	<tr>
		<td>imgClass</td>
		<td>imgタグのクラス</td>
		<td>なし</td>
	</tr>
	<tr>
		<td>aClass</td>
		<td>aタグのクラス</td>
		<td>なし</td>
	</tr>
	<tr>
		<td>aAttribute</td>
		<td>aタグの属性</td>
		<td>なし</td>
	</tr>
</table>

#### Example
```js
document.addEventListener('DOMContentLoaded',function(){
  new PhotoCollage(".js-photocollage",{
    srcAttribute: "src",
    gap: "5px",
    margin:"0px 0px 20px 0px",
    aClass: "aExampleClass",
    imgClass:"imgExampleClass",
    aAttribute: {
      "data-example1" : "example1",
      "data-example2" : "example2",
    }
  });
});
```

#### When used in combination with SmartPhoto
```js
document.addEventListener('DOMContentLoaded',function(){
        const elements = document.getElementsByClassName('js-photocollage');
        Array.from(elements).forEach((element, index) => {
          element.classList.add('js-photoCollage-' + index)
          new PhotoCollage(".js-photoCollage-" + index,{
          aClass: "js-smartPhoto",
          aAttribute: {
            "data-group": "group-" + index,
            "data-rel": "group-" + index,
          }
        });
        });
        new SmartPhoto(".js-smartPhoto")
});
```
