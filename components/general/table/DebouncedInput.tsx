import { type InputHTMLAttributes, useEffect, useState } from "react";
//
import { Input } from "@/components/general/Input";
//
type DebouncedInputProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">;
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 100,
  ...props
}: DebouncedInputProps) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);
    return () => clearTimeout(timeout);
  }, [value, debounce, onChange]);
  return <Input {...props} value={value} onTextChange={setValue} />;
};

export default DebouncedInput;
