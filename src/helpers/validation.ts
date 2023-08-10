export const isValidEmail = (email: string) => {
  const validRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(validRegex)) return true;

  return false;
};

export const isValidPhoneNumber = (phone: string) => {
  // Match phone numbers with or without dashes or spaces
  const validRegex = /^(\+\d{1,2}\s?)?(\d{3}[-\s]?\d{3}[-\s]?\d{4}|\d{10,})$/;
  if (phone.match(validRegex)) return true;
  return false;
};
