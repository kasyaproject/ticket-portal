import { customAlphabet } from "nanoid";

export const getId = (): string => {
  const nanoid = customAlphabet("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789", 36);

  return nanoid(5);
};
