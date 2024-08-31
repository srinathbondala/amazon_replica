var idsection=0;
var addressSection=0;
var orderItems=0;
window.onload = function(){
    if(localStorage.getItem('selectedID') != null){
        for(const r of document.getElementsByName('id')){
            if(r.value == localStorage.getItem('selectedID')){
                r.checked = true;
                document.getElementById("displayItems").style.display = "block";
                loadOrderData();
                break;
            }
        }
    }
    loadAddress();
}
function loadAddress(){
    let addressDefaultDiv = document.getElementById("default");
    let localAdress1 = JSON.parse(localStorage.getItem('UserItems'));
    let loadDetails = localAdress1.details;
    if(loadDetails.length>0){
        for(let i=0;i<loadDetails.length;i++){
            if(localAdress1.defaultAddress == loadDetails[i].id){
                let content = `<p style="font-weight: bold;">${loadDetails[i].name}</p>
                <p>${loadDetails[i].address}</p>
                <span style="display:flex; gap:5px;"><p>${loadDetails[i].city},</p><p> ${loadDetails[i].pincode}</p></span>
                <span style="display:flex; gap:5px;"><p>${loadDetails[i].state},</p><p>${loadDetails[i].country}</p></span>`;
                addressDefaultDiv.innerHTML=content;
                document.getElementById("payAdress").innerHTML=content;
                break;
            }
        }
    }
    else{
        document.getElementById("AllAdress").style.display = "block";
    }
    let addressDiv = document.getElementById("AllAdress");
}
function ShowAdress(){
    if( document.getElementById("change1").textContent!="Close"){
        document.getElementById("shipheading").textContent = "Choose a shipping address";
        document.getElementsByClassName("Addressoption")[0].style.display = "block";
        document.getElementById("AllAdress").style.display = "block";
        document.getElementById("change1").textContent="Close";
        let address = document.getElementsByClassName("addressSelect");
        address[0].classList.add("addressAddStart");
        document.getElementById("hiddentitle").style.display = "block";
        document.getElementsByClassName("defaultAddress")[0].classList.add("defaultadd");
    }
    else{
        document.getElementById("shipheading").textContent = "Shipping address";
        document.getElementsByClassName("Addressoption")[0].style.display = "none";
        document.getElementById("AllAdress").style.display = "none";
        document.getElementById("change1").textContent="Change";
        let address = document.getElementsByClassName("addressSelect");
        document.getElementById("hiddentitle").style.display = "none";
        address[0].classList.remove("addressAddStart");
        document.getElementsByClassName("defaultAddress")[0].classList.remove("defaultadd");
    }
}
function changeAddress(){
    alert("changed");
}
function addNewAddressTab(){
    alert("Add New Address");
    addressSection=1;
}
function getDoc(){
    document.getElementById('DocInput').click();
}
function addNewIdTab(){
    document.getElementById("adddochead").style.display = "block";
    document.getElementById("newdocform").style.display = "block";
}
function closeNewIdtab(){
    document.getElementById("adddochead").style.display = "none";
    document.getElementById("newdocform").style.display = "none";
}
function addnewIdToDatabase(){
    idsection=1;
}
function openItemViews(){

    // check address also when implemented
    if((idsection==1 || checkselectedid() )&& (addressSection==1 || document.getElementById("adresscheck").checked)){
        document.getElementById("displayItems").style.display = "block";
        loadOrderData();
    }
    else{
        if(idsection==0){
            alert("Please add a new ID or select an ID");
        }
        else if(addressSection==0){
            alert("Please select an address");
        }
    }
}
function checkselectedid(){
    const radios = document.getElementsByName('id');
    let selectedval = '';
    for (const radio of radios) {
        if (radio.checked) {
            selectedval = radio.value;
            localStorage.setItem('selectedID',selectedval);
            idsection=1;
            break;
        }
    }
    if(selectedval==""){
        alert("Please select an ID Or Add a new ID");
        return false;
    }
    else{
        return true;
    }
}
function addressSelected(){
    let defAdd= document.getElementById("adresscheck");
    if(defAdd.checked || addressSection==1){
        ShowAdress();
    }
    else{
        alert("Please select an address");
    }
}
function loadOrderData(){
    let data;
    if(localStorage.getItem('OrderItems') != null){
        renderorderData(JSON.parse(localStorage.getItem('OrderItems')));
    }
}
var total=0;
function renderorderData(data1){
    let innerText=``;
    if (Array.isArray(data1)) {
        data1.forEach(item=>{
            let quantity = item.quantity;
            item = item.product;
            innerText += `
            <div class="ItemsInOrder">
                <div class="cartBarItem">
                    <a href='product_details.html?text=${item.id}' ><img src="${item.imageUrl}" alt="img" class="ImgeInCart" style="width:80px; height:90px;"> </a>
                    <p>${item.price}</p>
                </div>
                <hr class="hr">
                <div class="cartBarItemInner">
                <select name="1" id="select" class="categorydropdown" style="padding: 0px 15px; height: 20px;" disable>
                <option value=${quantity}>${quantity}</option>
                </select>
                <span class="quantity" style="padding: 4px; width:15px; height:15px;">
                <img src="../background_images/trash_icon.png" alt="delete" style="height: 15px; width: 15px;" onclick="deleteFromOrderList(this);">
                </span>
                </div>
            </div>
            `;
            total+= quantity * parseFloat(item.price);
        });
        document.getElementById("paycnt").innerHTML=data1.length;
        document.getElementById("subtotal").innerHTML=total;
        document.getElementById("total").innerHTML=total;
        document.getElementById("tax").innerHTML=total;
    }
    else{
        let data=data1.product;
        innerText += `
        <div class="ItemsInOrder">
        <hr class="hr">
        <div class="cartBarItem">
        <a href='product_details.html?text=${data.id}' ><img src="${data.imageUrl}" alt="img" class="ImgeInCart" style="width:80px; height:90px;"> </a>
        <p>${data.price}</p>
        </div>
        <div class="cartBarItemInner">
        <select name="1" id="select" class="categorydropdown" style="padding: 0px 15px; height: 20px;" disable>
        <option value=${data1.quantity}>${data1.quantity}</option>
            </select>
            <span class="quantity" style="padding: 4px; width:15px; height:15px;">
            <img src="../background_images/trash_icon.png" alt="delete" style="height: 15px; width: 15px;" onclick="deleteFromOrderList(this);">
            </span>
            </div>
            </div>
            `;
            document.getElementById("subtotal").innerHTML=parseFloat(data.price)*parseFloat(data1.quantity);
            document.getElementById("total").innerHTML=parseFloat(data.price)*parseFloat(data1.quantity);

        }
        document.getElementById("displayOrderItems").innerHTML=innerText;
}

