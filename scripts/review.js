window.onload = function() {
    try {
        loadPage('../html_files/footer-template.html', footerDiv);
        loadPageh('../html_files/template.html', contentDiv);
        loadSuggesions(suggestedDiv);
        let urlParams = new URLSearchParams(window.location.search);
        let a=urlParams.get('text');
        if(a=="success"){
            const reviewContent = document.getElementById('reviewContent');
            reviewContent.innerHTML += `
            <div class="reviewContentInner" style="background-color:#28a745;">
                <div class="reviewContentInner1" style="gap:10px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/5610/5610944.png" alt=":)" style="width: 30px; height: 30px;">
                    <p> Order Successfull</p>
                    <a href="./order_return.html" style="color:#28a745; font-size:14px;" class="a">Track Order</a>
                </div>
            </div>
            `;
        }
        else{
            getIsProductOrdered(a);
        }
    } catch (e) {
        alert(e);
    }
}
window.BeforeUnloadEvent = function(event){
    localStorage.removeItem("ReviewItems");
}
const suggestedDiv=document.getElementById('suggestions');
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
var no_of_stars=0;
function getIsProductOrdered(a) {
    fetch('http://localhost:8080/user/isProductOrdered/'+a, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${getCookie('jwtToken')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        LoadReview(data);
    })
    .catch((error) => {
        console.error('Error:', error);
        return "false";
    });
}
function LoadReview(data){
    console.log(data);
    if(data==false){
        const reviewContent = document.getElementById('reviewContent');
        reviewContent.innerHTML += `
        <div class="reviewContentInner">
            <div class="reviewContentInner1">
                <span class="reviewmsg"><img src="https://cdn-icons-png.flaticon.com/128/5610/5610944.png" alt=":)" style="width: 15px; height: 15px;">
                    <img src="https://cdn-icons-png.flaticon.com/128/14090/14090276.png" alt="product" class="reviewProductImage">
                    <p class="reviewmsgp">We apologize but this account has not met the minimum eligibility requirements to write a review. If you would like to learn more about our eligibility requirements, please see our <a href="https://www.amazon.com/gp/help/customer/display.html" style="color:#007185;">community guidelines</a>.</p>
                </span>
            </div>
        </div>
        `;
    }else{
        LoadReviewPage();
    }
}
function LoadReviewPage(){
    const reviewContent = document.getElementById('reviewContent');
    let itemdata= JSON.parse(localStorage.getItem("ReviewItems"));
    // localStorage.removeItem("ReviewItems");
    reviewContent.innerHTML += `
        <div class="reviewContentWrite">
            <div class="reviewContentWriteInner">
                <h2>Create Review</h2>
                <span style="display: flex; margin:10px; gap:20px; align-items: center;">
                    <img src=${itemdata.imageUrl} alt="logo" style="height: 40px;width: 40px;">
                    <p style="max-width:950px;">${itemdata.title}</p>
                </span>
                <hr class="hr">
                <form style="display: flex; flex-direction: column;">
                    <div class="reviewstarsDiv">
                        <h4>Overall rating</h4>
                        <div class="reviewStars">
                            <span class="fa fa-star" onclick="star(1)"></span>
                            <span class="fa fa-star" onclick="star(2)"></span>
                            <span class="fa fa-star" onclick="star(3)"></span>
                            <span class="fa fa-star" onclick="star(4)"></span>
                            <span class="fa fa-star" onclick="star(5)"></span>
                        </div>
                    </div>
                    <div class="reviewPhotoDiv1">
                        <h4>Add a Photo or video</h4>
                        <p>Shopping find images more helpfull then text alone.</p>
                        <div id="file-upload-container" onclick="document.getElementById('file').click();">
                            <input type="file" id="file" style="display: none;">
                            <span><img src="../background_images/share.jpeg" alt="+" style="height: 50px; width: 50px;mix-blend-mode: darken;"></span>
                        </div>
                    </div>
                    <br><hr class="hr">
                    <br>
                    <div class="ReviewText">
                        <h4>Write your review</h4>
                        <textarea placeholder="What's most important to know?" id="Reviewtext" required rows="10" class="quantity"></textarea>
                    </div>
                    <input type="submit" value="Submit" class="signin_btn" id="ReviewSubmit"onclick="updatereview(event);">
                </form>
            </div>
        </div>
    `;
}
let stars = 
    document.getElementsByClassName("fa");
function star(nostars){
    remove();
    for(let i=0;i<nostars;i++){
        stars[i].classList.add('checked');
    }
    no_of_stars=nostars;
}
function remove() {
    let i = 0;
    while (i < 5) {
        stars[i].classList.remove('checked');
        i++;
    }
}
function updatereview(event){
    event.preventDefault();
    const Reviewtext = document.getElementById("Reviewtext");
    if(no_of_stars==0){
        alert("please give Rating");
    }
    else if(Reviewtext.value ==""){
        alert("Enter Your Experience");
    }
    else{
        let urlParams = new URLSearchParams(window.location.search);
        let a=urlParams.get('text');
        let textComment=Reviewtext.value;
        const authToken = `Bearer ${getCookie('jwtToken')}`;
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const comment = {
            "user_name":JSON.parse(localStorage.getItem("UserItems")).username,
            "user_id":JSON.parse(localStorage.getItem("UserItems")).id,
            "comment":textComment,
            "rating":no_of_stars,
            "date":formattedDate.toString()
          };
        console.log(comment);
        addReviewToDatabase(comment,a,authToken)
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }
}

const addReviewToDatabase = async (comment, id, token) => {
    try {
        const response = await fetch(`http://localhost:8080/user/addReview/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(comment)
        });
        
        if (!response.ok) {
            throw new Error('Error adding review');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};




