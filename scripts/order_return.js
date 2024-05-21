window.onload = function() {
    try {
        loadPage('../html_files/template.html', contentDiv , function() {
            adjustWidth();
        });
        loadPage('../html_files/footer-template.html', footerDiv);
    } catch (e) {
        alert(e);
    }
}
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');