"use client";
import { useDispatch } from "react-redux";
import { Button, Stack, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { toggleSearch } from "@/global/states/global.slice";
import classes from "@/global/styles/app.module.css";
import { stillButtonProps } from "@/global/constants";

export default function SearchButton() {
  const dispatch = useDispatch();
  const handleToggleSearch = () => dispatch(toggleSearch());

  return (
    <Button
      p={4}
      h="100%"
      style={stillButtonProps.style}
      onFocus={stillButtonProps.onFocus}
      onMouseDown={stillButtonProps.onMouseDown}
      onClick={handleToggleSearch}
      className={classes.themeOneWithHover}>
      <Stack align="center" gap={4}>
        <IconSearch size={16} />
        <Text size="sm">Search</Text>
      </Stack>
    </Button>
  );
}
