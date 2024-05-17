function backtotop(){
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
}

function loadPage(pageUrl, value) {
  fetch(pageUrl)
  .then(response => response.text())
  .then(html => {
      value.innerHTML = html;
      if (typeof callback === 'function') {
          callback();
      }
  })
  .catch(error => {
      console.error('Error fetching page:', error);
      console.log(error);
  });
}

function adjustWidth() {
  var category = document.getElementById("category");
  if (category) {
      var selectedOption = category.options[category.selectedIndex];
      category.style.width = getTextWidth(selectedOption.textContent) + "px";
  } else {
      console.error("Element with id 'category' not found");
  }
}

function getTextWidth(text) {
  var span = document.createElement("span");
  span.textContent = text;
  span.style.visibility = "hidden";
  document.body.appendChild(span);
  var width = span.offsetWidth;
  document.body.removeChild(span);
  return width+36;
}