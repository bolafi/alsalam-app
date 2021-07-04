import * as yup from "yup";

const phoneRegEx = /^[0-9]{8,}$/;

export const nameValidation = yup.object().shape({
  name: yup.string().required(),
});

export const emailValidation = yup.object().shape({
  email: yup.string().email().required(),
});

export const passwordValidation = yup.object().shape({
  password: yup.string().min(6).max(10).required(),
});

export const phoneValidation = yup.object().shape({
  phone: yup.string().matches(phoneRegEx).required(),
});
