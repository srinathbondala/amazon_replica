function backtotop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
}

async function getdatafromjwt(jwtToken){
  try {
    const response = await fetch('https://amazon-server-1-27sp.onrender.com/auth1/details', {
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
  try{
  const jwtToken = getCookie('jwtToken');
  if (jwtToken) {
      console.log('JWT token is available');
      // console.log(jwtToken);
      showloader();
      const signinFooterDiv = document.getElementById("signin_footer_div");
      const usernameHeaderElement = document.getElementById("user_name_header");
      const nameUpdateInAllElement = document.getElementById("all_username");
      const headerSignInElement = document.getElementById("header_signin");
      const addressName = document.getElementById("addressName");
      const addressTab = document.getElementById("addressTab");

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
      // Update the address user name if the element is present
      if (addressName && addressTab) {
        let selfId=JSON.parse(localStorage.getItem('UserItems')).defaultAddress;
        let userData = JSON.parse(localStorage.getItem("UserItems")).details;
        if(userData!=null){
          for(let i=0;i<userData.length;i++){
            if(userData[i].id==selfId){
                addressName.innerHTML ="Deliver to " + userData[i].name;
                addressTab.innerHTML = userData[i].city+", "+userData[i].pincode;
                break;
            }
          }
        }
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
  }catch(e){hideloader();}
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
async function loadPage(pageUrl, value) {
  await fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      checkSignIn();
  })
  .catch(error => {
      console.error('Error fetching page:', error);
      console.log(error);
  });
}
async function loadPagep(pageUrl, value) {
  await fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      checkSignIn();
      const jwtToken = getCookie('jwtToken');
      if(!jwtToken){
        let signinFooterDiv = document.querySelector('.signin');
        if (signinFooterDiv) {
          signinFooterDiv.style.display = "none";
        } else {
            console.log("Element with class .signin not found.");
        }
      }
      adjustWidth();
  })
  .catch(error => {
      console.error('Error fetching page:', error);
      console.log(error);
  });
}
async function loadPageh(pageUrl, value) {
  await fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      checkSignIn();
      const jwtToken = getCookie('jwtToken');
      if(!jwtToken){
        let signinFooterDiv = document.querySelector('.signin');
        if (signinFooterDiv) {
          signinFooterDiv.style.display = "none";
        } else {
            console.log("Element with class .signin not found.");
        }
      }
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

async function signout(){
  if(getCookie('jwtToken')){
    if(confirm("Are you sure you want to sign out?")){
      deleteCookie('jwtToken');
      localStorage.removeItem('jwtToken');
      try{
        await fetch('https://amazon-server-1-27sp.onrender.com/auth1/logout', {
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
      window.location.href = "../index.html";
    }
  }
  else{
    window.location.href = "../html_files/signin_page.html";
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
    window.location.href = "../html_files/homepage.html";
  }
  else{
    window.location.href = "../html_files/signin_page.html";
  }
}


function setCookie(name, value,minutes=86400000) {
  const date = new Date();
  date.setTime(date.getTime() +minutes ); // 24 hours in milliseconds
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
    window.location.href = "../html_files/order_return.html";
  }
  else{
    window.location.href = "../html_files/signin_page.html";
  }
}
function togglerightb(slide){
  let tglright = slide.closest(".foot-top1-inner").querySelector(".browsing");//document.getElementById("browsing");
  tglright.scrollLeft += 500;
}
function toggleleftb(slide){
  let tglleft = slide.closest(".foot-top1-inner").querySelector(".browsing"); //document.getElementById("browsing");
  tglleft.scrollLeft -= 500;
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
  scrollTo(0,0);
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
   fetch('https://amazon-server-1-27sp.onrender.com/user/getUserData', {
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
async function getCartDataFromServer(){
  if(!getCookie('jwtToken')) return;
  await fetch('https://amazon-server-1-27sp.onrender.com/user/cart', {
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
function DeleteFromCart(link,productId){
  try{
      showloader();
      const parentElement = link.closest('.item');
      parentElement.parentNode.removeChild(parentElement);
      const cartItems = JSON.parse(localStorage.getItem('CartItems'));
      const index = cartItems.findIndex(item => item.product.id == productId);
      if (index !== -1) {
          cartItems.splice(index, 1);
      }
      localStorage.setItem('CartItems', JSON.stringify(cartItems));
      saveCart();
      setTimeout(function(){
        hideloader();
      }, 500);
  }catch(error){
    console.log(error);
  }
}

async function saveCart() {
  try {
    if(confirm('Are you sure you want to save changes?')){
        showloader();
          let data=[];
          const cartdata=JSON.parse(localStorage.getItem('CartItems'));
          cartdata.forEach((value,index)=>{
              data.push(
                {
                  "productId":value.product.id,
                  "inCart":value.inCart,
                  "quantity":value.quantity
                }
              );
          });
          const response = await fetch('https://amazon-server-1-27sp.onrender.com/user/removeFromCart', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${getCookie('jwtToken')}`
              },
              body: JSON.stringify(data)
          });
  
          if (!response.ok) {
              console.error('Error updating cart:', response.statusText);
          }
          hideloader();
      }
      else{
          alert('Changes not saved');
      }
  } catch (error) {
      console.error('Error:', error);
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
  let total = 0;
  data.forEach((item,index)=>{
      item = item.product;
      templateinnerHTML += `
      <div class="ItemsInCart">
          <hr class="hr">
          <div class="cartBarItem">
               <a href='product_details.html?k=${item.category}&text=${item.id}' ><img src="${item.imageUrl}" alt="img" class="ImgeInCart"> </a>
              <p>${item.price}</p>
          </div>
      </div>
      `;
      total += item.price;
  });
//   <div class="cartBarItemInner">
//   <select name="1" id="select" class="categorydropdown" style="padding: 0px 15px; height: 20px;">
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//       <option value="4">4</option>
//   </select>
//   <span class="quantity" style="padding: 4px; width:15px; height:15px;">
//       <img src="../background_images/trash_icon.png" alt="delete" style="height: 15px; width: 15px;">
//   </span>
// </div>
  cartItems.innerHTML = `
    <div class="cartItemRight-inner">
        <p>Subtotal</p>
        <h2>$ ${total}</h2>
        <input type="button" value="Got to Cart" class="wish_list_btn" style="width: 90%;font-size: 12px;" onclick="window.location.href='../html_files/cart.html'">
    </div>`;
  cartItems.innerHTML += templateinnerHTML+'</div>';
}
function loadSuggesions(suggestedDiv){
  suggestedDiv.innerHTML += `
      <div class="foot-top1">
          <div id="foot-top1-heading">
              <h3>Customers who viewed items in your browsing history also viewed</h3>
              <span>Page 1 of 7</span>
          </div>
          <div class="foot-top1-inner">
              <span class="togglebuttons" style="left:0;" onclick="toggleleftb(this)"> <span><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt=">" class="toggleimgbtn"> </span></span>
              <span class="togglebuttons" style="right: 0;" onclick="togglerightb(this)"><span><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="<" class="toggleimgbtn"></span> </span>
              <div class="fotter-inner-browse">
                  <ul class="browsing">
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Product Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Item Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Merchandise Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Product Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Item Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Merchandise Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Goods Image"></li>
                      <li><img src="https://images-na.ssl-images-amazon.com/images/I/71bcZVEOwqL._AC_UL320_SR320,320_.jpg" alt="Merchandise Photo"></li>
                  </ul>
              </div>
          </div>
      </div>
  `;
  // fetch('https://amazon-server-1-27sp.onrender.com/amazon/data')
  // .then(response => response.json())
  // .then(data => {
  //     loadSuggesionsData(data);
  // })
  // .catch(error => console.error('Error:', error));
}
function loadSuggesionsData(data){
  const browsing = document.getElementById('browsing');
  let templateinnerHTML = '';
  data.forEach((item,index)=>{
      templateinnerHTML += `
      <li><img src="${item.imageUrl}" alt="Product Image"></li>
      `;
  });
  browsing.innerHTML = templateinnerHTML;
}
function stopScroll(){
  window.scrollTo(0, 0);
  document.documentElement.style.overflow = 'hidden';
}
function startScroll(){
  document.documentElement.style.overflow = 'auto';
}

function openAddress(){
   if(getCookie('jwtToken')){
      window.location.href = "../html_files/editDetails.html?parms=Addresses";
   }
}