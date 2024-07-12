window.onload = function() {
    loadPage('../html_files/footer-template.html', footerDiv);
    loadPagep('../html_files/template.html', contentDiv );
    // renderCartData(cartData);
    // loadCartData();
    if(getCookie('jwtToken')){
        // renderCartData(cartData);
        loadCartDataC();
        
        loadSuggesions(suggestedDiv);
        setTimeout(()=>{
            document.getElementById("checkform").reset();
        },500);
    }
    else{
        document.querySelector('cartleftbottom').innerHTML = "";
        document.querySelector('cartrighttop').style.display = "none";
        document.querySelector('cartlefttop').innerHTML=`<div class="aline-div-cartTop">
        <img src="../background_images/kettle-desaturated.svg" alt=":)" style="width:275px;">
        <div class="faint-top">
            <h2>Your Amazon Cart is empty</h2>
            <a href="../html_files/slider-page.html?text=deals"style="margin-top:5px;">Shop today's deals</a>
            <div class="faint-div">
                <input type="button" value="Sign in to your account" class="btn" style="font-size: 15px; padding: 6px 12px;" onclick="window.location.href='signin_page.html';">
                <input type="button" value="Sign up now" class="wish_list_btn" style="font-size: 15px; height:30px; width:100px; margin-top: 20px;" onclick="window.location.href='signup.html';">
            </div>
        </div>
    </div>`;
    }
}
var totalSelected=0;
var selectedItems = new Set();
const suggestedDiv=document.getElementById('suggestions');
const cartData = [
    {
      id: 'item1',
      name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
      description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
      price: '$18.93',
      inStock: true,
      image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg"
      // Add other properties as needed
    },
    {
        id: 'item1',
        name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
        description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
        price: '$18.93',
        inStock: true,
        image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg",
        status: "STL",
        category:"kitchen",
        id:"1122345678"
    },
    {
        id: 'item1',
        name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
        description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
        price: '$18.93',
        inStock: true,
        image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg"
        // Add other properties as needed
      },
      {
          id: 'item1',
          name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
          description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
          price: '$18.93',
          inStock: true,
          image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg",
          status: "STL",
          category:"kitchen",
          id:"1122345678"
    },{
        id: 'item1',
        name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
        description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
        price: '$18.93',
        inStock: true,
        image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg"
        // Add other properties as needed
      },
      {
          id: 'item1',
          name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
          description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
          price: '$18.93',
          inStock: true,
          image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg",
          status: "STL",
          category:"kitchen",
          id:"1122345678"
        },
        {
            id: 'item1',
            name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
            description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
            price: '$18.93',
            inStock: true,
            image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg"
            // Add other properties as needed
          },
          {
              id: 'item1',
              name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
              description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
              price: '$18.93',
              inStock: true,
              image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg",
              status: "STL",
              category:"kitchen",
              id:"1122345678"
          },
          {
              id: 'item1',
              name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
              description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
              price: '$18.93',
              inStock: true,
              image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg"
              // Add other properties as needed
            },
            {
                id: 'item1',
                name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
                description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
                price: '$18.93',
                inStock: true,
                image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg",
                status: "STL",
                category:"kitchen",
                id:"1122345678"
          },{
              id: 'item1',
              name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
              description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
              price: '$18.93',
              inStock: true,
              image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg"
              // Add other properties as needed
            },
            {
                id: 'item1',
                name: 'Vegetable Chopper, Pro Onion Chopper, Multifunctional 13 in 1 Food Chopper, Kitchen Vegetable Slicer Dicer Cutter,Veggie Chopper With',
                description: 'Elite Onion Chopper, Multifunctional Food Chopper...',
                price: '$18.93',
                inStock: true,
                image: "https://m.media-amazon.com/images/I/81vSkLUx-pL._AC_AA360_.jpg",
                status: "STL",
                category:"kitchen",
                id:"1122345678"
              }
  ];
var val=1;
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');

