window.onload = function() {
    loadPageh('../html_files/template.html', contentDiv );
    loadPage('../html_files/footer-template.html', footerDiv);
    var img = document.getElementById('cartItemImg');
    let itemimg = JSON.parse(localStorage.getItem('CartItems'));
    img.src = itemimg[itemimg.length-1].product.imageUrl;
    if(document.getElementById('cartItems')!=null)
        loadCartData();
    else{
        console.log('cartItems not found');
    }
};
const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
function loadBuyPage() {
    alert('Payment');
}