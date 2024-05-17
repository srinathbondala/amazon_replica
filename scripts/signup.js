document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting normally
    
    var formData = new FormData(this);
    var jsonObject = {};
    formData.forEach(function(value, key){
        jsonObject[key] = value;
    });

    // Make POST request to Spring Boot server
    // fetch('http://localhost:8080/submitForm', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(jsonObject)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     // Handle response from server (if needed)
    //     console.log(data);
    // })
    // .catch(error => {
    //     // Handle errors
    //     console.error('Error:', error);
    // });
    alert("Form submitted successfully!");
});