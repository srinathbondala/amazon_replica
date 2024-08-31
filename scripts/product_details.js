window.onload = function() {
    loadPage('../html_files/footer-template.html', footerDiv);
    loadPageh('../html_files/template.html', contentDiv );
    imageZoom("myimage", "myresult");
    document.getElementById("myresult").style.display="none";
    performsomeaction();
    loadData();
};
window.addEventListener('beforeunload', function (event) {
    this.localStorage.removeItem(getTextFromURL());
});
var cartimg, cartprice, carturl,cartdis;


const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');

function performsomeaction(){
    const jwtToken = getCookie('jwtToken');
    if(jwtToken){
        let item = document.querySelector(".img-sub-container");
        let img = document.getElementById("myimage");
        let marker = document.querySelector(".img-zoom-lens");
        img.style.width = "80%";
        item.style.paddingLeft = "40px";
        marker.style.marginLeft = "40.5px";
        document.querySelector(".result-content").style.width = "40%";
        document.getElementById("myresult").style.width = "690px";
        document.getElementById("myresult").style.right="110px";
    }
}
function loadData() {
    const id= getTextFromURL();
    // const storedData = localStorage.getItem(id);
    // if (storedData) {
    //     renderData(JSON.parse(storedData));
    //     loadCartData();
    // } else {
        fetch('https://amazon-server-1-27sp.onrender.com/amazon/dataByid/'+id)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem(id, JSON.stringify(data));
                renderData(data);
                loadCartData();
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    // }
}

function getTextFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('text');
}

function renderData(data) {
    document.title="Amazon.com: "+data.title;
    document.querySelector(".product-info h2").textContent = data.title;
    document.querySelector(".product-info a").textContent += data.brand;
    document.getElementById("soldbya").textContent = data.brand;
    cartimg=data.imageUrl;
    cartprice=data.price;
    carturl=data.url;
    cartdis=data.title;
    // document.getElementById("soldbya").setAttribute("href", "http://localhost:8080/amazon/brand.html?text=" + data.brand);
    // alert(data.brand);
    document.querySelector(".product-info p span").textContent = " "+ data.ratingCount + " ratings";
    document.getElementById("myimage").setAttribute("src", data.imageUrl);
    document.getElementById("myresult").style.backgroundImage = "url('" + data.imageUrl + "')";
    document.getElementById("price").textContent ="  $"+ data.price;
    const descriptionList = document.querySelector(".product-info div ul");
    descriptionList.innerHTML = "";
    data.description.forEach(desc => {
        const li = document.createElement("li");
        li.textContent = desc;
        descriptionList.appendChild(li);
    });
    const detailsTable = document.querySelector(".product-info .inner-product-details table");
    detailsTable.innerHTML = "";
    const details = {
        "Color": data.color,
        "Product Dimensions": data.item_dimensions,
        "Brand" : data.brand,
        "Material": data.material,
        "Special Feature": data.special_features,
        "Recommended Uses For Product": (data.recomended_use? data.recomended_use:"-"),
        "Product Care Instructions": data.return_policy,
        "Discount": (data.discount? data.discount:"No Discount"),
        "Item Weight": data.item_weight,
    };
    for (const [key, value] of Object.entries(details)) {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        td1.textContent = key;
        const td2 = document.createElement("td");
        td2.textContent = value;
        tr.appendChild(td1);
        tr.appendChild(td2);
        detailsTable.appendChild(tr);
    }
    if(data.features!=null){
        data.features.forEach(feature => {
            for (const key in feature) {
                if (feature.hasOwnProperty(key)) {
                    const tr = document.createElement("tr");
                    const td1 = document.createElement("td");
                    td1.textContent = key;
                    const td2 = document.createElement("td");
                    td2.textContent = feature[key];
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    detailsTable.appendChild(tr);
                }
            }
        });
    }
    document.getElementById("objection").textContent = data.delivary;
    document.getElementById("inner-pay-amount").textContent = " $"+data.price;
    if(data.ratingCount!=="0" && data.ratingVal!==null){
       review(data.comments,data.rating,data.ratingCount,data.ratingVal);
    }
    if(data.comments.length!==0){
        comments(data.comments);
    }
    else{
        document.getElementById("commentsdiv").innerHTML = "<h3>No Comments Available</h3>";
    }
}

