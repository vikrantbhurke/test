"use client";
import {
  Textarea,
  TextInput,
  TextareaProps,
  PasswordInput,
  TextInputProps,
  PasswordInputProps,
} from "@mantine/core";
import { useState } from "react";
import classes from "@/global/styles/common.module.css";

type FloatingInputProps = {
  type?: "text-input" | "text-area" | "password-input";
  variant?: "form" | "normal";
  value?: string;
} & Partial<TextInputProps & PasswordInputProps & TextareaProps>;

export function FloatingInput({
  type = "text-input",
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

  if (type === "text-input") {
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

  if (type === "text-area") {
    if (variant === "form") {
      return (
        <Textarea
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
        <Textarea
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

  if (type === "password-input") {
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
