import { customAlphabet } from "nanoid";

export const getId = (): string => {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    5
  );

  return nanoid();
};
