// Get form values
const nameValue = document.getElementById('name-form');
const email = document.getElementById('email-form');
const phone = document.getElementById('phone-form');
const password = document.getElementById('password-form');
const confirmPassword = document.getElementById('renter-password');
const gender = document.querySelector('input[name="gender"]:checked').value;

// Validation for name input (letters and spaces only, min length 3)
function validateName(){
    // console.log(nameValue.value)
    // Todo: Real-time validation after user finishes typing or moves to another field (onblur event) --- IGNORE ---
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]{3,}$/
    nameValue.placeholder = ''; // Always reset placeholder first

    if (!nameValue.value) {
        nameValue.style.borderColor = 'red';
        nameValue.style.backgroundColor = '#ffe6e6';
        nameValue.placeholder = 'Name is required';
        return false;
    }
    else if (!nameRegex.test(nameValue.value)) {
        nameValue.style.borderColor = 'red';
        nameValue.style.backgroundColor = '#ffe6e6';
        nameValue.value = '';
        nameValue.placeholder = 'Name must be at least 3 characters and contain only letters and spaces';
        return false;
    }

    nameValue.style.borderColor = '';
    nameValue.style.backgroundColor = '';
    return true;
}
// Validation for email input with regex 
function validateEmail() {
    // Todo: Real-time validation after user finishes typing or moves to another field (onblur event) --- IGNORE ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    email.placeholder = ''; // Always reset placeholder first
    
    if (!email.value) {
        email.style.borderColor = 'red';
        email.style.backgroundColor = '#ffe6e6';
        email.placeholder = 'Email is required';
        return false;
    }
    else if (!emailRegex.test(email.value)) {
        email.style.borderColor = 'red';
        email.style.backgroundColor = '#ffe6e6';
        email.value = '';
        email.placeholder = 'Invalid email format';
        return false;
    }

    email.style.borderColor = '';
    email.style.backgroundColor = '';
    return true;
}
// Validation for phone input with regex
function validatePhone() {
    // Todo: Real-time validation after user finishes typing or moves to another field (onblur event) --- IGNORE ---
    const phoneRegex = /^0[0-9]{9}$/; // should start with 0 and be followed by 9 digits (total 10 digits)
    phone.placeholder = ''; // Always reset placeholder first

    if (!phone.value) {
        phone.style.borderColor = 'red';
        phone.style.backgroundColor = '#ffe6e6';
        phone.placeholder = 'Phone number is required';
        return false;
    }
    else if (!phoneRegex.test(phone.value)) {
        phone.style.borderColor = 'red';
        phone.style.backgroundColor = '#ffe6e6';
        phone.value = '';
        phone.placeholder = 'Phone number must be 10 digits and start with 0';
        return false;
    }

    phone.style.borderColor = '';
    phone.style.backgroundColor = '';
    return true;
}
// Validation for password input with regex (min length 8, 1 uppercase, 1 lowercase, 1 number)
function validatePassword() {
    // Todo: Real-time validation after user finishes typing or moves to another field (onblur event) --- IGNORE ---
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    password.placeholder = ''; // Always reset placeholder first

    if (!password.value) {
        password.style.borderColor = 'red';
        password.style.backgroundColor = '#ffe6e6';
        password.placeholder = 'Password is required';
        return false;
    }
    else if (!passwordRegex.test(password.value)) {
        password.style.borderColor = 'red';
        password.style.backgroundColor = '#ffe6e6';
        password.value = '';
        password.placeholder = 'Password must be at least 8 characters and include uppercase, lowercase, and a number';
        return false;
    }

    password.style.borderColor = '';
    password.style.backgroundColor = '';
    return true;
}
// Validation for confirm password input with regex (must match the password)
function validateConfirmPassword() {
    confirmPassword.placeholder = ''; // Always reset placeholder first

    if (!confirmPassword.value) {
        confirmPassword.style.borderColor = 'red';
        confirmPassword.style.backgroundColor = '#ffe6e6';
        confirmPassword.placeholder = 'Please confirm your password';
        return false;
    }
    else if (confirmPassword.value !== password.value) {
        confirmPassword.style.borderColor = 'red';
        confirmPassword.style.backgroundColor = '#ffe6e6';
        confirmPassword.value = '';
        confirmPassword.placeholder = 'Passwords do not match';
        return false;
    }

    confirmPassword.style.borderColor = '';
    confirmPassword.style.backgroundColor = '';
    return true;
}
// Validation for all inputs (no empty fields, password match, terms accepted)
function validateForm() {
    // Check for each validation function and return false if any of them fail
    // console.log({s
    //     "name" : nameValue.value,
    //     "email" : email.value,
    //     "phone" : phone.value,
    //     "password" : password.value,
    //     "confirmPassword" : confirmPassword.value
    // })
    if (!validateName() || !validateEmail() || !validatePhone() || !validatePassword() || !validateConfirmPassword()) {
        return false;
    }

    const termsChecked = document.getElementById('terms').checked;
    // console.log('Terms checked:', termsChecked); use for debugging    
    if(!termsChecked){
        const termErrorMsg = document.getElementById("term-error")
        termErrorMsg.style.display = "block"
        return false;
    }
    return true;
}
// Todo: Modal popup to show user info instead of alert (hide form and show modal with user info, add close button to modal to hide it and show form again)
function showModal(userInfo) {
    const modal = document.getElementById('info-modal');
    const modalContent = document.getElementById('modal-body');

    modalContent.textContent = userInfo;
    // Use Bootstrap's modal API with backdrop disabled
    const bootstrapModal = new bootstrap.Modal(modal, {
        backdrop: false
    });
    bootstrapModal.show();
}

