window.onload = function() {
    loadPage('../html_files/template.html', contentDiv , function() {
        adjustWidth();
    });
    loadPage('../html_files/footer-template.html', footerDiv);
};
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');