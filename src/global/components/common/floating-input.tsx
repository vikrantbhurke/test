"use client";
import {
  TextInput,
  PasswordInput,
  TextInputProps,
  PasswordInputProps,
} from "@mantine/core";
import { useState } from "react";
import classes from "@/global/styles/common.module.css";

type FloatingInputProps = {
  type?: "text" | "password";
  variant?: "form" | "normal";
  value?: string;
} & Partial<TextInputProps & PasswordInputProps>;

export default function FloatingInput({
  type = "text",
  variant = "form",
  value: formValue,
  ...rest
}: FloatingInputProps) {
  const [internalValue, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const value = formValue || internalValue;
  const floating = focused || String(value).length > 0 || undefined;

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  const handleChange = (e: any) => setValue(e.currentTarget.value);

  const labelProps = {
    className: floating
      ? `${classes.label} ${classes.labelFloating}`
      : classes.label,
  };

  const classNames = {
    root: classes.root,
    input: classes.input,
  };

  if (type === "text") {
    if (variant === "form") {
      return (
        <TextInput
          {...rest}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          labelProps={labelProps}
          classNames={classNames}
        />
      );
    }

    if (variant === "normal") {
      return (
        <TextInput
          {...rest}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          labelProps={labelProps}
          classNames={classNames}
        />
      );
    }
  }

  if (type === "password") {
    if (variant === "form") {
      return (
        <PasswordInput
          {...rest}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          labelProps={labelProps}
          classNames={classNames}
          type="password"
        />
      );
    }

    if (variant === "normal") {
      return (
        <PasswordInput
          {...rest}
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleChange}
          labelProps={labelProps}
          classNames={classNames}
          type="password"
        />
      );
    }
  }
}
