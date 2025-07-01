"use client";
import {
  Input,
  Combobox,
  InputBase,
  ScrollArea,
  useCombobox,
} from "@mantine/core";
import { useState, useEffect, ReactNode } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import classes from "@/global/styles/common.module.css";

type OptionValue = string | number;
type OptionMap = Map<OptionValue, string>;

type UrlSelectProps = {
  mah?: number;
  label?: string;
  paramKey: string;
  options: OptionMap;
  scrollable?: boolean;
  placeholder?: ReactNode;
  labelstyle?: "floating" | "above";
};

export function UrlSelect({
  options,
  paramKey,
  mah = 200,
  label = "Label",
  scrollable = false,
  labelstyle = "floating",
  placeholder = "Pick value",
}: UrlSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const param = searchParams.get(paramKey) || null;
  const initialSelected = param && options.has(param) ? param : null;
  const [value, setValue] = useState<OptionValue | null>(initialSelected);

  // Sync with URL
  useEffect(() => {
    const current = searchParams.get(paramKey);
    if (current !== value)
      setValue(current && options.has(current) ? current : null);
  }, [searchParams, options, value, paramKey]);

  const displayValue = value ? options.get(value) : null;

  const optionElements = Array.from(options.entries()).map(([value, label]) => (
    <Combobox.Option value={String(value)} key={String(value)}>
      {label}
    </Combobox.Option>
  ));

  const handleSelect = (value: string) => {
    const typedValue = isNaN(Number(value)) ? value : Number(value);
    setValue(typedValue);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set(paramKey, value);
    router.replace(`?${newParams.toString()}`);
    combobox.closeDropdown();
  };

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
          labelProps={isFloating ? labelProps : undefined}
          classNames={isFloating ? classNames : undefined}
          pointer
          label={label}
          type="button"
          component="button"
          rightSectionPointerEvents="none"
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}>
          {displayValue || <Input.Placeholder>{placeholder}</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
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
