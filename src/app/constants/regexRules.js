export const VALIDATION_RULES = {
  NAME: /^[A-Z 0-9]{2,}$/i,
  PASSWORD:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export const VALIDATION_MESSAGE = {
  REQUIRED: {
    MESSAGE: `This field is required.`,
  },
  NAME: {
    REQUIRED: `Name is required.`,
    REGEX_RULES: `Name must contain only letters.`,
    MAX_LENGTH: `Name can't be more then 30 charachters.`,
  },
  EMAIL: {
    REQUIRED: `Email is required.`,
    INVALID: `Please enter valid email.`,
    UNIQUE: `This email is already exist. `,
  },
  PASSWORD: {
    REQUIRED: `Password is required.`,
    REGEX_RULES: `Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.`,
  },
  OLD_PASSWORD: {
    REQUIRED: `Old password is required.`,
  },
  CONFIRMED_PASSWORD: {
    REQUIRED: `Confirm password is required.`,
    REGEX_RULES: `Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.`,
    NOT_IDENTICAL: `Passwords do not matched.`,
  },
  IMAGE: {
    REQUIRED: `Image is required.`,
    FORMAT: `Only *.jpeg, *.jpg, *.png, images are allowed.`,
  },
  PINCODE: {
    MAX_LENGTH: `Zipcode can't be longer than 10 characters`,
  },
  ADDRESS: {
    MAX_LENGTH: `Address can't be longer than 50 characters`,
  },
  CITY: {
    MAX_LENGTH: `City can't be longer than 30 characters`,
  },
  ROLE: {
    REQUIRED: `Role is required.`,
  },
  PRODUCT_TYPE: {
    REQUIRED: `Product type is required.`,
  },
};
