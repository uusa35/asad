import I18n from './I18n';

export const userRegisterRequestConstraints = {
  name: {
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
  address: {
    presence: true,
    length: {
      minimum: 6,
      message: I18n.t('address_validation_message')
    }
  }
};
