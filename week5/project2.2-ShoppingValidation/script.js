// Fetching form values
const productName = document.getElementById('prodName').value;
const amount = document.getElementById('amount').value;
const deliveryDate = document.getElementById('deliveryDate').value;
const recieveLocation = document.getElementById('receiveLocation').value;
const note = document.getElementById('note').value;
const paymentOption = document.querySelector('input[name="payOptions"]:checked')?.value || 'Not selected';

// Get form elements for validation
const prodNameSelect = document.getElementById('prodName');
const amountInput = document.getElementById('amount');
const deliveryDateInput = document.getElementById('deliveryDate');
const receiveLocationInput = document.getElementById('receiveLocation');
const noteInput = document.getElementById('note');
const paymentOptions = document.querySelectorAll('input[name="payOptions"]');

const submitBtn = document.getElementById('submit-btn');
const confirmBtn = document.getElementById('confirm-btn');
const cancelBtn = document.getElementById('cancel-btn');
const totalPrice = document.getElementById('totalPrice')
const wordCounter = document.getElementById('wordCounter');
const confirmationModal = document.getElementById('orderModal');


// Dummy prices data for testing total price calculation
const productPrices = {
    'laptop': 1000,
    'phone': 500,
    'tablet': 300,
    'headphones': 100,
    'smartwatch': 700
};

function updateWordCount() {
    const noteLength = noteInput.value.length;
    wordCounter.textContent = `${noteLength}/200`;
    if (noteLength > 200) {
        wordCounter.style.color = 'red';
    } else {
        wordCounter.style.color = '';
    }
}
// Function to calculate total price based on selected product and amount
function calculateTotalPrice() {
    const prodNameSelect = document.getElementById('prodName');
    const selectedValue = prodNameSelect.value;
    const amountInput = document.getElementById('amount');
    const quantity = parseInt(amountInput.value);
    console.log('Selected product:', selectedValue); // Debugging
    console.log('Quantity:', quantity); // Debugging

    if (productPrices[selectedValue.toLowerCase().trim()] && quantity > 0) {
        return productPrices[selectedValue.toLowerCase().trim()] * quantity;
    }
    return 0;
}

