"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { SaveCommentSchema } from "@/features/comment/schema";
import { Button, Stack } from "@mantine/core";
import { saveComment } from "@/features/comment/action";
import { zodResolver } from "mantine-form-zod-resolver";
import { FloatingInput } from "@/global/components/common/client";
import { useToast } from "@/global/hooks";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";
import { Action } from "@/global/classes";
import { useRouter } from "next/navigation";

type AddCommentFormProps = {
  bookId: string;
  close: () => void;
};

export default function AddCommentForm({ bookId, close }: AddCommentFormProps) {
  const router = useRouter();
  const [isMutating, setIsMutating] = useState(false);
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile, session } = useSelector((state: RootState) => state.global);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      body: "",
      bookId: bookId,
      commenterId: session?.user?.id,
    },

    validate: zodResolver(SaveCommentSchema),
  });

  const handleSaveComment = async (values: any) => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      const response = await saveComment(values);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);

        router.refresh();
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
      close();
    } catch (error: any) {
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSaveComment)}>
      <Stack pt={4} gap="md" p="sm">
        <FloatingInput
          name="body"
          label="Body"
          key={form.key("body")}
          {...form.getInputProps("body")}
        />

        <Button type="submit" disabled={isMutating} aria-label="Save Comment">
          {isMutating ? "Saving..." : "Save"}
        </Button>
      </Stack>
    </form>
  );
}
