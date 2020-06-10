function Header(){
  var oDiv = document.createElement('div');
  oDiv.classList.add('header');
  var oWrap = document.getElementById('wrapper');
  oDiv.innerHTML = 'lala';
  oWrap.appendChild(oDiv);
}

module.exports = Header;