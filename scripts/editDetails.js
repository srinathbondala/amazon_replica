window.onload = async function() {
    try {
        await loadPage('../html_files/footer-template.html', footerDiv);
        await loadPageh('../html_files/template.html', contentDiv);
        let urlParams = new URLSearchParams(window.location.search);
        let a=urlParams.get('parms');
        let name=a;
        if(a=="UserName"){
            name="name";
        }
        else if(a=="PhoneNumber"){
            name="number";
        }
        document.getElementById("parm").innerHTML = "Your "+a;
        document.title="Your "+a;
        if(a=="Addresses"){
            document.getElementById("MainHeading").textContent="Your "+name;
            loadAdressUpdate();
        }
        else if(a=="Email" || a=="PhoneNumber" || a=="Password" || a=="UserName"){
            loadUserUpdate(a);
        }
    } catch (e) {
        alert(e);
    }
}
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
function loadUserUpdate(a){
    if(a=="Email"){
        editEmail();
    }
    else if(a=="PhoneNumber"){
        editPhoneNumber();
    }
    else if(a=="Password"){
        editPassword();
    }
    else if(a=="UserName"){
        editUserName();
    }
}
/*-------------------------------------------Name functions--------------------------------------*/
function editUserName(){
    document.getElementById("nameContainer").style.display="block";
    document.getElementById("MainHeading").textContent="Change your Name";
}
function UpdateName(){
    let name = document.getElementById("newname").value;
    if(name==""){
        alert("Please enter a name");
        return;
    }
    UpdateNameDatabase(name.trim());
}
async function UpdateNameDatabase(data){
    const response = await fetch("http://localhost:8080/user/updateProfile/updateName",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie('jwtToken')}`
        },
        body: JSON.stringify(data)
    });
    if(response.status==200){
        let userData = JSON.parse(localStorage.getItem("UserItems"));
        userData.username = data.name;
        localStorage.setItem("UserItems",JSON.stringify(userData));
        alert("Name Updated Successfully");
        window.location.href="./profile.html?successCodes=SUCCESS_CHANGE_NAME";
    }
}

/*-------------------------------------------Email functions----------------------------------------*/
function editEmail(){
    document.getElementById("MainHeading1").textContent="Add an email address";
    document.getElementById("emailContainer").style.display="block";
    document.getElementsByClassName('logic')[0].classList.add('addclasslist');
}

function SendOtp(){
    let email = document.getElementById("email").value;
    if(email==""){
        alert("Please enter an email");
        return;
    }
    alert("OTP sent to your email");
}

/*-------------------------------------------Phone functions--------------------------------------*/
function editPhoneNumber(){
    document.getElementById("phoneContainer").style.display="block";
    document.getElementById("MainHeading").textContent="Change your Phone Number";
    document.getElementById("oldphone").textContent=JSON.parse(localStorage.getItem("UserItems")).phone;
}
function updateNumber(){
    let number = document.getElementById("phoneadd").value;
    if(number==""){
        alert("Please enter a number");
        return;
    }
    UpdateNumberDatabase(number.trim());
}
function ClosePhoneDiv(){
    history.back();
}

async function UpdateNumberDatabase(data){
    const response = await fetch("http://localhost:8080/user/updateProfile/updatePhone",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie('jwtToken')}`
        },
        body: JSON.stringify(data)
    });
    if(response.status==200){
        let userData = JSON.parse(localStorage.getItem("UserItems"));
        userData.phone = data;
        localStorage.setItem("UserItems",JSON.stringify(userData));
        alert("Phone Number Updated Successfully");
        window.location.href="./profile.html?successCodes=SUCCESS_CHANGE_PHONE";
    }
}

/*-------------------------------------------Address functions--------------------------------------*/
function loadAdressUpdate(){
    document.getElementById("addressContainer").style.display="flex";
    try{
    let addressDiv = document.getElementById("addressContainer");
    let content="";
    let userData1 = JSON.parse(localStorage.getItem("UserItems"));
    let userData = userData1.details;
    let idex=0;
    userData.forEach((element,index) => {
        if(element.id == userData1.defaultAddress){
            idex = index;
            content+=` 
            <div class="AddressSize addressBorder">
                <div style="padding: 15px;">
                    <span class="Address-span"><p style="color: #565959 !important;" class="small-size">Default:</p> <img src="/background_images/logo.jpeg" alt="Amazon :)" class="innerAddressImg"></img></span>
                </div>
                <hr>
                <ul class="innerAdderss">
                    <li><b>${element.name}</b></li>
                    <li><p>${element.address}</p></li>
                    <li><p>${element.city}, ${element.state} ${element.pincode}</p></li>
                    <li><p>${element.country}</p></li>
                    <li><p>Phone number: ${element.phone}</p></li><br>
                    <span><a href="#" class="a" onclick="editAddress('${String(element.id)}');" >Edit</a> &nbsp;|&nbsp; <a href="#" class="a" onclick="deleteAddress('${element.id}');">Remove</a></span>
                </ul>
            </div>`;
        }
    });
    userData.forEach((element,index) => {
        if(index!=idex){
        content+=`
        <div class="AddressSize addressBorder">
            <ul class="innerAdderss">
                <li><b>${element.name}</b></li>
                <li><p>${element.address}</p></li>
                <li><p>${element.city}, ${element.state} ${element.pincode}</p></li>
                <li><p>${element.country}</p></li>
                <li><p>Phone number: ${element.phone}</p></li><br>
                <span><a href="#" class="a" onclick="editAddress('${String(element.id)}');">Edit</a> &nbsp;|&nbsp; <a href="#" class="a" onclick="deleteAddress('${element.id}');">Remove</a></span>
                <span> &nbsp;|&nbsp; <a href="#" class="a" onclick="setDefaultAddress('${String(element.id)}');">Set as default</a></span>
            </ul>
        </div>`;}
    });
    addressDiv.innerHTML+=content;}
    catch(e){
        console.log(e);
    }
}

