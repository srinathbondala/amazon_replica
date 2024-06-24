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
        });
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
}