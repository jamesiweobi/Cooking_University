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

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    if (password.value !== repeatPassword.value) {
        alertMessage(
            errorBox,
            'error-message',
            'Password and Repeat Password do not match!'
        );
    }
    const formData = {
        firstName: firstName.value,
        lastName: lastName.value,
        username: username.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
    };
    try {
        const result = await axios.post('/user/', formData);
        alertMessage(loadingBox, 'loading-message', 'Loading');
        const resStatus = result?.data.data.result.status;
        if (resStatus === 'Failed') {
            alertMessage(
                errorBox,
                'error-message',
                result.data.data.result.message
            );
        }

        if (result.data.status === 'Success') {
            alertMessage(
                successBox,
                'success-message',
                'User Created succesfully, Click on the Login button to proceed'
            );
        }
    } catch (error) {
        alertMessage(
            errorBox,
            'error-message',
            'Something Went wrong please try again'
        );
    }
});

const alertMessage = (element, messageClass, message, duration) => {
    element.classList.toggle('visible');
    const innerMessage = document.querySelector(`.${messageClass}`);
    innerMessage.innerHTML = message;
    setTimeout(() => {
        element.classList.toggle('visible');
    }, 5000);
};
