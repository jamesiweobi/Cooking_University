const form = document.getElementsByName('form-layout')[0];
const username = document.getElementsByName('username')[0];
const password = document.getElementsByName('password')[0];
const submit = document.querySelector('.btn');
const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    const formData = {
        username: username.value,
        password: password.value,
    };
    try {
        const result = await axios.post('/user/login', formData);
        console.log(result);
        alertMessage(loadingBox, 'loading-message', 'Loading');
        if (result.status === 200) {
            const data = result.data[0];
            alertMessage(successBox, 'success-message', 'User logged in');
            console.log(`/recipes-page/${data.id}`);
            window.location.replace(`/recipes-page/${data.id}`);
        } else {
            alertMessage(
                errorBox,
                'error-message',
                'Password or Username wrong'
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

const alertMessage = (element, messageClass, message) => {
    element.classList.toggle('visible');
    const innerMessage = document.querySelector(`.${messageClass}`);
    innerMessage.innerHTML = message;
    setTimeout(() => {
        element.classList.toggle('visible');
    }, 5000);
};
