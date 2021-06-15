// const sendRequest = (url, options, successCallback, errorCallback) => {
//     fetch(url, options)
//         .then(response => response.json())
//         .then(response => successCallback(response))
//         .catch(error => errorCallback(error));
// };

const login = event => {
    event.preventDefault();
    
    const username = document.querySelector('#input_username').value;
    const password = document.querySelector('#input_password').value;

    const user = {
        username,
        password
    };

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

    const url = 'http://localhost:3002/login';

    // sendRequest(url, options, loginUser, handleError);

    fetch(url, options)
        .then(response => response.json())
        .then(response => loginUser(response))
        .catch(error => console.log(error));

    console.log("send");
};

const loginUser = (data) => {
    console.log('login')
    if (data.error) {
        const errors = document.getElementsByClassName('forgot');
        errors.innerHTML = data.error;
        console.log("error!");
    } else {
        console.log("OK");
        window.location = '../html/home.html';
        //return user.email;
    }
}

(function() {
    const loginBtn = document.querySelector('#login-link');

    console.log("attached!")

    loginBtn.addEventListener('click', login);
})();