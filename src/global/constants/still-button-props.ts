export const stillButtonProps = {
  style: {
    outline: "none",
    boxShadow: "none",
    transition: "none",
  },
  onMouseDown: (e: any) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = "none";
    el.style.boxShadow = "none";
  },
  onFocus: (e: any) => {
    const el = e.currentTarget as HTMLElement;
    el.style.outline = "none";
    el.style.boxShadow = "none";
  },
};
