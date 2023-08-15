import { EMAIL_REGEX, NAME_REGEX } from './constants';

// inactiveButton отвечает за состояние кнопок в Login, Profile, Register
function validateField(value, regex, customMsg) {
  if (!value) {
    return {
      message: '',
      inactiveButton: true,
    };
  }
  if (!regex.test(value.toLowerCase())) {
    return {
      message: customMsg.notValid,
      inactiveButton: true,
    };
  }
  return {
    message: '',
    inactiveButton: false,
  };
}

export function validateEmail(email) {
  return validateField(email, EMAIL_REGEX, {
    notValid: 'Не соответствует формату электронной почты.',
  });
}

export function validateName(name) {
  return validateField(name, NAME_REGEX, {
    notValid:
      'Имя должно содержать только латиницу, кириллицу, пробел или дефис.',
  });
}
