window.onload = function() {
    loadPage('../html_files/footer-template.html', footerDiv);
    loadPageh('../html_files/template.html', contentDiv );
    var img = document.getElementById('cartItemImg');
    let itemimg = JSON.parse(localStorage.getItem('CartItems'));
    img.src = itemimg[itemimg.length-1].product.imageUrl;
    if(document.getElementById('cartItems')!=null)
        loadCartData();
    else{
        console.log('cartItems not found');
    }
    loadSuggesions(suggestedDiv);
};

const contentDiv = document.getElementById('content');
const footerDiv=document.getElementById('footer');
const suggestedDiv=document.getElementById('suggestions');
function loadBuyPage() {
    alert('Payment');
}
