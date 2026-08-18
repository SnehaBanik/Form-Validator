const form = document.getElementById('validatorForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const togglePasswordButton = document.getElementById('togglePassword');
const successMessage = document.getElementById('successMessage');

const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');

const requirementItems = {
  length: document.getElementById('length'),
  uppercase: document.getElementById('uppercase'),
  lowercase: document.getElementById('lowercase'),
  number: document.getElementById('number'),
  special: document.getElementById('special')
};

function updateRequirementState(id, isValid) {
  const item = requirementItems[id];
  if (!item) return;

  item.classList.toggle('valid', isValid);
  item.classList.toggle('invalid', !isValid);
}

function validatePassword(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  Object.entries(checks).forEach(([key, value]) => {
    updateRequirementState(key, value);
  });

  return Object.values(checks).every(Boolean);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showError(element, message) {
  element.textContent = message;
}

function clearError(element) {
  element.textContent = '';
}

function validateForm() {
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  let isValid = true;

  if (!validateEmail(email)) {
    showError(emailError, 'Please enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailError);
  }

  if (!validatePassword(password)) {
    showError(passwordError, 'Password must meet all requirements.');
    isValid = false;
  } else {
    clearError(passwordError);
  }

  if (confirmPassword !== password || password === '') {
    showError(confirmPasswordError, 'Passwords do not match.');
    isValid = false;
  } else {
    clearError(confirmPasswordError);
  }

  return isValid;
}

emailInput.addEventListener('input', () => {
  const email = emailInput.value.trim();
  if (email === '') {
    clearError(emailError);
    return;
  }

  if (!validateEmail(email)) {
    showError(emailError, 'Enter a valid email like name@example.com');
  } else {
    clearError(emailError);
  }
});

passwordInput.addEventListener('input', () => {
  const password = passwordInput.value;

  if (password === '') {
    Object.keys(requirementItems).forEach((key) => updateRequirementState(key, false));
    clearError(passwordError);
    return;
  }

  const validPassword = validatePassword(password);
  if (!validPassword) {
    showError(passwordError, 'Password must meet all requirements.');
  } else {
    clearError(passwordError);
  }

  if (confirmPasswordInput.value && confirmPasswordInput.value !== password) {
    showError(confirmPasswordError, 'Passwords do not match.');
  } else {
    clearError(confirmPasswordError);
  }
});

confirmPasswordInput.addEventListener('input', () => {
  if (confirmPasswordInput.value === '') {
    clearError(confirmPasswordError);
    return;
  }

  if (confirmPasswordInput.value !== passwordInput.value) {
    showError(confirmPasswordError, 'Passwords do not match.');
  } else {
    clearError(confirmPasswordError);
  }
});

togglePasswordButton.addEventListener('click', () => {
  const passwordField = document.getElementById('password');
  const confirmField = document.getElementById('confirmPassword');

  const showPassword = passwordField.type === 'password';
  passwordField.type = showPassword ? 'text' : 'password';
  confirmField.type = showPassword ? 'text' : 'password';
  togglePasswordButton.textContent = showPassword ? 'Hide' : 'Show';
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  successMessage.textContent = '';

  if (!validateForm()) {
    return;
  }

  successMessage.textContent = 'Account validated successfully!';
  successMessage.style.color = 'green';
});

Object.keys(requirementItems).forEach((key) => updateRequirementState(key, false));
