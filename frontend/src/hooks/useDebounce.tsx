import { useRef } from "react";

const useDebounce = () => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: Function, delay: number) => {
    // jika input ada maka hapus timeout nya
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    // jika tidak ada input maka set timeout
    debounceTimeout.current = setTimeout(() => {
      func();
      debounceTimeout.current = null;
    }, delay);
  };

  return debounce;
};

export default useDebounce;
