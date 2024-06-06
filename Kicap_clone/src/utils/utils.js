import { jwtDecode } from 'jwt-decode';
import { validate } from '../validate/constant';
import unidecode from 'unidecode';
import dayjs from 'dayjs';

/* eslint-disable no-useless-escape */
export const isEmail = (email) => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(email);
};

export const isVietNamPhoneNumber = (phone) => {
  const vietnamesePhoneNumberRegex = /^(0[2-9]|1[2-9])[0-9]{8}$/;
  return vietnamesePhoneNumberRegex.test(phone);
};

export const isEmpty = (value) => value.trim().length === 0;
export const isPassword = (value) => value.trim().length >= 8 && value.trim().length <= 20;

export const validatedEmpty = (value) => {
  const error = isEmpty(value) ? validate.NOT_EMPTY : undefined;
  return error;
};

export const validatedEmail = (email) => {
  let error;
  if (isEmpty(email)) error = validate.NOT_EMPTY;
  else if (!isEmail(email)) error = validate.INVALID_EMAIL;
  return error;
};

export const validatedPassword = (password) => {
  let error;
  if (isEmpty(password)) error = validate.NOT_EMPTY;
  else if (!isPassword(password)) error = validate.INVALID_PASSWORD;
  return error;
};

export const validatedPhoneNumber = (phone) => {
  let error;
  if (isEmpty(phone)) error = validate.NOT_EMPTY;
  else if (!isVietNamPhoneNumber(phone)) error = validate.INVALID_PHONE;
  return error;
};

export const validatedConfirmPassword = (password, confirmPassword) => {
  let error;
  if (isEmpty(confirmPassword)) error = validate.NOT_EMPTY;
  else if (password !== confirmPassword) error = validate.NOT_MATCH_PASSWORD;
  return error;
};

export const getToken = () => {
  const accessToken = JSON.parse(localStorage.getItem('accessToken')) || '';
  return accessToken;
};

export const getRfToken = () => {
  const refreshToken = JSON.parse(localStorage.getItem('refreshToken')) || '';
  return refreshToken;
};

export const getDecodedToken = () => {
  const token = getToken();
  const decoded = jwtDecode(token);
  return decoded;
};

export const getDecodedRfToken = () => {
  const rfToken = getRfToken();
  const decoded = jwtDecode(rfToken);
  return decoded;
};

export const formatPriceToVND = (price = 0) =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';

export const convertToSlug = (value = '') => {
  const valueLower = value.trim().toLowerCase();
  const unidecodeValue = unidecode(valueLower);
  const valueWithoutSpecialChar = unidecodeValue.replace(/[^a-z0-9]+/g, '-');
  const result = valueWithoutSpecialChar.replace(/^-+|-+$/g, '');
  return result;
};

export const roundedPrice = (price) => Math.round(price / 1000) * 1000;

export const isStrNumber = (str) => /^[0-9]*$/.test(str);

export const timestampsToDate = (value) => {
  const date = dayjs(value);
  const formattedDate = date.format('DD/MM/YYYY');
  return formattedDate;
};

export const timestampsToDatetime = (date) => {
  return dayjs(date).format('DD/MM/YYYY HH:mm');
};

export const dateISOToTimestamps = (day, month, year) => {
  let date = new Date(year, month - 1, day);
  let isoDate = date.toISOString();
  return isoDate;
};
