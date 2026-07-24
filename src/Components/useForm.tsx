import { useState, type ChangeEvent } from "react";

type FormValues = Record<string, string>;

export const useForm = <T extends FormValues>(initialState: T) => {
  const [inputValues, setInputValue] = useState<T>(initialState);

  const resetForm = () => {
    setInputValue({ ...initialState });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    setInputValue((prev) => ({
      ...prev,
      [name]: value,
    } as T));
  };

  return {
    inputValues,
    handleInputChange,
    resetForm,
  };
};
