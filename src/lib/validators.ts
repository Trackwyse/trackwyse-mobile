/*
  Validate Login Form

  Required fields: email, password
  Email must be valid
  Password must be valid
*/
const validateLoginInput = (loginInput: LoginInput) => {
  const errors: LoginInput = {
    email: "",
    password: "",
  };

  if (!loginInput.email) {
    errors.email = "Email field is required";
  }

  if (!loginInput.password) {
    errors.password = "Password field is required";
  }

  // Test if the email is valid
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!emailRegex.test(loginInput.email)) {
    errors.email = "Email is invalid";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

/*
  Validate Register Form
  Function takes in a RegisterInput object and a step number (1 or 2)

  Step 1: /screens/Register.1.tsx
  Step 2: /screens/Register.2.tsx

  Step 1: Required fields: email, password, confirmPassword
  Step 2: Required fields: firstName, lastName

  Step 1:
  Email must be valid
  Password must be at least 8 characters
  Passwords must match

  Step 2:
  First name must not contain numbers
  Last name must not contain numbers

*/
const validateRegisterInput = (registerInput: RegisterInput, step: 1 | 2 = 1) => {
  const errors: RegisterInput = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  };

  if (step === 1) {
    if (!registerInput.email) {
      errors.email = "Email field is required";
    }

    if (!registerInput.password) {
      errors.password = "Password field is required";
    }

    if (!registerInput.confirmPassword) {
      errors.confirmPassword = "Confirm password field is required";
    }

    // Test if the email is valid
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailRegex.test(registerInput.email || "")) {
      errors.email = "Email is invalid";
    }

    // Test the password length
    if ((registerInput.password as string).length < 8) {
      errors.password = "Password must be at least 8 characters";
      errors.confirmPassword = "Password must be at least 8 characters";
    }

    // Test if the passwords match
    if (registerInput.password !== registerInput.confirmPassword) {
      errors.password = "Passwords must match";
      errors.confirmPassword = "Passwords must match";
    }

    // see if all errors are empty, if so, return empty object
    const allErrors = Object.values(errors).filter((error) => error !== "");

    if (allErrors.length === 0) {
      return {};
    }

    return errors;
  } else {
    if (!registerInput.firstName) {
      errors.firstName = "First name field is required";
    }

    if (!registerInput.lastName) {
      errors.lastName = "Last name field is required";
    }

    // Ensure no numbers in the first name
    const firstNameRegex = /^[a-zA-Z]+$/;

    if (!firstNameRegex.test(registerInput.firstName as string)) {
      if (errors.firstName === "") {
        errors.firstName = "First name must not contain symbols";
      }
    }

    // Ensure no numbers in the last name
    const lastNameRegex = /^[a-zA-Z]+$/;

    if (!lastNameRegex.test(registerInput.lastName as string)) {
      if (errors.lastName === "") {
        errors.lastName = "Last name must not contain symbols";
      }
    }

    // see if all errors are empty, if so, return empty object
    const allErrors = Object.values(errors).filter((error) => error !== "");

    if (allErrors.length === 0) {
      return {};
    }

    return errors;
  }
};

