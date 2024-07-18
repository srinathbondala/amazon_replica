window.onload = async function() {
    try {
        await loadPage('../html_files/footer-template.html', footerDiv);
        await loadPagep('../html_files/template.html', contentDiv);
        loadOrders();
    } catch (e) {
        alert(e);
    }
}
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');

function loadOrders(){
    let date = new Date();
    let currentYear = date.getFullYear();
    document.getElementById('currentYear').value="current-"+currentYear;
    let previousYear = currentYear - 1;
    document.getElementById('pastYear').value="previous-"+previousYear;
    let orderDiv = document.getElementById('Ordercontainer');
    loadOrderData("All");
}

function loadOrdersSelect(){
    let range = document.getElementById("category1").value;
    showloader();
    loadOrderData(range);
    setTimeout(hideloader(),5000);
}

async function loadOrderData(range){
    try{
        const resopnse = await fetch('http://localhost:8080/user/getOrders/'+range,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${getCookie('jwtToken')}`
            }
        });
        if(resopnse.status!=200){
            console.log("orders Not Available");
            return;
        }
        const data = await resopnse.json();
        loadOrderDiv(data,range);
    }
    catch(e){
        console.log(e);
    }
}

function loadOrderDiv(data,range){
    if(Array.isArray(data.body) && data.body.length==0){
        document.getElementById("Ordercontainer").innerHTML=`<p>Looks like you haven't placed an order in the last <span id="years"> 3 </span> months</p>`;
        document.getElementById("years").innerHTML=range;
        return;
    }else{
    document.getElementById("orderCount").innerHTML=data.body.length;
    let maindiv  = document.getElementById("Ordercontainer");
    let content = "";
    data.body.forEach(items=>{
        content+=`
         <div class="orderDiv">
                <div class="oredrDivInner">
                    <div class="orderInnerLeft">
                        <ul>
                            <li>
                                <p>ORDER PLACED</p>
                                <p id="orderPlacesDate">${items.order_date}</p>
                            </li>
                            <li>
                                <p>TOTAL</p>
                                <p id="totalPrice">${items.totalPrice}</p>
                            </li>
                            <li>
                                <p>DISPATCH TO</p>
                                <p id="deliveredName">${items.shippingAddress.name}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="orderInnerRight">
                        <span><p>Order Id</p></span>
                        <p id="orderCode">${items.order_id}</p>
                    </div>
                </div>
                <hr class="hr">
                <div class="allOrdersContent">
                    <div style="width: 30%;">
                        <p style="font-size: medium;">delivery status</p>`
                        let status = items.isDelivered?"Delivered":"Not Delivered";
                        content+=`<p>${status}</p><br>
                        <ul class="ulList" style="margin-bottom: 10px;">
                            <li><p style="font-size: medium;">Product Id</p></li>
                            <li>Status</li>
                        </ul>
                        <div>`
                        items.order_status.forEach(a=>{
                            content+=`<ul class="ulList1">
                                <li>${a.product_id}</li>
                                <li>${a.status}</li>
                            </ul>`
                        });
                        content+=`</div>
                    </div>
                    <div style="width: 20%; display: flex; align-items: center; justify-content: center;">
                        <input type="button" class="btn" value="View All" onclick="alert('View All');">
                    </div>
                </div>
                <hr class="hr">
                <div class="allOrdersContent">
                    <div class="AddressContainerInner">
                        <h5>Delivery Address</h5>
                        <br>
                        <p>${items.shippingAddress.address}</p>
                        <p>${items.shippingAddress.city} ${items.shippingAddress.pincode}</p>
                        <p>${items.shippingAddress.state} ${items.shippingAddress.country}</p>
                        <p>Phone: ${items.shippingAddress.phone}</p>
                    </div>
                </div>
            </div>`;
    });
    maindiv.innerHTML=content;}
}