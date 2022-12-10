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

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== '');

  if (allErrors.length === 0) {
    return {};
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

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== '');

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
}

const validateRegister2Input = (register2Input: Register2Input) => {
  const errors: Register2Input = {
    firstName: '',
    lastName: '',
  };

  if (!register2Input.firstName) {
    errors.firstName = 'First name field is required';
  }

  if (!register2Input.lastName) {
    errors.lastName = 'Last name field is required';
  }

  // Ensure no numbers in the first name
  const firstNameRegex = /^[a-zA-Z]+$/;

  if (!firstNameRegex.test(register2Input.firstName)) {
    if (errors.firstName === '') {
      errors.firstName = 'First name must not contain symbols';
    }
  }

  // Ensure no numbers in the last name
  const lastNameRegex = /^[a-zA-Z]+$/;

  if (!lastNameRegex.test(register2Input.lastName)) {
    if (errors.lastName === '') {
      errors.lastName = 'Last name must not contain symbols';
    }
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== '');

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
}

const validateRegister3Input = (register3Input: Register3Input) => {
  const errors: Register3Input = {
    verificationCode: '',
  };

  if (!register3Input.verificationCode) {
    errors.verificationCode = 'Verification code field is required';
  }

  // Ensure the verification code is 6 characters long, and only numbers
  const verificationCodeRegex = /^[0-9]{6}$/;

  if (!verificationCodeRegex.test(register3Input.verificationCode)) {
    errors.verificationCode = 'Verification code is invalid';
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== '');

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
}


export { validateLoginInput, validateRegisterInput, validateRegister2Input, validateRegister3Input };