function deleteFromOrderList(ref){
    const itemToDelete = ref.closest('.ItemsInOrder');
    if (itemToDelete) {
        itemToDelete.remove(); 
    }
}

function confirmOrderItems(){
    orderItems=1;
    document.getElementById("showconfirm").style.display = "flex";
    document.getElementById("proceedpay").classList.add("btn");
    document.getElementById("proceedpay").classList.add("pop");
}
function ProceedForPayment(){
    if(orderItems==1){
        scrollTo(0,0);
        document.getElementById("container1").style.display="none";
        showloader();
        placeOrder();
        setTimeout(()=>{
            document.getElementById("container1").style.display="flex";
        },1000);
        clearTimeout(x);
        toast.style.transform = "translateX(0)";
        x = setTimeout(()=>{
            toast.style.transform = "translateX(400px)"
        }, 4000);
        setTimeout(()=>{
            hideloader();
        },2000)
    }
    else{
        alert("Please confirm items to proceed for payment");
    }
}

let x;
let toast = document.getElementById("toast");
function closeToast(){
    toast.style.transform = "translateX(400px)";
}

async function placeOrder(){
    try{
        let order_status=[];
        const orderdata = JSON.parse(localStorage.getItem('OrderItems'));
        orderdata.forEach(item=>{
            order_status.push(
                {
                    "product_id": item.product.id,
                    "comments": [],
                    "status": "pending",
                    "price": item.product.price,
                    "delivery_date": item.product.delivary? item.product.delivary:"Not Confirmed",
                    "quantity": item.quantity
                }
                
            );
        });
        let order = {
            "totalPrice": total,
            "shippingAddress": {
              "address": "SENIOUR CIVIL JUDGE QUATERS . QUATER No.B3, West Marredpally. SECUNDER...",
              "city": "SECUNDERABAD",
              "state": "TELANGANA",
              "country": "India",
              "pincode": "500026"
            },
            "order_status": order_status
        }
        //   [
        //     {
        //       "product_id": "663b21d07271b12c8eabf051",
        //       "comments": [],
        //       "status": "pending",
        //       "price": 22.99,
        //       "delivery_date": "2024-07-24"
        //     }
        //   ]
          
        const authToken = `Bearer ${getCookie('jwtToken')}`;
        const resopnse = await fetch('https://amazon-server-1-27sp.onrender.com/user/addOrder', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Authorization': authToken
            },
            body : JSON.stringify(order)
        });
        if(!resopnse.ok){
            throw new Error('Error Placing Order');
        }
        else{
            let urlParams = new URLSearchParams(window.location.search);
            let a=urlParams.get('page');
            a=="cart"?removeFromCart(orderdata):console.log("Selected directly Cart");
        }
        setTimeout(()=>{
            hideloader();
            localStorage.removeItem('OrderItems');
            window.location.href="./review.html?text=success";
        },1000);
    }catch(error){
        alert("error Occured to Order");
        console.log(error);
    }
}

function removeFromCart(arr){
    let cartdata = JSON.parse(localStorage.getItem('CartItems'));
    const set = new Set();
    let val=[];
    arr.forEach((values,idx)=>{
        set.add(values.product.id);
    });
    cartdata.forEach((value,index)=>{
        if(!set.has(value.product.id)){
            val.push(value);
        }
    });
    localStorage.setItem('CartItems',JSON.stringify(val));
    saveCart();
}