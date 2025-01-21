export const validateEmail = (email: string) => {
  // Regular expression for validating an email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string) => {
  const messages = [];
  const minLength = 8;
  const uppercaseRegex = /[A-Z]/;
  const lowercaseRegex = /[a-z]/;
  const digitRegex = /\d/;
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

  if (password.length < minLength) {
    messages.push(`Password must be at least ${minLength} characters long.`);
  }
  if (!uppercaseRegex.test(password)) {
    messages.push("Password must contain at least one uppercase letter.");
  }
  if (!lowercaseRegex.test(password)) {
    messages.push("Password must contain at least one lowercase letter.");
  }
  if (!digitRegex.test(password)) {
    messages.push("Password must contain at least one number.");
  }
  if (!specialCharRegex.test(password)) {
    messages.push("Password must contain at least one special character.");
  }

  return messages;
};

// Function to maintain one key and remove all others from localStorage
export const keepOneKeyAndRemoveOthers = (keyToKeep: string) => {
  const allKeys = Object.keys(localStorage);

  // Loop through all keys and remove them except for the keyToKeep
  allKeys.forEach((key) => {
    if (key !== keyToKeep) {
      localStorage.removeItem(key);
    }
  });
};