// ProdName validation error message customization (selected from dropdown, required)
function validateProductName() {
    const prodNameSelect = document.getElementById('prodName');
    const prodLabel = document.getElementById('prodLabel');
    const selectedValue = prodNameSelect.value;
    if (!selectedValue) {
        prodNameSelect.style.borderColor = 'red';
        prodNameSelect.value = '';
        prodLabel.textContent = 'Please select a product';
        prodLabel.style.color = 'red';
        return false;
    }
    prodLabel.textContent = 'Tên sản phẩm';
    prodNameSelect.style.borderColor = '';
    prodNameSelect.style.backgroundColor = '';
    prodLabel.style.color = '';
    return true;
}
// Amount validation error message customization
function validateAmount() {
    const amountInput = document.getElementById('amount');
    const amountLabel = document.getElementById('amountLabel');
    const amount = parseInt(amountInput.value);
    if (!amountInput.value) {
        amountInput.style.borderColor = 'red';
        amountInput.value = '';
        amountLabel.textContent = 'Amount is required';
        amountLabel.style.color = 'red';
        return false;
    }
    if (amount < 1 || amount > 99) {
        amountInput.style.borderColor = 'red';
        amountInput.value = '';
        amountLabel.textContent = 'Amount must be between 1 and 99';
        amountLabel.style.color = 'red';
        return false;
    }
    amountInput.style.borderColor = '';
    amountLabel.textContent = 'Số lượng';
    amountLabel.style.color = '';
    return true;
}
// Date validation (cannot be past date, choosing range no more than 1 month)
function validateDeliveryDate() {
    const deliveryDateInput = document.getElementById('deliveryDate');
    const selectedDate = new Date(deliveryDateInput.value);
    const currentDate = new Date();
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 1);

    if (!deliveryDateInput.value) {
        deliveryDateInput.style.borderColor = 'red';
        deliveryDateInput.value = '';
        deliveryDateLabel.textContent = 'Delivery date is required';
        deliveryDateLabel.style.color = 'red';
        return false;
    }
    if (selectedDate < currentDate) {
        deliveryDateInput.style.borderColor = 'red';
        deliveryDateInput.value = '';
        deliveryDateLabel.textContent = 'Delivery date cannot be in the past';
        deliveryDateLabel.style.color = 'red';
        return false;
    }
    if (selectedDate > maxDate) {
        deliveryDateInput.style.borderColor = 'red';
        deliveryDateInput.value = '';
        deliveryDateLabel.textContent = 'Delivery date must be within 1 month';
        deliveryDateLabel.style.color = 'red';
        return false;
    }
    deliveryDateInput.style.borderColor = '';
    deliveryDateLabel.textContent = 'Ngày giao hàng';
    deliveryDateLabel.style.color = '';
    return true;
}
// recieveLocation validation (length >= 10, required)
function validateRecieveLocation() {
    const receiveLocationInput = document.getElementById('receiveLocation');
    const receiveLocationLabel = document.getElementById('receiveLocationLabel');
    const location = receiveLocationInput.value.trim();
    if (!location) {
        receiveLocationInput.style.borderColor = 'red';
        receiveLocationInput.value = '';
        receiveLocationLabel.textContent = 'Receive location is required';
        receiveLocationLabel.style.color = 'red';
        return false;
    }
    if (location.length < 10) {
        receiveLocationInput.style.borderColor = 'red';
        receiveLocationInput.value = '';
        receiveLocationLabel.textContent = 'Receive location must be at least 10 characters';
        receiveLocationLabel.style.color = 'red';
        return false;
    }
    receiveLocationInput.style.borderColor = '';
    receiveLocationLabel.textContent = 'Địa điểm nhận';
    receiveLocationLabel.style.color = '';
    return true;
}
// Note validation (no more than 200 characters)
function validateNote() {
    const noteInput = document.getElementById('note');
    const noteLabel = document.getElementById('noteLabel');
    const note = noteInput.value.trim();
    if (note.length > 200) {
        noteInput.style.borderColor = 'red';
        noteInput.value = '';
        noteLabel.textContent = 'Note must be no more than 200 characters';
        noteLabel.style.color = 'red';
        return false;
    }
    noteInput.style.borderColor = '';
    noteLabel.textContent = 'Ghi chú';
    noteLabel.style.color = '';
    return true;
}
// Payment option validation (required)
function validatePaymentOption() {
    const paymentOptions = document.querySelectorAll('input[name="payOptions"]');
    const paymentLabel = document.getElementById('paymentLabel');
    let selectedOption = null;
    paymentOptions.forEach(option => {
        if (option.checked) {
            selectedOption = option.value;
        }
    });
    if (!selectedOption) {
        paymentLabel.textContent = 'Please select a payment option';
        paymentLabel.style.color = 'red';
        return false;
    }
    paymentLabel.textContent = 'Phương thức thanh toán';
    paymentLabel.style.color = '';
    return true;
}
// General validation function to check all fields before allowing submission, showing error messages next to each field if validation fails (can be done in the submit event listener)
function validateForm() {
    if (!validateProductName() || !validateAmount() || !validateDeliveryDate() || !validateRecieveLocation() || !validateNote() || !validatePaymentOption()) {
        return false;
    }
    return true;
}
// Function to show confirmation modal
function showConfirmationModal() {
    confirmationModal.style.display = 'block';
    const orderDetails = document.getElementById('orderDetails');
    orderDetails.innerHTML = `
        <p><strong>Tên sản phẩm:</strong> ${document.getElementById('prodName').value}</p>
        <p><strong>Số lượng:</strong> ${document.getElementById('amount').value}</p>
        <p><strong>Ngày giao hàng:</strong> ${document.getElementById('deliveryDate').value}</p>
        <p><strong>Địa điểm nhận:</strong> ${document.getElementById('receiveLocation').value}</p>
        <p><strong>Ghi chú:</strong> ${document.getElementById('note').value}</p>
        <p><strong>Phương thức thanh toán:</strong> ${document.querySelector('input[name="payOptions"]:checked')?.value || 'Not selected'}</p>
        <p><strong>Tổng giá:</strong> $${calculateTotalPrice()}</p>
    `;
    const bootstrapModal = new bootstrap.Modal(confirmationModal, {
        backdrop: false,
    });
    bootstrapModal.show();
    confirmBtn.addEventListener('click', function () {
        console.log('Order confirmed');
        document.getElementById('modal-body').innerHTML = '<p>Order confirmed successfully!</p>';
        document.getElementById('confirm-btn').style.display = 'none';
        document.getElementById('cancel-btn').style.display = 'none';
    });
    cancelBtn.addEventListener('click', function () {
        console.log('Order cancelled');
        confirmationModal.style.display = 'none';
        bootstrapModal.hide();
    });
}

