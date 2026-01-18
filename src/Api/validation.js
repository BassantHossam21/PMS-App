// رسالة required عامة
export const getRequiredMessage = (fieldName) => `${fieldName} is required`;

// Email
export const EmailValidation = {
  required: getRequiredMessage("Email"),
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Email is not valid",
  },
};

// Password
export const PasswordValidation = {
  required: getRequiredMessage("Password"),
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  },
};
