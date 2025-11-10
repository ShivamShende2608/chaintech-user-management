export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // At least 6 characters
  return password.length >= 6;
};

export const validateName = (name) => {
  // At least 2 characters
  return name.length >= 2;
};

export const validatePhone = (phone) => {
  // 10 digits
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
};
