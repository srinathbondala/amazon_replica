window.onload = function() {
    try {
        loadPage('../html_files/footer-template.html', footerDiv);
        loadPageh('../html_files/template.html', contentDiv);
        loadVerifyData();
        if(getCookie('validLogin')==null){
            openVerifyPage();
        }
    } catch (e) {
        alert(e);
    }
}
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
var userVerData;

function closeVerifyPage(){
    const overshad1 = document.getElementById("overshade1");
    overshad1.style.display="none";
    document.getElementById('verifyPassword').value="";
    goBack();
    startScroll();
}
function goBack() {
    history.back();
}
function openVerifyPage(){
    const overshad1 = document.getElementById("overshade1");
    overshad1.style.display="block";
    stopScroll();
    document.getElementById('verifyUserBtn').onclick = function() {
        let password = document.getElementById('verifyPassword').value;
        if (password.length < 6) {
            document.getElementById("incorrectMain").style.display="block";
        } else {
            validatePassword(password);
        }
    }
}
function loadVerifyData(){
    const num = document.getElementById("numberVerify");
    userVerData=JSON.parse(localStorage.getItem("UserItems"));
    document.getElementById("nameVerify").textContent=userVerData.username;
    document.getElementById("nameVerify1").textContent=userVerData.username;
    document.getElementById("verifynumber").textContent= userVerData.phone==null?"No Phone Number":userVerData.phone;
    if(userVerData.phone==null){
        document.getElementById("verifynumber").style.fontSize="10px";
        document.getElementById("verifynumber").style.color="#c45500";
    }
    else{
        document.getElementById("verifynumber").style.fontSize="15px";
        document.getElementById("verifynumber").style.color="black";
    }
    num.textContent=userVerData.email;
}
function verifyUser(name){
    switch (name) {
        case 'UserName':
            editUserName();
            break;
        case 'Email':
            editEmail();
            break;
        case 'PhoneNo':
            editPhoneNumber();
            break;
        case 'Password':
            editPassword();
            break;
        case 'Delete':
            deleteAccount();
            break;
    }
}
function editEmail(){
    alert("email");
    window.location.href="./editDetails.html?prams=email";
}
function editPhoneNumber(){
    alert("phoneNumber");
    window.location.href="./editDetails.html?prams=phoneNumber";
}
function editPassword(){
    alert("Password");
    window.location.href="./editDetails.html?prams=password";
}
function DeleteAccount(){
    alert("Delete");
}
function editUserName(){
    alert("name");
    window.location.href="./editDetails.html?prams=userName";
}
function validatePassword(password){
    showloader();
    VerifyPass(password);
}
async function VerifyPass(password){
    da={
        "password": password
    }
    try {
        const response = await fetch('http://localhost:8080/auth1/validateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwtToken')}`
            },
            body: JSON.stringify(da),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        if(result==="Success"){
            setCookie("validLogin",result,1800000);
            const overshad1 = document.getElementById("overshade1");
            document.getElementById("incorrectMain").style.display="none";
            document.getElementById("overshade1").classList.add("vanish");
            overshad1.style.display="none";
            document.getElementById('verifyPassword').value="";
            hideloader();
            startScroll();
        }
        else{
            document.getElementById("incorrectMain").style.display="block";
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error Occured");
    }
}