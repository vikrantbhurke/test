export const lightBgOneDarkBgTwo = (theme: string) => {
  const bg = theme === "dark" ? "var(--bg-two)" : "var(--bg-one)";
  return {
    label: {
      backgroundColor: bg,
    },
    input: {
      backgroundColor: bg,
    },
  };
};
