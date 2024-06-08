window.onload = function() {
    try {
        loadPage('../html_files/footer-template.html', footerDiv);
        loadPageh('../html_files/template.html', contentDiv);
    } catch (e) {
        alert(e);
    }
}
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
function closeVerifyPage(){
    const overshad1 = document.getElementById("overshade1");
    overshad1.style.display="none";
}