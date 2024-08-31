document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let repassword = document.getElementById("repassword").value;
    let phone = document.getElementById("mobile").value;
    if(Validite(name,email,password,phone,repassword)){
        let bodyitem = {
            "username": name.trim(),
            "email": email.trim(),
            "password": password,
            "phone":phone.trim(),
            "roles": ["ROLE_USER"]
          };
        console.log(bodyitem);
        fetch('https://amazon-server-1-27sp.onrender.com/auth1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyitem)
        })
        .then(response => {
            if (!response.ok) {
                alert("User Already Exists");
                throw new Error('Failed to register user: ' + response.statusText);
            }
            if (response.status === 204) {
                console.log('User registered successfully');
                alert("User registered successfully");
                window.location.href = '../index.html';
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
function Validite(name,email,password,phone,repassword){
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

    if(phone.trim() === ""){
        alert("Please enter your Mobile Number.");
        return false;
    }
    const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!pattern.test(phone)) {
        alert("Enter valid Mobile Number");
        return "false";
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