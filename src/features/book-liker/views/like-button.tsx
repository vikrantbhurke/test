"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Action } from "@/global/classes";
import { useToast } from "@/global/hooks";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { stillButtonProps } from "@/global/constants";
import { ActionIcon, Group, Text } from "@mantine/core";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { dropBookLiker, saveBookLiker } from "@/features/book-liker/action";

type LikeButtonProps = {
  bookId: string;
  likerId: string;
  likes: number;
  like: boolean;
};

export default function LikeButton({
  bookId,
  likerId,
  likes,
  like,
}: LikeButtonProps) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [stateLike, setStateLike] = useState(like);
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleLike = async () => {
    if (isMutating) return;
    setIsMutating(true);
    const previousExists = stateLike;
    const previousLike = stateLikes;
    setStateLike(true);
    setStateLikes((prev: any) => prev + 1);

    try {
      const response = await saveBookLiker({
        bookId,
        likerId,
      });

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
    } catch (error: any) {
      setStateLike(previousExists);
      setStateLikes(previousLike);
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  const handleUnlike = async () => {
    if (isMutating) return;
    setIsMutating(true);
    const previousExists = stateLike;
    const previousLike = stateLikes;
    setStateLike(false);
    setStateLikes((prev: any) => prev - 1);

    try {
      const response = await dropBookLiker({
        bookId,
        likerId,
      });

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
    } catch (error: any) {
      setStateLike(previousExists);
      setStateLikes(previousLike);
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
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
