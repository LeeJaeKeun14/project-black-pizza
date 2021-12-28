import { useState } from 'react';

export const useInput = initValue => {
  const [value, setValue] = useState(initValue);
  const onChange = inputValue => {
    setValue(inputValue);
  };
  return { value, setValue, onChange };
};
