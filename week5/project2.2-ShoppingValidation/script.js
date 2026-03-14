
const productName = document.getElementById('prodName').value;
const amount = document.getElementById('amount').value;
const deliveryDate = document.getElementById('deliveryDate').value;
const recieveLocation = document.getElementById('receiveLocation').value;
const note = document.getElementById('note').value;
const paymentOption = document.querySelector('input[name="payOptions"]:checked')?.value || 'Not selected';

const submitBtn = document.getElementById('submit-btn');

// Todo: ProdName validation error message customization
// Todo: Amount validation error message customization
// Todo: Date validation (cannot be past date, choosing range no more than 1 month)
// Todo: recieveLocation validation (length >= 10, required)
// Todo: Note validation
// Function to print all form information to console
function printFormInfo() {
    const formData = {
    productName: document.getElementById('prodName').value,
    amount: document.getElementById('amount').value,
    deliveryDate: document.getElementById('deliveryDate').value,
    receiveLocation: document.getElementById('receiveLocation').value,
    note: document.getElementById('note').value,
    paymentOption: document.querySelector('input[name="payOptions"]:checked')?.value || 'Not selected'
};
    console.log('===== SHOPPING FORM INFORMATION =====');
    console.log(formData);
    console.log('=====================================');
}

// Event listener for form submission
submitBtn.addEventListener('click', function (event) {
    event.preventDefault();
    printFormInfo();
});