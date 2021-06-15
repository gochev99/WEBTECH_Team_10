const sendForm = event => {
    event.preventDefault();

    const fullName = document.querySelector('#register-full-name').value;
    const username = document.querySelector('#register-username').value;
    const email = document.querySelector('#register-email').value;
    const password = document.querySelector('#register-password').value;
    // const repeatPassword = document.querySelector('#register-repeat-password').value;


    const user = {
        "fullName": fullName,
        "username": username,
        "email": email,
        "password": password
    };

    console.log(user);
    localStorage.setItem('username', username);

    const options = {
        method: 'POST',
        mode: 'cors',
        withCredentials: true,
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    };

    const url = 'http://localhost:3002/register';

    fetch(url, options)
        // .then(response => response.json())
        .then(response => redirect(response))
        .catch(error => console.log(error));
};

const redirect = response => {
    console.log(response);
    console.log(response.ok);
    if (response.ok) {
        window.location = '../home/home.html';
    } else {
        console.log(`Error! ${response.error}`);
    }
}

(function() {
    const register = document.querySelector('#login-link');

    register.addEventListener('click', sendForm);
})();