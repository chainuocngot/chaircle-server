import { generate } from 'random-words';

export const generateRandomUsername = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const words = generate({ exactly: 2 }) as string[];

  const name = words.map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join('');
  return name;
};