function review(comments,rating,count,ratingval){
    var reviewgdiv = document.getElementById("reviewgraph");
    var template=`<span class="heading">Customer reviews</span> <div style="margin-top:5px;margin-bottom:5px;">`;
    let i=0;
    for(i=0;i<rating[0];i++){
        template+=`<span class="fa fa-star checked" style="font-size:20px;"></span>`;
    }
    for(i;i<5;i++){
        template+=`<span class="fa fa-star" style="font-size:20px;"></span>`;
    }
    template+=`<span> ${rating}</span> </div> 
    <span style="color: gray; font-size: 14px;">${count} global ratings</span><br>
    <hr style="border:3px solid #f1f1f1">
    <div class="row">`;
    let v = {
        4 : ratingval.rate5,
        3 : ratingval.rate4,
        2 : ratingval.rate3,
        1 : ratingval.rate2,
        0 : ratingval.rate1
    };
    for (let i = 5; i >= 1; i--) {
        let rate = v[i-1];
        let percentage = ((parseInt(rate) / parseInt(count)) * 100).toFixed(0);
        template += `
            <div class="row">
                <div class="side">
                    <div>${i} star</div>
                </div>
                <div class="middle">
                    <div class="bar-container">
                        <div class="bar-${i}" style="width: ${percentage}%;"></div>
                    </div>
                </div>
                <div class="side right">
                    <div>${percentage}%</div>
                </div>
            </div>
        `;
    }
    template += `</div>`;
    template+=`<br><br><hr class="hr">
        <br><h3>Review this product</h3>
        <p style="margin-top:10px; font-size:14.5px;">Share your thoughts with other customers</p>
        <input type="button" value="Write a customer review" class="wish_list_btn" style="margin-top:15px; width:300px; margin-bottom:25px;" onclick="addComments();"> </div>
        <hr class="hr">
    `;
    reviewgdiv.innerHTML = template;
}

function comments(comment){
    let topReviewsDiv = document.getElementById("commentsdiv");

    let userImg= "https://th.bing.com/th?id=OIP.-gymMKaj3o4z4DoAnkBqzQHaHa&w=249&h=249&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2";
    let reviewsData = [
        {
            userName: "User Name",
            stars: 4,
            date: "May 3, 2024",
            review: "I have paid about $300 for these things. Well this faucet works great. Easy to install. No drips. Best value I have found in a long time. Looks great too."
        },
        // Add more reviews data here
    ];

    let html = `<span class="heading" >Top reviews</span><br> `;
    for (let review of comment) {
        html += `
            <div class="comment">
                <br>
                <span class="commentimg-div"><img src="${userImg}" alt="user" class="userimglogo"><a href="#" alt="user" style="color:black;"><p style="font-size:16px;">${review.user_name}</p></a></span>
                `;

        for(let i=0;i<5;i++){
            if(i<review.rating[0]){
                html+=`<span class="fa fa-star checked"></span>`;
                continue;
            }
            html+=`<span class="fa fa-star"></span>`;
        }

        html += `<span> ${review.rating}</span>
                <p style="font-size: 12px; color: gray; margin: 6px 6px 6px 0px;">Reviewed on ${review.date}</p>
                <p>${review.comment}</p>
            </div>
            <br><hr class="hr">
        `;
    }

    topReviewsDiv.innerHTML = html;

}

