const validateLoginInput = (loginInput: LoginInput) => {
  const errors: LoginInput = {
    email: '',
    password: '',
  };

  if (!loginInput.email) {
    errors.email = 'Email field is required';
  }

  if (!loginInput.password) {
    errors.password = 'Password field is required';
  }

  // Test if the email is valid
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(loginInput.email)) {
    errors.email = 'Email is invalid';
  }

  return errors;
}

const validateRegisterInput = (registerInput: RegisterInput) => {
  const errors: RegisterInput = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  if (!registerInput.email) {
    errors.email = 'Email field is required';
  }

  if (!registerInput.password) {
    errors.password = 'Password field is required';
  }

  if (!registerInput.confirmPassword) {
    errors.confirmPassword = 'Confirm password field is required';
  }

  // Test if the email is valid
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(registerInput.email)) {
    errors.email = 'Email is invalid';
  }

  // Test the password length
  if (registerInput.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
    errors.confirmPassword = 'Password must be at least 8 characters';
  }

  // Test if the passwords match
  if (registerInput.password !== registerInput.confirmPassword) {
    errors.password = 'Passwords must match';
    errors.confirmPassword = 'Passwords must match';
  }

  return errors;
}

export { validateLoginInput, validateRegisterInput };