const closeButton = document.getElementById('close-btn');
closeButton.addEventListener('click', function () {
    const modal = document.getElementById('info-modal');
    const bootstrapModal = bootstrap.Modal.getInstance(modal);
    if (bootstrapModal) {
        bootstrapModal.hide();
    }
});

// Real-time validation using blur events
nameValue.addEventListener('blur', validateName);
email.addEventListener('blur', validateEmail);
phone.addEventListener('blur', validatePhone);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);

// Reset error state when user starts typing
nameValue.addEventListener('input', function () {
    nameValue.style.borderColor = '';
    nameValue.style.backgroundColor = '';
    nameValue.placeholder = '';
});

email.addEventListener('input', function () {
    email.style.borderColor = '';
    email.style.backgroundColor = '';
    email.placeholder = '';
});

phone.addEventListener('input', function () {
    phone.style.borderColor = '';
    phone.style.backgroundColor = '';
    phone.placeholder = '';
});

password.addEventListener('input', function () {
    password.style.borderColor = '';
    password.style.backgroundColor = '';
    password.placeholder = '';
});

confirmPassword.addEventListener('input', function () {
    confirmPassword.style.borderColor = '';
    confirmPassword.style.backgroundColor = '';
    confirmPassword.placeholder = '';
});

// Reset checkbox error message when user checks/unchecks
document.getElementById('terms').addEventListener('change', function () {
    const termErrorMsg = document.getElementById("term-error");
    if (this.checked) {
        termErrorMsg.style.display = "none";
    }
});

// // Test data for testing form submission
// const fillDataBtn = document.getElementById('fill-test-data');
// fillDataBtn.addEventListener('click', function () {
//     nameValue.value = 'John Doe';
//     email.value = 'johndoe@example.com';
//     phone.value = '0123456789';
//     password.value = 'Password123';
//     confirmPassword.value = 'Password123';
// });

// Event listener for testing form submission
document.getElementById('submit-btn').addEventListener('click', function (event) {
    event.preventDefault();
    
    // console.log('Form validation results:'); use for debugging
    // console.log('Name valid:', validateName());
    // console.log('Email valid:', validateEmail());
    // console.log('Phone valid:', validatePhone());
    // console.log('Password valid:', validatePassword());
    // console.log('Confirm password valid:', validateConfirmPassword());
 
    if (!validateForm()) {
        console.log('Form validation failed');
        return;
    }
    
    console.log('Form validation passed, showing modal');
    showModal(`Name: ${nameValue.value}`);
});

