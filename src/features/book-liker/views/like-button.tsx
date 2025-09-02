"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@/global/hooks";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { stillButtonProps } from "@/global/constants";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { dropBookLiker, saveBookLiker } from "@/features";
import { Screen } from "@/global/enums";

type LikeButtonProps = {
  bookId: string;
  likerId: string;
  likes: number;
  like: boolean;
};

export function LikeButton({ bookId, likerId, likes, like }: LikeButtonProps) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [stateLike, setStateLike] = useState(like);
  const { screen } = useSelector((state: RootState) => state.global);

  const handleLike = async () => {
    if (isMutating) return;
    setIsMutating(true);
    const prevStateLike = stateLike;
    const prevLikes = stateLikes;
    setStateLike(true);
    setStateLikes((prev: any) => prev + 1);

    try {
      await saveBookLiker({ bookId, likerId });
    } catch (error: any) {
      setStateLike(prevStateLike);
      setStateLikes(prevLikes);
      const alert = { message: error.message, status: "error" as const };
      if (screen === Screen.Mobile || screen === Screen.Tablet)
        showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  const handleUnlike = async () => {
    if (isMutating) return;
    setIsMutating(true);
    const prevStateLike = stateLike;
    const prevLikes = stateLikes;
    setStateLike(false);
    setStateLikes((prev: any) => prev - 1);

    try {
      await dropBookLiker({ bookId, likerId });
    } catch (error: any) {
      setStateLike(prevStateLike);
      setStateLikes(prevLikes);
      const alert = { message: error.message, status: "error" as const };
      if (screen === Screen.Mobile || screen === Screen.Tablet)
        showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <Group gap={0}>
      {stateLike ? (
        <ActionIcon
          c="crimson"
          variant="subtle"
          onClick={handleUnlike}
          aria-label="Unlike Book"
          style={stillButtonProps.style}
          onFocus={stillButtonProps.onFocus}
          onMouseDown={stillButtonProps.onMouseDown}>
          <IconHeartFilled size={16} />
        </ActionIcon>
      ) : (
        <ActionIcon
          c="crimson"
          variant="subtle"
          onClick={handleLike}
          aria-label="Like Book"
          style={stillButtonProps.style}
          onFocus={stillButtonProps.onFocus}
          onMouseDown={stillButtonProps.onMouseDown}>
          <IconHeart size={16} />
        </ActionIcon>
      )}

      <Text>{stateLikes || "0"}</Text>
    </Group>
  );
}
