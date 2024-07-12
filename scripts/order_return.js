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
    loadOrderData(range);
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
        loadOrderDiv(data);
    }
    catch(e){
        console.log(e);
    }
}

function loadOrderDiv(data){
    console.log(data.body);
    document.getElementById("orderCount").innerHTML=data.body.length;
    let maindiv  = document.getElementById("Ordercontainer");
    let content = "";
    data.body.forEach(items=>{
        content+=`
        
        <p>${items.order_id}</p>`
    });
    // maindiv.innerHTML=content;
}