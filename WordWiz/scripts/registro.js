
const emailInput    = document.getElementById('email');
const passwordInput = document.getElementById('password');
const createBtn     = document.getElementById('createBtn');
const emailError    = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

function validateEmail() {
    const email = emailInput.value.trim();
    if (!email) {
        emailError.textContent = 'El correo es obligatorio';
        emailInput.classList.add('invalid');
        return false;
    }
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
        emailError.textContent = 'Correo no válido';
        emailInput.classList.add('invalid');
        return false;
    }
    emailError.textContent = '';
    emailInput.classList.remove('invalid');
    return true;
}

function validatePassword() {
    const pwd = passwordInput.value;
    if (pwd.length < 6) {
        passwordError.textContent = 'Mínimo 6 caracteres';
        passwordInput.classList.add('invalid');
        return false;
    }
    passwordError.textContent = '';
    passwordInput.classList.remove('invalid');
    return true;
}

function updateButtonState() {
    createBtn.disabled = !(validateEmail() && validatePassword());
}

emailInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);


createBtn.addEventListener('click', () => {

    if (validateEmail() && validatePassword()) {
        // Simulación sin servidor
        localStorage.setItem('email', emailInput.value);
        localStorage.setItem('autenticado', 'true');
        window.location.href = 'inicio.html'; // redirige directamente
    }
});


document.getElementById('googleBtn').onclick = () => window.location.href = '/auth/google';
document.getElementById('appleBtn').onclick  = () => window.location.href = '/auth/apple';
