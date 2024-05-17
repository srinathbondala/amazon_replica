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