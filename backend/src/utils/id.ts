import { customAlphabet } from "nanoid";

export const getId = (): string => {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
    5
  );

  return nanoid();
};
