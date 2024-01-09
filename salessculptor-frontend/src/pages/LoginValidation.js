function Validation(values) {
  let errors = {};
  const username_pattern = /^[a-zA-Z0-9]+$/;
  const password_pattern = /^[a-zA-Z0-9]+$/;

  if (!values.username.trim()) {
    errors.username = "Username required";
  } else if (!username_pattern.test(values.username)) {
    errors.username = "Username is invalid";
  } else {
    errors.username = "";
  }

  if (!values.passwordHash || values.passwordHash.length === 0) {
    errors.passwordHash = "Password required";
  } else if (values.passwordHash.length < 6) {
    errors.passwordHash = "Password needs to be 6 characters or more";
  } else if (!password_pattern.test(values.passwordHash)) {
    errors.passwordHash = "Password is invalid";
  } else {
    errors.passwordHash = "";
  }

  return errors;
}

export default Validation;
