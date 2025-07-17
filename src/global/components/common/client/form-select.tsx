"use client";
import {
  Input,
  Combobox,
  InputBase,
  ScrollArea,
  useCombobox,
  InputBaseProps,
} from "@mantine/core";
import { ReactNode } from "react";
import classes from "@/global/styles/common.module.css";

type OptionValue = string | number;
type OptionMap = Map<OptionValue, string>;

type FormSelectProps = {
  name: string;
  mah?: number;
  label?: string;
  error?: ReactNode;
  options: OptionMap;
  scrollable?: boolean;
  placeholder?: ReactNode;
  value: OptionValue | null;
  labelstyle?: "floating" | "above";
  onChange: (value: OptionValue) => void;
} & Partial<InputBaseProps>;

export function FormSelect({
  value,
  options,
  onChange,
  mah = 200,
  scrollable = false,
  labelstyle = "floating",
  placeholder = "Pick value",
  ...rest
}: FormSelectProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const displayValue = value !== null ? options.get(value) : null;

  const handleSelect = (selected: string) => {
    const parsed = isNaN(Number(selected)) ? selected : Number(selected);
    onChange(parsed);
    combobox.closeDropdown();
  };

  const optionElements = Array.from(options.entries()).map(([val, label]) => (
    <Combobox.Option value={String(val)} key={String(val)}>
      {label}
    </Combobox.Option>
  ));

  const labelProps = {
    className: `${classes.labelFloating} ${classes.label}`,
  };

  const classNames = {
    root: classes.root,
  };

  const isFloating = labelstyle === "floating";

  return (
    <Combobox store={combobox} onOptionSubmit={handleSelect}>
      <Combobox.Target>
        <InputBase
          {...rest}
          pointer
          type="button"
          component="button"
          rightSectionPointerEvents="none"
          rightSection={<Combobox.Chevron />}
          labelProps={isFloating ? labelProps : undefined}
          classNames={isFloating ? classNames : undefined}
          onClick={() => combobox.toggleDropdown()}>
          {displayValue || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown
        styles={{ dropdown: { backgroundColor: "var(--bg-one)" } }}>
        {scrollable ? (
          <ScrollArea.Autosize mah={mah}>
            <Combobox.Options>{optionElements}</Combobox.Options>
          </ScrollArea.Autosize>
        ) : (
          <Combobox.Options>{optionElements}</Combobox.Options>
        )}
      </Combobox.Dropdown>
    </Combobox>
  );
}
