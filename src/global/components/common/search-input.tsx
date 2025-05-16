"use client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IconX } from "@tabler/icons-react";
import { useClickOutside } from "@mantine/hooks";
import { RootState } from "@/global/states/store";
import { useDebouncedCallback } from "@mantine/hooks";
import { ActionIcon, TextInput } from "@mantine/core";
import { toggleSearch } from "@/global/states/global.slice";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchInputProps } from "@/global/constants";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const ref = useClickOutside(() => handleToggleSearch());
  const { isSearching } = useSelector((state: RootState) => state.global);

  const handleSearch = useDebouncedCallback((e: any) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (term) params.set("search", term);
    else params.delete("search");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleToggleSearch = () => dispatch(toggleSearch());

  return (
    <>
      <TextInput
        visibleFrom="sm"
        onChange={handleSearch}
        placeholder={placeholder}
        defaultValue={searchParams.get("search")?.toString()}
        rightSection={
          <ActionIcon onClick={() => {}} c="var(--bg-one)" bg="var(--tx-one)">
            <IconX size={16} />
          </ActionIcon>
        }
      />

      {isSearching && (
        <TextInput
          h="100%"
          w="100vw"
          ref={ref}
          hiddenFrom="sm"
          onChange={handleSearch}
          placeholder={placeholder}
          style={searchInputProps.style}
          styles={searchInputProps.styles}
          defaultValue={searchParams.get("search")?.toString()}
          rightSection={
            <ActionIcon
              onClick={handleToggleSearch}
              c="var(--bg-one)"
              bg="var(--tx-one)">
              <IconX size={16} />
            </ActionIcon>
          }
        />
      )}
    </>
  );
}
