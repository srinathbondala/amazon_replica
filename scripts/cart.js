window.onload = function() {
    loadPage('../html_files/footer-template.html', footerDiv);
    loadPagep('../html_files/template.html', contentDiv );
    // renderCartData(cartData);
    // loadCartData();
    if(getCookie('jwtToken')){
        renderCartData(cartData);
    }
    else{
        document.querySelector('cartleftbottom').innerHTML = "";
        document.querySelector('cartrighttop').style.display = "none";
        var txt = document.querySelector('cartlefttop').innerHTML=`<div style="display: flex; padding:0px 20px; padding-top:30px;">
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

function loadCartData() {
    fetch('http://localhost:8080/amazon/cart')
        .then(response => response.json())
        .then(data => {
            if(!(data.length === 0)) {
                renderCartData(data);
            }
        })
        .catch(error => {
            console.error('Failed to fetch cart data');
        });
}
function renderCartData(data) {
    if(data.length !== 0) {
        const shoppingCartContainer = document.querySelector('.shopping-cart');

        shoppingCartContainer.innerHTML = '';

        const upperPart = `
            <div style="padding-left: 10px; padding-right: 10px; display: flex; flex-direction: column;">
                <h2 class="heading">Shopping Cart</h2>
                <span class="atype">Deselect all items</span>
                <span style="font-size:14px; align-self: flex-end; color: #5b5959;">Price</span><hr>
            </div>
        `;
        shoppingCartContainer.innerHTML = upperPart;

        data.forEach((item, index) => {
            if (item.status === "STL") {
                const stldiv = document.querySelector('.savelater');
                if(val==1){
                    stldiv.innerHTML="";
                    val=0;  
                }
                stldiv.innerHTML +=`
                <div class="savelateritem">
                    <div class="savelateritem-img-container">
                        <a href='product_details.html?k=${item.category}&text=${item.id}' class="savelateritem-img-container"> <img src="${item.image}" class="savelateritem-img" alt=""></a>
                    </div>
                    <div class="savelateritem-details">
                        <a href='product_details.html?k=${item.category}&text=${item.id}' class="savelateritem-h3">${item.name}</a>
                        <div  class="savelateritem-price-div">
                            <span class="savelateritem-price">${item.price}</span>
                        </div>
                        <p class="savelateritem-stoct">${item.inStock ? 'In Stock' : 'Out of Stock'}</p>
                        <button  class="wish_list_btn"> Add to Wish List</button>
                        <p class="a" onclick="deleteslt(this)">Delete</p>
                        <p class="a" onclick="">Add to list</p>
                    </div>
            </div>
                `;
            } else {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');

                itemDiv.innerHTML = `
                <input type="checkbox" id="item${index + 1}" name="item${index + 1}">
                <label for="item${index + 1}" class="item-inner-div">
                    <span class="item-inner">
                        <div class="item-inner-div">
                            <img src="${item.image}" alt="item${index + 1}" class="item-inner-div-img">
                            <div class="items-div">
                                <div class="items-div-left">
                                    <a href="#" class="pointer"><span><p class="itemp">${item.name}</p></span></a>
                                    <p class="items-div-left-p">${item.inStock ? 'In Stock' : 'Out of Stock'}</p>
                                    <div style="margin-top: 8px; display: flex;align-items: center;">
                                        <input type="checkbox" name="isgift" id="isgiftcbx">
                                        <label for="isgift" style="font-size: 12px; margin-left: 5px; font-family: Arial, sans-serif;">This is a gift</label>
                                    </div>
                                    <div style="margin-top: 14px;">
                                        <select name="count" class="categorydropdown" onchange="handleChange()">
                                            ${generateQuantityOptions(item.quantity)}
                                        </select>
                                        <a href="#delete" class="aafter">Delete</a>
                                        <a href="#savelater" class="aafter">Save for later</a>
                                        <a href="#compare" class="aafter">Compare with Similar</a>
                                        <a href="#share" class="aafter">Share</a>
                                    </div>
                                </div>
                                <div class="items-div-right">
                                    <span style="align-self: flex-end; font-size: large; font-weight: 600;">${item.price}</span>
                                </div>
                            </div>
                        </div>
                        <hr style="margin-top: 16px;" class="hr">
                    </span>
                </label>
            `;

            shoppingCartContainer.appendChild(itemDiv);
            }
        });
        // Calculate and display subtotal
        const subtotal = calculateSubtotal(data);
        const subtotalElement = document.createElement('p');
        subtotalElement.style.alignSelf = 'flex-end';
        subtotalElement.style.fontSize = 'large';
        subtotalElement.style.marginTop = '5px';
        subtotalElement.textContent = `Subtotal (${data.length} item): ${subtotal}`;
        shoppingCartContainer.appendChild(subtotalElement);
        if(val==0){
            document.getElementById("valuetocart").textContent=`Subtotal (${data.length} item): ${subtotal}`;
            const subtotalElement1 = document.createElement('button');
            subtotalElement1.textContent = 'Proceed to checkout';
            subtotalElement1.classList.add('btn');
            subtotalElement1.addEventListener('click', function() {
                window.location.href = 'your_page_url';
            });
            document.querySelector('cartrighttop').appendChild(subtotalElement1);
        }
    }
}

function deleteslt(ref){
    alert(ref);
}

function generateQuantityOptions(selectedQuantity) {
    let options = '';
    for (let i = 1; i <= 10; i++) {
        options += `<option value="${i}" ${selectedQuantity === i ? 'selected' : ''}>Qty: ${i}</option>`;
    }
    options += `<option value="10+" ${selectedQuantity >= 10 ? 'selected' : ''}>Qty: 10+</option>`;
    return options;
}
function handleChange() {
    calculateSubtotal(cartData);
}

function calculateSubtotal(data) {
    // let total = 0;
    // data.forEach(item => {
    //     total += document.querySelector('.hover_over').value * parseFloat(item.price.replace('$', ''));
    // });
    // return `$${total.toFixed(2)}`;
}