async function loadCartDataC() {
    if(localStorage.getItem('CartItems') != null){
        renderCartDataC(JSON.parse(localStorage.getItem('CartItems')));
    }
    else{
        await getCartDataFromServer();
        renderCartDataC(JSON.parse(localStorage.getItem('CartItems')));
    }
}
function dosome(){
    if(confirm("Do you want to delete Item from cart")){
        saveCart();
    }
}
function renderCartDataC(data) {
    if(data && data.length !== 0) {
        const shoppingCartContainer = document.querySelector('.shopping-cart');

        shoppingCartContainer.innerHTML = '';

        const upperPart = `
            <div style="padding-left: 10px; padding-right: 10px; display: flex; flex-direction: column;">
                <div class="divadj">
                    <h2 class="heading">Shopping Cart</h2>
                    <button class="wish_list_btn" style="font-size:14px; width:150px;" onclick="dosome();">Save Changes</button>
                </div>
                <span class="atype" style="width:max-content;">Deselect all items</span>
                <span style="font-size:14px; align-self: flex-end; color: #5b5959; margin-bottom: 10px;">Price</span><hr>
            </div>
        `;
        shoppingCartContainer.innerHTML = upperPart;
        var itemDivform = document.createElement('form');
        itemDivform.setAttribute("id","checkform");
        // shoppingCartContainer.appendChild(itemDivform);
        let total = 0;
        let cnt=0,totcnt=0;
        let sumary="";
        data.forEach((item, index) => {
            if (!item.inCart) {
                const stldiv = document.querySelector('.savelater');
                if(val==1){
                    stldiv.innerHTML="";
                    val=0;  
                }
                stldiv.innerHTML +=`
                <div class="savelateritem">
                    <div class="savelateritem-img-container">
                        <a href='product_details.html?k=${item.product.category}&text=${item.product.id}' class="savelateritem-img-container"> <img src="${item.image}" class="savelateritem-img" alt=""></a>
                    </div>
                    <div class="savelateritem-details">
                        <a href='product_details.html?k=${item.product.category}&text=${item.id}' class="savelateritem-h3">${item.name}</a>
                        <div  class="savelateritem-price-div">
                            <span class="savelateritem-price">"$ "+${item.product.price}</span>
                        </div>
                        <p class="savelateritem-stoct">${item.product.inStock ? 'In Stock' : 'Out of Stock'}</p>
                        <button  class="wish_list_btn"> Add to Wish List</button>
                        <p class="a" onclick="deleteslt(this)">Delete</p>
                        <p class="a" onclick="">Add to list</p>
                    </div>
                </div>
                `;
            } else {
                var item1=item;
                item= item.product;
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                itemDiv.innerHTML = `
                <input type="checkbox" id="item${index + 1}" name="item${index + 1}" quantity="${item1.quantity}" onclick="updateTotal(this,'${item.price}','${item.title}','${item.id}');" class="innerCheck">
                <label for="item${index + 1}" class="item-inner-div">
                    <span class="item-inner">
                        <div class="item-inner-div">
                            <a href="product_details.html?k=${item.category}&text=${item.id}"><img src="${item.imageUrl}" alt="item${index + 1}" class="item-inner-div-img"> </a>
                            <div class="items-div">
                                <div class="items-div-left">
                                    <a href="product_details.html?k=${item.category}&text=${item.id}" class="pointer"><span><p class="itemp">${item.title}</p></span></a>
                                    <p class="items-div-left-p">${item.stock ? 'In Stock' : 'Out of Stock'}</p>
                                    <div style="margin-top: 8px; display: flex; align-items: center;">
                                        <input type="checkbox" name="isgift" id="isgiftcbx">
                                        <label for="isgift" style="font-size: 12px; margin-left: 5px; font-family: Arial, sans-serif;">This is a gift</label>
                                    </div>
                                    <div style="margin-top: 14px;">
                                        <select name="count" class="categorydropdown" onchange="handleChange(event,this,'${String(item.id)}','${item.price}')">
                                            ${generateQuantityOptions(item1.quantity)}
                                        </select>
                                        <a href="#delete" class="aafter" onclick="DeleteFromCart(this,'${String(item.id)}');">Delete</a>
                                        <a href="#savelater" class="aafter" onclick="addToLater(this,'${String(item.id)}');">Save for later</a>
                                        <a href="#compare" class="aafter">Compare with Similar</a>
                                        <a href="#share" class="aafter">Share</a>
                                    </div>
                                </div>
                                <div class="items-div-right">
                                    <span style="align-self: flex-end; font-size: large; font-weight: 600;" >$ ${item.price}</span>
                                </div>
                            </div>
                        </div>
                        <hr style="margin-top: 16px;" class="hr">
                    </span>
                </label>
            `;
                itemDivform.appendChild(itemDiv);
                total += item1.quantity * parseFloat(item.price);
                cnt++;
                totcnt += item1.quantity;
                // sumary+=`<tr>
                //             <td class="titleSum">${cnt} . ${item.title}</td>
                //             <td>${item1.quantity}</td>    
                //     </tr>
                // `;
            }
        });
        shoppingCartContainer.appendChild(itemDivform);
        const subtotalElement = document.createElement('p');
        subtotalElement.style.alignSelf = 'flex-end';
        subtotalElement.style.fontSize = 'large';
        subtotalElement.style.marginTop = '5px';
        subtotalElement.id="subTotal";
        // document.getElementById("result").innerHTML+=sumary;
        subtotalElement.textContent = `Subtotal (${cnt} item): ${total.toFixed(2)}`;
        shoppingCartContainer.appendChild(subtotalElement);
        if(cnt>0){
            // document.getElementById("valuetocart").textContent=`Subtotal (${cnt} item): ${total.toFixed(2)}`;
            let subtotalElement1 = document.createElement('button');
            subtotalElement1.textContent = 'Proceed to checkout';
            subtotalElement1.classList.add('btn');
            subtotalElement1.addEventListener('click', function() {
                redirectPayment();
            });
            document.querySelector('cartrighttop').appendChild(subtotalElement1);
        }
        else{
            document.querySelector('cartrightbottom').style.display="none";
        }
    }
}

