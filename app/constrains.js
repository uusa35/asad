export const userRegisterConstraints = {
  name_ar: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 3 characters'
    }
  },
  name_en: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 3 characters'
    }
  },
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: 'must be at least 4 characters.'
    }
  },
  mobile: {
    presence: true,
    length: {
      minimum: 8,
      message: 'must be at least 8 numbers'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: 'must be at least 6 numbers'
    }
  }
};
