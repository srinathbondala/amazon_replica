// loadPage('mainpage-content.html');

window.onload = function() {
    try {
        loadjsondata();
        loadPage('../html_files/footer-template.html', footerDiv);
        loadPagep('../html_files/template.html', contentDiv);
        hideloader();
    } catch (e) {
        alert(e);
    }
};

function loadjsondata(){
    var xhr = new XMLHttpRequest();
    // xhr.open('GET', '../data.json', true);
    // xhr.open('GET', 'http://localhost:8080/amazon/data',true);
    xhr.open('GET', 'https://amazon-server-1-27sp.onrender.com/amazon/data',true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                renderData(data);
            } else {
                console.error('Failed to fetch data');
            }
        }
    };
    xhr.send();
}



// function loadjsondata() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', 'http://localhost:8080/amazon/data', true);
//     if(localStorage.getItem('cachedData')) {
//         renderData(JSON.parse(localStorage.getItem('cachedData')));
//     }
//     else{
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 var data = JSON.parse(xhr.responseText);
//                 renderData(data);
//                 localStorage.setItem('cachedData', JSON.stringify(data));
//             }
//         }
//         else {
//                 console.error('Failed to fetch data');
//         }
//     };
//     xhr.send();}
// }

function renderData(data) {
    var templateHTML = '';
    var cnt=0;
    data.forEach(function(item, index) {
        if(item.link.length>1){
            templateHTML += '</div>';
            templateHTML+=`
                <div class="suggestedDiv">
                <div class="foot-top1">
                    <div id="foot-top1-heading">
                        <h3>${item.title}</h3>
                        <span onclick="window.location.href='slider-page.html?text=${item.category}';" class='a' >See more</span>
                    </div>
                    <div class="foot-top1-inner">
                        <span class="togglebuttons" style="left:0;" onclick="toggleleftb(this)"> <span><img src="https://cdn-icons-png.flaticon.com/128/271/271220.png" alt=">" class="toggleimgbtn"> </span></span>
                        <span class="togglebuttons" style="right:0;" onclick="togglerightb(this)"><span><img src="https://cdn-icons-png.flaticon.com/128/271/271228.png" alt="<" class="toggleimgbtn"></span> </span>
                        <div style="overflow:auto; -ms-overflow-style: none; scrollbar-width: none;">
                            <ul class="browsing" id="browsing" style="-ms-overflow-style: none; scrollbar-width: none;">`
                            for(var i=0;i<item.imageUrls.length;i++){
                                templateHTML+=`<li><a href="../html_files/product_details.html?text=${item.link[i]}"><img src="${item.imageUrls[i]}" alt="Product Image" class="product_img"></a></li>`;
                            }
                            templateHTML+=`</ul>
                        </div>
                    </div>
                </div>
            </div> 
        `;
        cnt--;
        }
        else{
            if (cnt % 4 === 0) {
                templateHTML += '<div class="targetdiv-item">';
            }
            templateHTML += `
                <div class="targetdiv-inner">
                    <h3 class="targetdiv-inner-h3">${item.title}</h3>
                    <div class="targetdiv-image-container">
                        <a href="../html_files/slider-page.html?text=${item.link}">
                            ${item.imageUrls.map(url => `<img src="${url}" class="targetdiv-image" alt="">`).join('')}
                        </a>
                    </div> 
                    <a href="../html_files/slider-page.html?text=${item.link}" class="targetdiv-inner-a">See more</a>
                </div>
            `;
            if ((cnt + 1) % 4 === 0 || (cnt + 1) === data.length) {
                templateHTML += '</div>';
            }
        }
        cnt++;
    });
    document.getElementById('targetDiv').innerHTML = templateHTML;
}

const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');

const img11 = ["../background_images/bg1.png", "../background_images/bg2.png","../background_images/bg3.png"];
const linksOrTexts = ["deals", "Home_Kitchen", "toysandgames"];
let currentIndex = 0;
let intervalId;
function changeBackground() {
    currentIndex = (currentIndex + 1) % img11.length;
    const imageContainer = document.getElementById("image-container");
    const imageElement = imageContainer.querySelector("#image");

    imageContainer.style.backgroundImage = `linear-gradient(to bottom, transparent 40%, #e3e1e1 100%), url('${img11[currentIndex]}')`;
    imageElement.src = img11[currentIndex];

}
changeBackground();
startAutoChange();

function startAutoChange() {
    intervalId = setInterval(changeBackground, 5000); 
}
function stopAutoChange() {
    clearInterval(intervalId);
}
function moveleft(){
    stopAutoChange(); 
    currentIndex = (currentIndex - 2 + img11.length) % img11.length;
    changeBackground(); 
    startAutoChange();

}
function moveright(){
    stopAutoChange(); 
    // currentIndex = (currentIndex + 1) % img11.length;
    changeBackground(); 
    startAutoChange();
}
function changeColor() {
    const linkOrText = linksOrTexts[currentIndex];
    window.open(`../html_files/slider-page.html?text=${linkOrText}`, "_self");
}
