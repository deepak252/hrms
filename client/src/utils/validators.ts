import { REGEX } from '@/config/constants';

export const isEmptyString = (value: string) => {
  return !value?.trim()?.length;
};

export const validateEmail = (value: string) => {
  if (!value) {
    return "Email can't be empty";
  }
  if (!REGEX.EMAIL.test(value)) {
    return 'Invalid email ID';
  }
};
