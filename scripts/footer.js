function backtotop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
}
function checkSignIn(){
  const jwtToken = getCookie('jwtToken');
  if (jwtToken) {
      console.log('JWT token is available');
      const signinFooterDiv = document.querySelector('.signin');
      const usernameupdate = document.getElementById("user_name_header");
      const name_update_in_all = document.getElementById("all_username");
      if (signinFooterDiv) {
          signinFooterDiv.style.display = "none";
      } else {
          console.log("Element with .sigin not found.");
      }
      if(usernameupdate){
         usernameupdate.innerHTML = "Hello "+JSON.parse(localStorage.getItem('jwtToken')).username;
      }
      if(name_update_in_all){
        name_update_in_all.innerHTML = "Hello, "+JSON.parse(localStorage.getItem('jwtToken')).username;
      }
  } else {
      console.log('JWT token is not available');
  }
}

function loadPage(pageUrl, value) {
  fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      checkSignIn();
      adjustWidth();
  })
  .catch(error => {
      console.error('Error fetching page:', error);
      console.log(error);
  });
}

function adjustWidth() {
  var category = document.getElementById("category");
  if (category) {
      var selectedOption = category.options[category.selectedIndex];
      category.style.width = getTextWidth(selectedOption.textContent) + "px";
      // console.log("Width of category is adjusted to: " + category.style.width);
  } else {
      // console.error("Element with id 'category' not found");
  }
}

function getTextWidth(text) {
  var span = document.createElement("span");
  span.textContent = text;
  span.style.visibility = "hidden";
  document.body.appendChild(span);
  var width = span.offsetWidth;
  document.body.removeChild(span);
  return width+36;
}

function siginbtn(){
  if(getCookie('jwtToken')){
    window.location.href = "homepage.html";
  }
  else{
    window.location.href = "signin_page.html";
  }
}


function setCookie(name, value) {
  const date = new Date();
  date.setTime(date.getTime() + 86400000); // 24 hours in milliseconds
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookiesArray = document.cookie.split(';');
  for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i];
      while (cookie.charAt(0) === ' ') cookie = cookie.substring(1, cookie.length);
      if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length, cookie.length);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function orderbtn(){
  // if(getCookie('jwtToken'))
  {
    window.location.href = "order_return.html";
  }
  // else
  // {
  //   window.location.href = "signin_page.html";
  // }
}

function draweropt(){
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const drawerbtn = document.querySelector('.closebtn');

  drawer.style.left = "-365px";
  overlay.style.display = "none";
  drawerbtn.classList.remove('visible');
  document.body.style.overflow = "auto";
  document.html.style.overflow = "auto";
}
function openDrawer(){
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  drawer.style.left = "0";
  overlay.style.display = "block";
  const drawerbtn = document.querySelector('.closebtn');
  drawerbtn.classList.add('visible');
  document.body.style.overflow = "hidden";
  // document.html.style.overflow = "hidden";
}

function dosomething(){
  const sall = document.getElementById("see-all");
  const seeicon = document.getElementById("see-icon");
  const seetext = document.getElementById("see-text");
  if(seeicon.textContent== 'v'){
    seetext.textContent = 'See less';
    seeicon.textContent = '^';
    sall.style.display = "block";
  }
  else{
    seeicon.textContent = 'v';
    sall.style.display = "none";
    seetext.textContent = 'See all';
  }
}