import I18n from './I18n';

export const userRegisterRequestConstraints = {
  name: {
    presence: true,
    length: {
      minimum: 5,
      message: 'must be at least 3 characters'
    }
  },
  description: {
    presence: true,
    length: {
      minimum: 10,
      message: 'must be at least 10 characters.'
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
