"use client";
import { ActionIcon, Group, Text } from "@mantine/core";
import { dropBookLiker, saveBookLiker } from "@/features/book-liker/action";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useState } from "react";
import { useToast } from "@/global/hooks/use-toast";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { Action } from "@/global/classes";
import { stillButtonProps } from "@/global/constants";

type LikeButtonProps = {
  bookId: string;
  likerId: string;
  likes: number;
  exists: boolean;
};

export default function LikeButton({
  bookId,
  likerId,
  likes,
  exists,
}: LikeButtonProps) {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const [stateLikes, setStateLikes] = useState(likes);
  const [stateExists, setStateExists] = useState(exists);
  const { isMobile } = useSelector((state: RootState) => state.global);

  const handleLike = async () => {
    if (isMutating) return;
    setIsMutating(true);
    const previousExists = stateExists;
    const previousLike = stateLikes;
    setStateExists(true);
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
      setStateExists(previousExists);
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
    const previousExists = stateExists;
    const previousLike = stateLikes;
    setStateExists(false);
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
      setStateExists(previousExists);
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
      {stateExists ? (
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