async function deleteAddress(element){
    let response = await fetch("http://localhost:8080/user/deleteAddress",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie('jwtToken')}`
        },
        body: JSON.stringify({id: element})
    });
    if(response.status==200){
        let userData = JSON.parse(localStorage.getItem("UserItems"));
        let details = userData.details;
        let index = details.findIndex((element1) => element1.id==element);
        details.splice(index,1);
        userData.details = details;
        localStorage.setItem("UserItems",JSON.stringify(userData));
        location.reload();
    }
    else{
        alert("Error in deleting address");
        return;
    }
}

function editAddress(selfId){
    // console.log(selfId);
    showloader();
    scrollTo(0,0);
    setTimeout(() => {
        hideloader();
        document.getElementById("addAddressHiden").style.display="block";
        document.body.style.overflow = "hidden";
    }, 500);
    document.getElementById("AddressForm").reset();
    let userData = JSON.parse(localStorage.getItem("UserItems")).details;
    for(let i=0;i<userData.length;i++){
        if(userData[i].id==selfId){
            userData=userData[i];
            document.getElementById("name").value=userData.name;
            document.getElementById("phone").value=userData.phone;
            document.getElementById("address").value=userData.address;
            document.getElementById("city").value=userData.city;
            document.getElementById("state").value=userData.state;
            document.getElementById("pincode").value=userData.pincode;
            document.getElementById("country").value=userData.country;
            document.getElementById("AddressButton").value="Update Address";
            break;
        }
    }
}

function displayAddressDiv(){
    // alert("adddata");
    showloader();
    scrollTo(0,0);
    setTimeout(() => {
        hideloader();
        document.getElementById("addAddressHiden").style.display="block";
        document.body.style.overflow = "hidden";
    }, 500);
    document.getElementById("AddressForm").reset();
    document.getElementById("name").value=JSON.parse(localStorage.getItem("UserItems")).username;
    document.getElementById("phone").value=JSON.parse(localStorage.getItem("UserItems")).phone;
}

function CloseAddressDiv(){
    document.getElementById("addAddressHiden").style.display="none";
    document.body.style.overflow = "auto";
}

function addAdressToDatabase(){
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let pincode = document.getElementById("pincode").value;
    let country = document.getElementById("country").value;
    let phone = document.getElementById("phone").value;
    if(validateCridentials(name,address,city,state,pincode,country,phone)){

            sendDataBase(name,address,city,state,pincode,country,phone);
    }
}
function validateCridentials(name,address,city,state,pincode,country,phone){
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(name=="" || address=="" || city=="" || state=="" || pincode=="" || country=="" || phone==""){
        alert("Please fill all the fields");
        return false;
    }
    else if(!pattern.test(phone) ){
        alert("Enter valid Mobile Number");
        return false;
    }
    return true;
}

async function setDefaultAddress(element){
    const response = await fetch("http://localhost:8080/user/defaultAddressSet",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie('jwtToken')}`
        },
        body: JSON.stringify({id: element})
    });
    if(response.status==200){
        let userData = JSON.parse(localStorage.getItem("UserItems"));
        userData.defaultAddress = element;
        localStorage.setItem("UserItems",JSON.stringify(userData));
        location.reload();
    }
}

async function sendDataBase(name,address,city,state,pincode,country,phone){
    let userData = JSON.parse(localStorage.getItem("UserItems"));
    let details = userData.details;
    let data = {
        address: address.toUpperCase(),
        city: city.toUpperCase(),
        name: name.toUpperCase(),
        state: state.toUpperCase(),
        pincode: pincode,
        country: country,
        phone: phone
    }
    const response = await fetch("http://localhost:8080/user/addAddress",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie('jwtToken')}`
        },
        body: JSON.stringify(data)
    });
    if(response.status!=200){
        alert("Error in adding address "+response.body);
        return;
    }
    else{
        details.push(data);
        userData.details = details;
        localStorage.setItem("UserItems",JSON.stringify(userData));
        alert("Address Added Successfully");
        CloseAddressDiv();
        location.reload();
    }
}