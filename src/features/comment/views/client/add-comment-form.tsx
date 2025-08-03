"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { saveComment } from "@/features";
import { useToast } from "@/global/hooks";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button, Stack } from "@mantine/core";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { zodResolver } from "mantine-form-zod-resolver";
import { SaveCommentSchema } from "@/features/comment/schema";
import { FloatingInput } from "@/global/components/common/client";

type AddCommentFormProps = {
  bookId: string;
  close: () => void;
  auth: {
    id: string;
  };
};

export function AddCommentForm({ bookId, close, auth }: AddCommentFormProps) {
  const router = useRouter();
  const [isMutating, setIsMutating] = useState(false);
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      body: "",
      bookId: bookId,
      commenterId: auth.id,
    },

    validate: zodResolver(SaveCommentSchema),
  });

  const handleSaveComment = async (values: any) => {
    if (isMutating) return;
    setIsMutating(true);
    const response = await saveComment(values);
    if (isMobile) showToast(response);
    else showNotification(response);
    close();
    router.refresh();
    setIsMutating(false);
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