/*
  Validate Email Verification Form

  Required fields: verificationToken
  Verification token must be 6 characters long, and only numbers
*/
const validateVerifyInput = (verifyInput: VerifyInput) => {
  const errors: VerifyInput = {
    verificationToken: "",
  };

  if (!verifyInput.verificationToken) {
    errors.verificationToken = "Verification code field is required";
  }

  // Ensure the verification code is 6 characters long, and only numbers
  const verificationCodeRegex = /^[0-9]{6}$/;

  if (!verificationCodeRegex.test(verifyInput.verificationToken)) {
    errors.verificationToken = "Verification code is invalid";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

/*
  Validate the Modify Label Form

  Required fields: none
  Optional fields: name, phoneNumber, message

  Phone number must be 10 digits long, and only numbers
  TODO: Add color validation
*/
const validateModifyLabelInput = (modifyLabelInput: ModifyLabelInput) => {
  const errors: ModifyLabelInput = {
    name: "",
    phoneNumber: "",
    message: "",
  };

  // Verify the phone number is valid, only if it is not empty
  const phoneNumberRegex = /^[0-9]{10}$/;

  if (modifyLabelInput.phoneNumber && !phoneNumberRegex.test(modifyLabelInput.phoneNumber)) {
    errors.phoneNumber = "Phone number is invalid";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

/*
  Validate the Found Label Details Form

  Required fields: phoneNumber, exactLocation, recoveryLocation
  Phone number must be 10 digits long, and only numbers
*/
const validateFoundLabelDetailsInput = (foundLabelDetailsInput: FoundLabelDetailsInput) => {
  const errors: FoundLabelDetailsInput = {
    phoneNumber: "",
    exactLocation: "",
    recoveryLocation: "",
  };

  // Verify the phone number is valid, only if it is not empty
  const phoneNumberRegex = /^[0-9]{10}$/;

  if (
    foundLabelDetailsInput.phoneNumber &&
    !phoneNumberRegex.test(foundLabelDetailsInput.phoneNumber)
  ) {
    errors.phoneNumber = "Phone number is invalid";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

/*
  Validate the Forgot Password Form

  Required fields: email
  Email must be in the format of <email>@<domain>.<domain>
*/
const validateForgotPasswordInput = (forgotPasswordInput: ForgotPasswordInput) => {
  const errors: ForgotPasswordInput = {
    email: "",
  };

  if (!forgotPasswordInput.email) {
    errors.email = "Email field is required";
  }

  // Ensure the email is valid
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(forgotPasswordInput.email)) {
    errors.email = "Email is invalid";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

/*
  Validate the Reset Password Form

  Required fields: email, resetToken, password, confirmPassword

  Email must be in the format of <email>@<domain>.<domain>
  Reset token must be 6 characters long, and only numbers
  Password must be at least 8 characters long
  Password and confirm password must match
*/
const validateResetPasswordInput = (resetPasswordInput: ResetPasswordInput) => {
  const errors: ResetPasswordInput = {
    email: "",
    resetToken: "",
    password: "",
    confirmPassword: "",
  };

  if (!resetPasswordInput.email) {
    errors.email = "Email field is required";
  }

  // Ensure the email is valid
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegex.test(resetPasswordInput.email)) {
    errors.email = "Email is invalid";
  }

  if (!resetPasswordInput.resetToken) {
    errors.resetToken = "Reset token field is required";
  }

  // Ensure the reset token is valid
  const resetTokenRegex = /^[0-9]{6}$/;

  if (!resetTokenRegex.test(resetPasswordInput.resetToken)) {
    errors.resetToken = "Reset token is invalid";
  }

  if (!resetPasswordInput.password) {
    errors.password = "Password field is required";
  }

  if (!resetPasswordInput.confirmPassword) {
    errors.confirmPassword = "Confirm password field is required";
  }

  // Ensure the password is valid
  const passwordRegex = /^.{8,}$/;

  if (!passwordRegex.test(resetPasswordInput.password)) {
    errors.password = "Password must be at least 8 characters long";
  }

  // Ensure the confirm password is valid
  if (!passwordRegex.test(resetPasswordInput.confirmPassword)) {
    errors.confirmPassword = "Confirm password must be at least 8 characters long";
  }

  // Ensure the passwords match
  if (resetPasswordInput.password !== resetPasswordInput.confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  // see if all errors are empty, if so, return empty object
  const allErrors = Object.values(errors).filter((error) => error !== "");

  if (allErrors.length === 0) {
    return {};
  }

  return errors;
};

/*
  Validate the label URL
  When a user scans a label, the URL will be in the format of trw://<labelId>

  Required fields: labelUrl
  labelUrl must be in the format of trw://<labelId>
*/
const validateLabelUrl = (labelUrl: string) => {
  const labelUrlRegex = /^trw:\/\/[a-f\d]{24}$/i;

  if (!labelUrlRegex.test(labelUrl)) {
    return false;
  }

  return true;
};

export {
  validateLabelUrl,
  validateLoginInput,
  validateVerifyInput,
  validateRegisterInput,
  validateModifyLabelInput,
  validateForgotPasswordInput,
  validateResetPasswordInput,
  validateFoundLabelDetailsInput,
};
