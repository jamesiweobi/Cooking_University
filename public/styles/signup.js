const firstName = document.getElementsByName('firstName')[0];
const form = document.getElementsByName('form-layout')[0];
const lastName = document.getElementsByName('lastName')[0];
const username = document.getElementsByName('username')[0];
const password = document.getElementsByName('password')[0];
const repeatPassword = document.getElementsByName('repeatPassword')[0];
const submit = document.querySelector('.btn');
const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');

let timeout;
submit.addEventListener('click', async (e) => {
    e.preventDefault();
    if (password.value !== repeatPassword.value || password.length < 6) {
        return alertMessage(
            errorBox,
            'error-message',
            'Password and Repeat Password do not match! or password less than 6'
        );
    }
    const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
    };

    const result = await axios.post('/user/', formData);
    alertMessage(loadingBox, 'loading-message', 'Loading');
    const { data } = result;

    if (data.status === 'Failed') {
        clearTimeOut(timeout);
        alertMessage(errorBox, 'error-message', data.message);
    }

    if (data.status === 'Success') {
        clearTimeOut(timeout);
        alertMessage(successBox, 'success-message', data.message);
        window.location.replace(`/signin`);
    }
});

const alertMessage = (element, messageClass, message) => {
    element.classList.toggle('visible');
    const innerMessage = document.querySelector(`.${messageClass}`);
    innerMessage.innerHTML = message;
    timeout = setTimeout(() => {
        element.classList.toggle('visible');
    }, 5000);
};

const clearTimeOut = (time) => {
    clearTimeout(time);
};