// Real-time validation after user finishes typing or moves to another field (onblur event) for each input field
prodNameSelect.addEventListener('blur', validateProductName);
amountInput.addEventListener('blur', validateAmount);
deliveryDateInput.addEventListener('blur', validateDeliveryDate);
receiveLocationInput.addEventListener('blur', validateRecieveLocation);
noteInput.addEventListener('blur', validateNote);
paymentOptions.forEach(option => {
    option.addEventListener('change', validatePaymentOption);
});

// Reset error messages and styles when user starts correcting the input (oninput event)
prodNameSelect.addEventListener('input', function () {
    prodNameSelect.style.borderColor = '';
    const prodLabel = document.getElementById('prodLabel');
    prodLabel.textContent = 'Tên sản phẩm'; // Todo: Real-time total price calculation when user changes product or amount (can be done in the oninput event of product and amount fields)
    prodLabel.style.color = '';
    totalPrice.textContent = calculateTotalPrice(); // Update total price in real-time when product changes
});
amountInput.addEventListener('input', function () {
    amountInput.style.borderColor = '';
    const amountLabel = document.getElementById('amountLabel');
    amountLabel.textContent = 'Số lượng'; // Todo: Real-time total price calculation when user changes product or amount (can be done in the oninput event of product and amount fields)
    amountLabel.style.color = '';
    totalPrice.textContent = calculateTotalPrice(); // Update total price in real-time when amount changes
});
deliveryDateInput.addEventListener('input', function () {
    deliveryDateInput.style.borderColor = '';
    const deliveryDateLabel = document.getElementById('deliveryDateLabel');
    deliveryDateLabel.textContent = 'Ngày giao hàng';
    deliveryDateLabel.style.color = '';
});
receiveLocationInput.addEventListener('input', function () {
    receiveLocationInput.style.borderColor = '';
    const receiveLocationLabel = document.getElementById('receiveLocationLabel');
    receiveLocationLabel.textContent = 'Địa điểm nhận';
    receiveLocationLabel.style.color = '';
});
noteInput.addEventListener('input', function () {
    noteInput.style.borderColor = '';
    const noteLabel = document.getElementById('noteLabel');
    noteLabel.textContent = 'Ghi chú';
    noteLabel.style.color = '';

    updateWordCount(); // Update word count in real-time when user types in the note field
});
paymentOptions.forEach(option => {
    option.addEventListener('change', function () {
        const paymentLabel = document.getElementById('paymentLabel');
        paymentLabel.textContent = 'Phương thức thanh toán';
        paymentLabel.style.color = '';
    });
});

// Function to print all form information to console (testing purpose)
function printFormInfo() {
    const formData = {
        productName: document.getElementById('prodName').value,
        amount: document.getElementById('amount').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        receiveLocation: document.getElementById('receiveLocation').value,
        note: document.getElementById('note').value,
        paymentOption: document.querySelector('input[name="payOptions"]:checked')?.value || 'Not selected'
    };
    console.log(formData);
}

// Event listener for form submission
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (validateForm()) {
        printFormInfo();
        console.log(calculateTotalPrice());
        showConfirmationModal();
    } else {
        console.log('Form validation failed');
    }
});

// Fill dummy data event listener for testing form submission (you can remove this later)
const dummyDataBtn = document.getElementById('dummy-btn');
dummyDataBtn.addEventListener('click', function () {
    document.getElementById('prodName').value = 'Laptop';
    document.getElementById('amount').value = '10';
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 7); // Set delivery date to 7 days from today
    document.getElementById('deliveryDate').value = deliveryDate.toISOString().split('T')[0];
    document.getElementById('receiveLocation').value = '123 Main Street, City';
    document.getElementById('note').value = 'Please deliver between 9 AM and 5 PM.';
    document.querySelector('input[name="payOptions"][value="credit"]').checked = true;
    updateWordCount(); // Update word count when dummy data is filled
});