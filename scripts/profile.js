window.onload = function() {
    try {
        loadPage('../html_files/footer-template.html', footerDiv);
        loadPageh('../html_files/template.html', contentDiv);
        loadVerifyData();
        if(getCookie('validLogin')==null){
            openVerifyPage();
        }
        let urlParams = new URLSearchParams(window.location.search);
        if(urlParams.has('successCodes')){
            let successCodes=urlParams.get('successCodes');
            document.getElementById("successMain").style.display="block";
            if(successCodes==="SUCCESS_CHANGE_NAME"){
                document.getElementById("successCodeVal").innerHTML="Name updated";
            }
            else if(successCodes==="SUCCESS_CHANGE_EMAIL"){
                document.getElementById("successCodeVal").innerHTML="Email updated";
            }
            else if(successCodes==="SUCCESS_CHANGE_PHONE"){
                document.getElementById("successCodeVal").innerHTML="Phone Number updated";
            }
            else if(successCodes==="SUCCESS_CHANGE_PASSWORD"){
                document.getElementById("successCodeVal").innerHTML="Password updated";
            }
        }
    } catch (e) {
        alert(e);
        console.error(e);
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
    if(localStorage.getItem("UserItems")==null){    
        userVerData=JSON.parse(localStorage.getItem("UserItems"));
        document.getElementById("nameVerify").textContent=userVerData.username;
        document.getElementById("nameVerify1").textContent=userVerData.username;
        if(userVerData.phone && userVerData.phone==null){
            document.getElementById("verifynumber").textContent="No Phone Number";
            document.getElementById("verifynumber").style.fontSize="10px";
            document.getElementById("verifynumber").style.color="#c45500";
        }
        else{
            document.getElementById("verifynumber").textContent=userVerData.phone;
            document.getElementById("verifynumber").style.fontSize="15px";
            document.getElementById("verifynumber").style.color="black";
        }
        num.textContent=userVerData.email;
    }
}
function verifyUser(name){
    switch (name) {
        case 'UserName':
            editUserName();
            break;
        case 'Email':
            addEmail();
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
function addEmail(){
    // alert("email");
    window.location.href="./editDetails.html?parms=Email";
}
function editPhoneNumber(){
    // alert("phoneNumber");
    window.location.href="./editDetails.html?parms=PhoneNumber";
}
function editPassword(){
    // alert("Password");
    window.location.href="./editDetails.html?parms=password";
}
function DeleteAccount(){
    alert("Delete");
}
function editUserName(){
    // alert("name");
    window.location.href="./editDetails.html?parms=UserName";
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
        const response = await fetch('https://amazon-server-1-27sp.onrender.com/auth1/validateUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getCookie('jwtToken')}`
            },
            body: JSON.stringify(da),
        });

        if (!response.ok) {
            hideloader();
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.text();
        if(result==="Success"){
            setCookie("validLogin",result,2000000);
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
        hideloader();
    }
}