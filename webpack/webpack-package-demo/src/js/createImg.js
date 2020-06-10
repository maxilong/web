var img = require('../img/image1.jpg');
var imgStyle = require('../css/img.scss');

function Img(){
  var imgs = new Image();
  imgs.src = img;
  imgs.classList.add(imgStyle.active);
  document.body.appendChild(imgs);
}
module.exports = Img