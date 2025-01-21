import React, { FC, ChangeEvent } from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  [key: string]: any; // Allows additional props like name, id, etc.
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder = "Enter text",
  value,
  onChange,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-border text-text border border-border rounded px-4 py-1 focus:outline-none focus:ring-2 focus:ring-primary ml-4 ${className}`}
      {...props}
    />
  );
};

export default Input;
