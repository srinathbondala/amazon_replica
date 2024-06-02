window.onload = function() {
    const parm = getQueryParam('openid.return_to');
    if(parm == 'SellerDashbord'){
        sellerAccountSetup();
    }
}

document.getElementById("a1").addEventListener("click", function(event) {
    event.preventDefault();
    this.classList.toggle('toggled');
    if(document.getElementById("hide").style.display == "block"){
        document.getElementById("hide").style.display = "none";
    }
    else{
        document.getElementById("hide").style.display = "block";
    }
});

function getQueryParam(param) {
    const queryString = window.location.search.substring(1);
    const params = new URLSearchParams(queryString);
    return params.get(param);
}

function sellerAccountSetup(){
    const signin_header = document.getElementById("signin_heading");
    const logo = document.getElementById("logo");
    signin_header.textContent = "Get started selling on Amazon";
    logo.src = "../background_images/amazon_seller.png";
    logo.style.width = "300px";
    logo.style.height = "40px";
}

function logout(){
    fetch('http://localhost:8080/auth1/logout',{
        method: 'POST'
    })
    .then(data =>{
        console.log(data);
    })
    .catch(err =>{
        console.log("error: "+err)
    });
}

function signincall(){
    const overlay = document.getElementById("overshade");
    overlay.style.display = "block";
    signin();
    overlay.style.display = "none";
}
async function signin(){
    let email = document.getElementById("emailinput").value;
    let password = document.getElementById("password").value;
    if(validatename(email) && password.length>5){
        const loginRequest = {
            "username": email,
            "password": password
        };
        console.log(loginRequest);
        try {
            const response = await fetch('http://localhost:8080/auth1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginRequest),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
    
            localStorage.setItem('jwtToken', JSON.stringify({"id":data.id,"username": data.username,
                    "email": data.email,
                    "roles": data.roles,
                    "accessToken": data.accessToken,
                    "tokenType": data.tokenType
                })
            );
            setCookie('jwtToken',data.accessToken);
            launch_toast('Login successful');
            alert('Login successful');
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error:', error);
        }
    }
    else{
        launch_toast('Invalid email or password');
    }
}

function launch_toast(text) {
    var x = document.getElementById("snackbar");
    x.textContent = text;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function validatename(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}