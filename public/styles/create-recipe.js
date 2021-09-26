const meal = document.getElementsByName('meal')[0];
const ingredients = document.getElementsByName('ingredients')[0];
const prepMethod = document.getElementsByName('prepMethod')[0];
const description = document.getElementsByName('description')[0];
const foodImageURL = document.getElementsByName('foodImageURL')[0];
const category = document.getElementsByName('category')[0];
const submit = document.querySelector('.btn');
const successBox = document.getElementById('successBox');
const loadingBox = document.getElementById('loadingBox');
const errorBox = document.getElementById('errorBox');
const id = document.getElementById('userId');

submit.addEventListener('click', async (e) => {
    e.preventDefault();
    let ingreArr = ingredients.value.split(' ');
    const formData = {
        createBy: id.value,
        meal: meal.value,
        ingredients: ingreArr,
        prepMethod: prepMethod.value,
        description: description.value,
        foodImageURL: foodImageURL.value,
        category: category.value,
    };
    try {
        const result = await axios.post(
            'http://localhost:4000/recipe',
            formData
        );
        alertMessage(loadingBox, 'loading-message', 'Loading');
        const { data } = result;
        if (data.status === 'success') {
            alertMessage(
                successBox,
                'success-message',
                'Recipe created Successfully'
            );
            window.location.replace(`/recipes-page/${data.id}`);
        } else {
            alertMessage(errorBox, 'error-message', 'Failed to create Recipe');
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
