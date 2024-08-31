// loadPage('mainpage-content.html');
window.onload = function() {
    loadPage('../html_files/footer-template.html', footerDiv);
    loadPageh('../html_files/template.html', contentDiv);
    setSelectVal();
    loadjsondata();
};
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');

function getTextFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('text');
}



// function loadjsondata(){
//     var xhr = new XMLHttpRequest();
//     // xhr.open('GET', '../product_data.json', true);
//     const category=getTextFromURL();
//     console.log(category)
//     xhr.open('GET', `http://localhost:8080/amazon/dataByCategory/${category}`, true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var data = JSON.parse(xhr.responseText);
//             var templateHTML = '';
//             data.forEach(function(item,index) {
//                 if (index % 4 === 0) {
//                     templateHTML += '<div class="targetdiv-item1">';
//                 }
//                 templateHTML += `
//                     <div class="targetdiv-inner1">
//                         <div class="targetdiv-image-container1">
//                             <a href='product_details.html?k=${item.category}&text=${item.id}' class="a-center"> <img src="../background_images/${item.imageUrl}" class="targetdiv-image1" alt=""></a>
//                         </div>
//                         <div class="details1">
//                             <a href='product_details.html?k=${item.category}&text=${item.id}' class="targetdiv-inner-h31">${item.title}</a>
//                             <div class="rating1">
//                                 <span class="ratting1">${item.rating}</span>
//                                 <span class="rating-count1">&#x25BC ${item.ratingCount}</span>
//                             </div>
//                             <p style="color: gray;">${item.count} bought in the past month</p>
//                             <div>
//                                 <span style="font-size:14px">$</span>
//                                 <span class="price1">${item.price}</span>
//                             </div>
//                             <p style="margin-top:16px; font-size:12px;">Ships to India</p>
//                         </div>
//                     </div>
//                 `;
//                 if ((index + 1) % 4 === 0 || (index + 1) === data.length) {
//                     templateHTML += '</div>';
//                 }
//             });
//             document.getElementById('products_container').innerHTML = templateHTML;
//         }
//     };
//     xhr.send();
// }
var rowcnt = 4;
function setSelectVal(){
    var selectElement = document.getElementById("sort-by-features");
    let val=getFeatureFromURL();
    if( val && ((val=='Price: Low to High')||(val=='Price: High to Low')||(val=='Avg. Customer Review')||( val == 'Newest Arrivals')|| (val == 'Best Sellers'))){
        selectElement.value=val;
    }
    else{
        selectElement.selectedIndex = 0;
    }
}

function performWidthChange(){
    const jwtToken = getCookie('jwtToken');
    if(jwtToken){
        let targetDivs = document.querySelectorAll(".targetdiv-inner1");
        document.getElementById("left").style.width="22%";
        document.getElementById("right").style.width="75%";
        if(document.getElementsByClassName("slider")[0])
            document.getElementsByClassName("slider")[0].style.width="100%";
        if (targetDivs.length > 0) {
            targetDivs.forEach(function(targetDiv) {
                targetDiv.style.width = "30%";
            });
        } else {
            console.error("No elements with class 'targetdiv-inner1' found.");
        }
    }
}

function redirectToProductDetails() {
    var selectElement = document.getElementById("sort-by-features");
    var selectedValue = selectElement.value;
    setSelectVal();
    window.location.href = `slider-page.html?text=${getTextFromURL()}&s=${selectedValue}`;
}

function getFeatureFromURL(){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('s');
}

function loadhref(a){
    window.location.href = `slider-page.html?text=${getTextFromURL()}&s=${a}`;
}

function loadjsondata() {
    var category = getTextFromURL();
    console.log(category);
    var URL=""
    if(getFeatureFromURL()!=null){
        URL= `https://amazon-server-1-27sp.onrender.com/amazon/dataByCategory/${category}/${getFeatureFromURL()}`;
    }
    else{
        URL = `https://amazon-server-1-27sp.onrender.com/amazon/dataByCategory/${category}`;
    }
    // var cachedData = getCachedData(category);
    // if (cachedData) {
    //     processData(cachedData);
    // } else {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', URL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                // Store data in cookies
                // setCachedData(category, data);
                // Process and display data
                processData(data);
                loadCartData();
            }
            else{
                console.log("error");
            }
        };
        xhr.send();
    // }
}

function getCachedData(category) {
    // Retrieve cached data from cookies
    var cachedData = localStorage.getItem(category);
    return cachedData ? JSON.parse(cachedData) : null;
}

function setCachedData(category, data) {
    // Store data in cookies
    localStorage.setItem(category, JSON.stringify(data));
}

function processData(data) {
    var demo = getTextFromURL();
    var str=demo.split("-");
    document.title="Amazon.com: "+ str[0];
    console.log(str[0]);
    document.getElementById("resultfrom").innerHTML ="Over "+data.length+" Results for "+getTextFromURL().toUpperCase();
    var templateHTML = '';
    if(getCookie('jwtToken')){
        rowcnt=3;
    }
    if(data.length==0){
        templateHTML += `
            <div> 
            <img src="https://image.freepik.com/free-vector/no-data-concept-illustration_114360-536.jpg" style="display: block; margin-left: auto; margin-right: auto; width: 80%; margin-top: 0px;">
            <div> 
            <div class="targetdiv-inner1"></div>
        `;
    }
    else{
        data.forEach(function (item, index) {
    
            if (index % rowcnt === 0) {
                templateHTML += '<div class="targetdiv-item1">';
            }
            templateHTML += `
                <div class="targetdiv-inner1">
                    <div class="targetdiv-image-container1">
                        <a href='product_details.html?k=${item.category}&text=${item.id}' class="a-center"> <img src="${item.imageUrl}" class="targetdiv-image1" alt=""></a>
                    </div>
                    <div class="details1">
                        <a href='product_details.html?k=${item.category}&text=${item.id}' class="targetdiv-inner-h31">${item.title}</a>
                        <div class="rating1">
                            <span class="ratting1">${item.rating}</span> <br>`;
                            let i=0;
                            for(i=0;i<item.rating[0];i++){
                                templateHTML+=`<span class="fa fa-star checked" style="font-size:18px;"></span>`;
                            }
                            for(i;i<5;i++){
                                templateHTML+=`<span class="fa fa-star" style="font-size:18px;"></span>`;
                            }
                            templateHTML+=`<span class="rating-count1"> (${item.ratingCount})</span>
                        </div>
                        <p style="color: #565959;">${item.count} bought in the past month</p>
                        <div>
                            <span style="font-size:14px">$</span>
                            <span class="price1">${item.price}</span>
                        </div>
                        <p style="margin-top:16px; font-size:12px;">Ships to India</p>
                    </div>
                </div>
            `;
            if ((index + 1) % rowcnt === 0 || (index + 1) === data.length) {
                templateHTML += '</div>';
            }
        });
    }
    document.getElementById('products_container').innerHTML = templateHTML;
    performWidthChange();
}

function getProductsOfRange(){
    let range = document.getElementById("myRange").value;
    loadhref('Range-'+range);
}