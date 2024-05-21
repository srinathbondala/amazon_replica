document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    if(Validite(name,email,password,repassword)){
        let bodyitem = {
            "username": name,
            "email": email,
            "password": password,
            "roles": ["ROLE_USER"]
          };
        console.log(bodyitem);
        fetch('http://localhost:8080/auth1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyitem)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user: ' + response.statusText);
            }
            if (response.status === 204) {
                console.log('User registered successfully');
            } else {
                return response.text();
            }
        })
        .then(data => {
            console.log('Response from server:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});
function Validite(name,email,password,repassword){
    if (name.trim() === "") {
        alert("Please enter your name.");
        return false;
    }

    if (email.trim() === "") {
        alert("Please enter your email.");
        return false;
    }
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (password.length < 6 && passwordcheck(password)) {
        alert("Password must be at least 6 characters.");
        return false;
    }

    if (password !== repassword) {
        alert("Passwords do not match.");
        return false;
    }

    return true;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function passwordcheck(password){
    return true;
}