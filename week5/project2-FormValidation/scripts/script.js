// Get form values
const name = document.getElementById('name-form').value;
const email = document.getElementById('email-form').value;
const phone = document.getElementById('phone-form').value;
const password = document.getElementById('password-form').value;
const confirmPassword = document.getElementById('renter-password').value;
const gender = document.querySelector('input[name="gender"]:checked').value;
const termsChecked = document.getElementById('terms').checked;

document.getElementById('submit-btn').addEventListener('click', function (event) {
    event.preventDefault();
    // Create alert message with user info
    const userInfo = `
Thông tin đăng ký:
─────────────────
Họ và Tên: ${name}
Email: ${email}
Số điện thoại: ${phone}
Mật Khẩu: ${password}
Xác nhận mật khẩu: ${confirmPassword}
Giới tính: ${gender}
Điều khoản: ${termsChecked ? 'Đã chấp nhận' : 'Chưa chấp nhận'}
    `;

    alert(userInfo);
});
