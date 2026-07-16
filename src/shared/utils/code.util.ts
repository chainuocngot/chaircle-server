export const generateOtp = (length = 6): string => {
  const digits = '0123456789';

  return Array.from({ length }, () => {
    return digits[Math.floor(Math.random() * digits.length)];
  }).join('');
};
