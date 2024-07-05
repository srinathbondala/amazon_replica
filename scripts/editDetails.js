window.onload = async function() {
    try {
        await loadPage('../html_files/footer-template.html', footerDiv);
        await loadPageh('../html_files/template.html', contentDiv);
        let urlParams = new URLSearchParams(window.location.search);
        let a=urlParams.get('parms');
        document.getElementById("parm").innerHTML = "Your "+a;
        document.title="Your "+a;
        document.getElementById("MainHeading").textContent="Your "+a;
        if(a=="Addresses"){
            loadAdressUpdate();
        }
        else if(a=="email" || a=="phoneNumber" || a=="password" || a=="userName"){
            loadUserUpdate();
        }
    } catch (e) {
        alert(e);
    }
}
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
function loadUserUpdate(){
    alert("update");
}
function loadAdressUpdate(){
    alert("address");
}