function AddToCart(){
    try{
        var id= getTextFromURL();
        var jwtToken = getCookie('jwtToken');
        // var jwtToken = 1;
        if(jwtToken){
            var quantity = document.getElementById("quantity").value;
            if(quantity>0){
                showloader();
                fetch('https://amazon-server-1-27sp.onrender.com/user/addToCart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    },
                    body: JSON.stringify({
                        "productId": id,
                        "quantity": parseInt(quantity),
                        "inCart": true
                    })
                })
                .then(response => response)
                .then(data =>{
                    console.log(data);
                    var cartitem = JSON.parse(localStorage.getItem('CartItems'));
                    cartitem.push({
                            "product": {
                                "id": id,
                                "imageUrl":cartimg,
                                "price": cartprice,
                                "url": carturl,
                                "title":cartdis
                            },
                            "quantity": parseInt(quantity),
                            "inCart": true
                        });
                    localStorage.setItem('CartItems',JSON.stringify(cartitem));
                    getCartDataFromServer();
                    console.log("Added to cart");
                    window.location.href = "smart-wagon.html?newitem="+id;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
                hideloader();
                localStorage.removeItem(id);
            }
            else{
                alert("Please enter valid quantity");
            }
        }
        else{
            window.location.href = "signin_page.html";
        }
    }
    catch (error) {
        console.error('Error:', error);
    }
    setTimeout(function() {
        hideloader();
    }, 2000);
    
}
function addComments(){
    if(getCookie('jwtToken')){
        var id= getTextFromURL();
        let revitem = {
            "id": id,
            "imageUrl":cartimg,
            "price": cartprice,
            "url": carturl,
            "title":cartdis
        }
        localStorage.setItem('ReviewItems',JSON.stringify(revitem));
        window.location.href = "review.html?text="+getTextFromURL();
    }
    else{
        window.location.href = "signin_page.html";   
    }
}

function orderItem(){
    var id= getTextFromURL();
    var quantity = document.getElementById("quantity").value;
    if(quantity>0){
        localStorage.setItem('OrderItems',JSON.stringify(
            [{
                "product": {
                    "id": id,
                    "imageUrl":cartimg,
                    "price": cartprice,
                    "url": carturl,
                    "title":cartdis,
                    "deal":JSON.parse(localStorage.getItem(id)).deal,
                    "delivery":JSON.parse(localStorage.getItem(id)).delivary
                },
                "quantity": parseInt(quantity),
                "inCart": false
            }]
        ));
        window.location.href=`../html_files/payment.html`;
    }
}

function imageZoom(imgID, resultID) {
    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /* Create lens: */
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /* Insert lens: */
    img.parentElement.insertBefore(lens, img);
    /* Calculate the ratio between result DIV and lens: */
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /* Set background properties for the result DIV */
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /* Execute a function when someone moves the cursor over the image, or the lens: */
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /* And also for touch screens: */
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    
    function moveLens(e) {
      var pos, x, y;
      /* Prevent any other actions that may occur when moving over the image */
      e.preventDefault();
      /* Get the cursor's x and y positions: */
      pos = getCursorPos(e);
      /* Calculate the position of the lens: */
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /* Prevent the lens from being positioned outside the image: */
      if (x > img.width - lens.offsetWidth+76) {x = img.width - lens.offsetWidth+76}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /* Set the position of the lens: */
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /* Display what the lens "sees": */
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
      dm();
    }

    function dm(){
        document.body.addEventListener("mousemove", function(event) {
            var imgRect = img.getBoundingClientRect();
            var mouseX = event.clientX;
            var mouseY = event.clientY;
        
            if (
                mouseX < imgRect.left || // Cursor is to the left of the image
                mouseX > imgRect.right || // Cursor is to the right of the image
                mouseY < imgRect.top || // Cursor is above the image
                mouseY > imgRect.bottom // Cursor is below the image
            ) {
                // Cursor is not hovering over the image
                result.style.display = 'none'; // Hide result div
                lens.style.display = 'none';
            } else {
                // Cursor is hovering over the image
                result.style.display = 'block'; // Show result div
                lens.style.display = 'block';
            }
        });
    }

    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /* Get the x and y positions of the image: */
      a = img.getBoundingClientRect();
      /* Calculate the cursor's x and y coordinates, relative to the image: */
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /* Consider any page scrolling: */
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
    
  }