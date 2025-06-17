"use client";
import { IconX } from "@tabler/icons-react";
import { useClickOutside } from "@mantine/hooks";
import { RootState } from "@/global/states/store";
import { useDebouncedCallback } from "@mantine/hooks";
import { useSelector, useDispatch } from "react-redux";
import { ActionIcon, Box, TextInput } from "@mantine/core";
import { toggleSearch } from "@/global/states/global.slice";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { searchInputProps } from "@/global/constants";
import { useRef } from "react";

type SearchInputProps = {
  placeholder: string;
};

export default function SearchInput({ placeholder }: SearchInputProps) {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const ref = useClickOutside(() => handleToggleSearch());
  const desktopRef = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);
  const { isSearching } = useSelector((state: RootState) => state.global);

  const handleSearch = useDebouncedCallback((e: any) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams);
    if (term) params.set("search", term);
    else params.delete("search");
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleToggleSearch = () => dispatch(toggleSearch());

  const handleClearSearch = () => {
    if (desktopRef.current) desktopRef.current.value = "";
    if (mobileRef.current) mobileRef.current.value = "";
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    replace(`${pathname}?${params.toString()}`);
    dispatch(toggleSearch());
  };

  return (
    <>
      <Box component="div" visibleFrom="sm">
        <TextInput
          ref={desktopRef}
          onChange={handleSearch}
          placeholder={placeholder}
          defaultValue={searchParams.get("search")?.toString()}
          rightSection={
            <ActionIcon
              onClick={handleClearSearch}
              c="var(--bg-one)"
              bg="var(--tx-one)"
              aria-label="Clear Search">
              <IconX size={16} />
            </ActionIcon>
          }
        />
      </Box>

      {isSearching && (
        <Box
          ref={ref}
          h="100%"
          w="100vw"
          component="div"
          hiddenFrom="sm"
          style={searchInputProps.style}>
          <TextInput
            w="100%"
            ref={mobileRef}
            onChange={handleSearch}
            placeholder={placeholder}
            styles={searchInputProps.styles}
            defaultValue={searchParams.get("search")?.toString()}
            rightSection={
              <ActionIcon
                onClick={handleClearSearch}
                c="var(--bg-one)"
                bg="var(--tx-one)"
                aria-label="Clear Search">
                <IconX size={16} />
              </ActionIcon>
            }
          />
        </Box>
      )}
    </>
  );
}
