function backtotop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
}

async function getdatafromjwt(jwtToken){
  try {
    const response = await fetch('http://localhost:8080/auth1/details', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`
        }
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', JSON.stringify({"id":data.id,"username": data.username,
          "email": data.email,
          "roles": data.roles,
          "accessToken": data.accessToken,
          "tokenType": data.tokenType
          })
        );
        console.log(data.username);
    } else {
        alert('Failed to fetch user details');
    }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
  }
}

function checkSignIn(){
  const jwtToken = getCookie('jwtToken');
  if (jwtToken) {
      console.log('JWT token is available');
      // console.log(jwtToken);
      showloader();
      const signinFooterDiv = document.querySelector('.signin');
      const usernameHeaderElement = document.getElementById("user_name_header");
      const nameUpdateInAllElement = document.getElementById("all_username");
      const headerSignInElement = document.getElementById("header_signin");

      if (localStorage.getItem('jwtToken') === null) {
          getdatafromjwt(jwtToken);
      }
      if (localStorage.getItem('UserItems') === null) {
          getUserDataFromServer();
      }
      if (localStorage.getItem('CartItems') === null) {
          getCartDataFromServer();
      }

      // Hide the signin footer if present
      if (signinFooterDiv) {
          signinFooterDiv.style.display = "none";
      } else {
          console.log("Element with class .signin not found.");
      }

      // Update the username header if the element is present
      const storedJwt = JSON.parse(localStorage.getItem('jwtToken'));
      if (usernameHeaderElement) {
          usernameHeaderElement.innerHTML = `Hello ${storedJwt.username}`;
      }
      if (nameUpdateInAllElement) {
          nameUpdateInAllElement.innerHTML = `Hello, ${storedJwt.username}`;
      }

      // Update the header signin element to show "Sign Out"
      if (headerSignInElement) {
          headerSignInElement.textContent = "Sign Out";
      }
      setTimeout(function(){
        hideloader();
      }, 500);
    } else {
      // Remove stored items if JWT token is not available
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('UserItems');
      localStorage.removeItem('CartItems');
      console.log('JWT token is not available');
    }
}

function validateCartDiv(){
  const jwtToken = getCookie('jwtToken');
  const cartdiv = document.getElementById("cartItems");
  if (jwtToken) {
    if(cartdiv){
      cartdiv.style.display = "block";
      document.body.style.width= "91.9%";
      loadCartData();
    }
  }
  else{
    console.log('JWT token is not available');
  }
}
function loadPage(pageUrl, value) {
  fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
  })
  .catch(error => {
      console.error('Error fetching page:', error);
      console.log(error);
  });
}
function loadPagep(pageUrl, value) {
  fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      checkSignIn();
      let signinFooterDiv = document.querySelector('.signin');
      if (signinFooterDiv) {
        signinFooterDiv.style.display = "none";
      } else {
          console.log("Element with class .signin not found.");
      }
      adjustWidth();
  })
  .catch(error => {
      console.error('Error fetching page:', error);
      console.log(error);
  });
}
function loadPageh(pageUrl, value) {
  fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      checkSignIn();
      adjustWidth();
      validateCartDiv();
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

function signout(){
  if(getCookie('jwtToken')){
    if(confirm("Are you sure you want to sign out?")){
      deleteCookie('jwtToken');
      localStorage.removeItem('jwtToken');
      try{
        fetch('http://localhost:8080/auth1/logout', {
            method: 'POST'
        })
        .then(data =>{
            console.log("logout success from server");
        })
        .catch(error => {
            console.error('Error:', error);
        });
      } catch (error) {
          console.error('Error:', error);
      }
      window.location.href = "index.html";
    }
  }
  else{
    window.location.href = "signin_page.html";
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
  if(getCookie('jwtToken')){
    window.location.href = "order_return.html";
  }
  else{
    window.location.href = "signin_page.html";
  }
}
function togglerightb(){
  const tglright = document.getElementById("browsing");
  tglright.scrollLeft += 500;
}
function toggleleftb(){
  const tglright = document.getElementById("browsing");
  tglright.scrollLeft -= 500;
}
function draweropt(){
  const drawer = document.getElementById("drawer");
  const overlay = document.getElementById("overlay");
  const drawerbtn = document.querySelector('.closebtn');

  drawer.style.left = "-365px";
  overlay.style.display = "none";
  drawerbtn.classList.remove('visible');
  document.body.style.overflow = "auto";
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
function showloader(){
  const overlay = document.getElementById("overshade");
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
}
function hideloader(){
  const overlay = document.getElementById("overshade");
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
}
function getUserDataFromServer(){
   fetch('http://localhost:8080/user/getUserData', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${getCookie('jwtToken')}`
      }
  })
  .then(response => response.json())
  .then(data => {
      localStorage.setItem('UserItems', JSON.stringify(data));
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
function getCartDataFromServer(){
  fetch('http://localhost:8080/user/cart', {
     method: 'GET',
     headers: {
         'Authorization': `Bearer ${getCookie('jwtToken')}`
     }
  })
  .then(response => response.json())
  .then(data => {
      localStorage.setItem('CartItems', JSON.stringify(data.body));
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
function DeleteFromCart(link){
  try{
    showloader();
    const parentElement = link.closest('.item');
    parentElement.parentNode.removeChild(parentElement);
    setTimeout(function(){
      hideloader();
    }, 500);
  }catch(error){
    console.log(error);
  }
}
function loadCartData() {
  if(localStorage.getItem('CartItems') != null){
      renderCartData(JSON.parse(localStorage.getItem('CartItems')));
  }
  else{
        if(getCartDataFromServer()){
          renderCartData(JSON.parse(localStorage.getItem('CartItems')));
        }
  }
}
function renderCartData(data){
  const cartItems = document.getElementById('cartItems');
  let templateinnerHTML = '';
  data.forEach((item,index)=>{
      item = item.product;
      templateinnerHTML += `
      <div class="ItemsInCart">
          <hr class="hr">
          <div class="cartBarItem">
              <img src="${item.imageUrl}" alt="img" class="ImgeInCart">
              <p>${item.price}</p>
              <div class="cartBarItemInner">
                  <select name="1" id="select" class="categorydropdown" style="padding: 0px 15px; height: 20px;">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                  </select>
                  <span class="quantity" style="padding: 4px; width:15px; height:15px;">
                      <img src="../background_images/trash_icon.png" alt="delete" style="height: 15px; width: 15px;">
                  </span>
              </div>
          </div>
      </div>
      `;
  });
  cartItems.innerHTML = '';
  cartItems.innerHTML += templateinnerHTML;
}
