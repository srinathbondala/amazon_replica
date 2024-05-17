// loadPage('mainpage-content.html');
window.onload = function() {
    try {
        loadjsondata();
        loadPage('../html_files/template.html', contentDiv , function() {
            adjustWidth();
        });
        
        loadPage('../html_files/footer-template.html', footerDiv);
    } catch (e) {
        alert(e);
    }
};

// function loadjsondata(){
//     var xhr = new XMLHttpRequest();
//     // xhr.open('GET', '../data.json', true);
//     xhr.open('GET', 'http://localhost:8080/amazon/data',true);
//     xhr.onreadystatechange = function() {
//         if (xhr.readyState == 4) {
//             if (xhr.status == 200) {
//                 var data = JSON.parse(xhr.responseText);
//                 renderData(data);
//             } else {
//                 console.error('Failed to fetch data');
//             }
//         }
//     };
//     xhr.send();
// }


var cachedETag = localStorage.getItem('cachedETag');
// adjustWidth();

function loadjsondata() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8080/amazon/data', true);
    
    // Set the If-None-Match header with the cached ETag value
    if (cachedETag) {
        xhr.setRequestHeader('If-None-Match', cachedETag);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                renderData(data);

                // Cache fresh data and ETag value
                var eTag = xhr.getResponseHeader('ETag');
                if (eTag) {
                    localStorage.setItem('cachedData', JSON.stringify(data));
                    localStorage.setItem('cachedETag', eTag);
                }
            } else if (xhr.status == 304) {
                // Use cached data if server returns Not Modified
                var cachedData = localStorage.getItem('cachedData');
                if (cachedData) {
                    renderData(JSON.parse(cachedData));
                }
            } else {
                console.error('Failed to fetch data');
            }
        }
    };
    xhr.send();
}

function renderData(data) {
    var templateHTML = '';
    data.forEach(function(item, index) {
        if (index % 4 === 0) {
            templateHTML += '<div class="targetdiv-item">';
        }
        templateHTML += `
            <div class="targetdiv-inner">
                <h3 class="targetdiv-inner-h3">${item.title}</h3>
                <div class="targetdiv-image-container">
                    <a href="slider-page.html?text=${item.link}">
                        ${item.imageUrls.map(url => `<img src="${url}" class="targetdiv-image" alt="">`).join('')}
                    </a>
                </div> 
                <a href="slider-page.html?text=${item.link}" class="targetdiv-inner-a">click here</a>
            </div>
        `;
        if ((index + 1) % 4 === 0 || (index + 1) === data.length) {
            templateHTML += '</div>';
        }
    });
    document.getElementById('targetDiv').innerHTML = templateHTML;
}

const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');

const img11 = ["../background_images/bg1.png", "../background_images/bg2.png","../background_images/bg3.png"];
const linksOrTexts = ["Link 1", "kitchen", "Link 3"];
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
    window.open(`slider-page.html?text=${linkOrText}`, "_self");
}
