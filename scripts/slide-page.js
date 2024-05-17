// loadPage('mainpage-content.html');
window.onload = function() {
    loadPage('../html_files/template.html', contentDiv , function() {
        adjustWidth();
    });
    loadPage('../html_files/footer-template.html', footerDiv);
    setSelectVal();
};
loadjsondata();
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

function setSelectVal(){
    var selectElement = document.getElementById("sort-by-features");
    var selectedValue = selectElement.value;
    let val=getFeatureFromURL();
    if(val){
        selectElement.value=val;
    }
    else{
        selectElement.selectedIndex = 0;
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

function loadjsondata() {
    var category = getTextFromURL();
    // console.log(category);
    const URL = `http://localhost:8080/amazon/dataByCategory/${category}/${getFeatureFromURL()}`;
    var cachedData = getCachedData(category);
    // if (cachedData) {
    //     processData(cachedData);
    // } else {
        // If data is not available in cookies, make an AJAX call
        var xhr = new XMLHttpRequest();
        xhr.open('GET', URL, true);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                // Store data in cookies
                setCachedData(category, data);
                // Process and display data
                processData(data);
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
    document.title="Amazon.com: "+ data[0].category;
    document.getElementById("resultfrom").innerHTML ="Over "+data.length+" Results for "+getTextFromURL().toUpperCase();
    var templateHTML = '';
    data.forEach(function (item, index) {

        if (index % 4 === 0) {
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
                        <span class="ratting1">${item.rating}</span>
                        <span class="rating-count1">&#x25BC ${item.ratingCount}</span>
                    </div>
                    <p style="color: gray;">${item.count} bought in the past month</p>
                    <div>
                        <span style="font-size:14px">$</span>
                        <span class="price1">${item.price}</span>
                    </div>
                    <p style="margin-top:16px; font-size:12px;">Ships to India</p>
                </div>
            </div>
        `;
        if ((index + 1) % 4 === 0 || (index + 1) === data.length) {
            templateHTML += '</div>';
        }
    });
    document.getElementById('products_container').innerHTML = templateHTML;
}
// ../background_images/