function redirectPayment(){
    if(noselected>0){
        let cartvalues = JSON.parse(localStorage.getItem("CartItems"));
        let val=[];
        cartvalues.forEach((values,index)=>{
            if(selectedItems.has(values.product.id)){
                val.push(values);
            }
        });
        localStorage.setItem('OrderItems',JSON.stringify(val));
        window.location.href = './payment.html?page=cart';
    }
    else{
        alert("Please select Items");
    }
}

function deleteslt(ref){
    alert(ref);
}

function addToLater(self,id){
    alert("work in progress");
}

function generateQuantityOptions(selectedQuantity) {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}" ${selectedQuantity === i ? 'selected' : ''}>Qty: ${i}</option>`;
    }
    options += `<option value="10+" ${selectedQuantity >= 10 ? 'selected' : ''}>Qty: 10+</option>`;
    return options;
}
function handleChange(event,self,productId,price){
    let preval= event.target.value;
    if(preval=="10+"){
        alert("products Not available");
        return;
    }
    let cartdata=JSON.parse(localStorage.getItem('CartItems'));
    let index = cartdata.findIndex(item => item.product.id == productId);
    let currsubtot=document.getElementById("subTotal").textContent;
    let currsubtot2= parseFloat(currsubtot.split(':')[1].trim());
    if (index !== -1) {
        document.getElementById("subTotal").textContent = currsubtot.split(':')[0]+" : "+(currsubtot2+(preval-cartdata[index].quantity)*price).toFixed(2);
        if(noselected>0 && selectedItems.has(productId)){
            let currsubtot1=document.getElementById("valuetocart").textContent;
            let currsubtot3= parseFloat(currsubtot1.split(':')[1].trim());
            document.getElementById("valuetocart").textContent = currsubtot1.split(':')[0]+": "+(currsubtot3+(preval-cartdata[index].quantity)*price).toFixed(2);
        }
        cartdata[index].quantity = parseInt(preval);
        event.target.setAttribute('quantity',preval);
        if(noselected>0 && selectedItems.has(productId))
            document.getElementById(productId+"+quant").textContent=preval;
        localStorage.setItem('CartItems', JSON.stringify(cartdata));
    }
    else{
        alert('Item not found');
    }
}

var sum=0;
var noselected=0;
function updateTotal(self,price,title,id){
    showloader();
    let quantity=parseInt(self.getAttribute('quantity'));
    if(self.closest('input').checked){
        totalSelected++;
        sum+=quantity*parseFloat(price);
        noselected++;
        document.getElementById("result").innerHTML+=`<tr id="${id}">
                        <td class="titleSum"> # ${title}</td>
                        <td id=${id}+quant>${quantity}</td>    
                </tr>`;
                selectedItems.add(id);
    }
    else{
        totalSelected--;
        sum-=quantity*parseFloat(price);
        noselected--;
        const row = document.getElementById(id);
        if(row){
            row.remove();
            if (selectedItems.has(id)) {
                selectedItems.delete(id);
            }
        }
    }
    document.getElementById("valuetocart").textContent=`Subtotal (${totalSelected} item): ${sum.toFixed(2)}`;    
    setTimeout(()=>{
        hideloader();
    },500);
}
