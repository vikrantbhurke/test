import { Skeleton } from "@mui/material";

type NewSkeletonProps = {
  a?: "pulse" | "wave" | false;
  v?: "text" | "circular" | "rectangular" | "rounded";
  w?: number | string;
  h?: number | string;
  bgcolor?: string;
  r?: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function NewSkeleton({
  a = "wave",
  v = "text",
  w = 100,
  h = 25,
  bgcolor = "var(--bg-two)",
  r = "sm",
}: NewSkeletonProps) {
  let br;
  if (r === "xs") br = 2;
  if (r === "sm") br = 4;
  if (r === "md") br = 8;
  if (r === "lg") br = 16;
  if (r === "xl") br = 32;

  return (
    <Skeleton
      animation={a}
      variant={v}
      sx={{ bgcolor, borderRadius: br }}
      width={w}
      height={h}
    />
  );
}
