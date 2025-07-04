"use client";
import { useState } from "react";
import { editBookById } from "@/features";
import { useSelector } from "react-redux";
import { useToast } from "@/global/hooks";
import { useRouter } from "next/navigation";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useForm, zodResolver } from "@mantine/form";
import { EditBookSchema } from "@/features/book/schema";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import { viewBookRoute } from "@/global/constants/routes";
import { FloatingInput } from "@/global/components/common/client";
import { Button, Paper, Stack, useMantineColorScheme } from "@mantine/core";

type EditBookFormProps = {
  book: any;
};

export function EditBookForm({ book }: EditBookFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const [stateBook, setStateBook] = useState(book);
  const [isMutating, setIsMutating] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const { isMobile } = useSelector((state: RootState) => state.global);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: stateBook.title,
      synopsis: stateBook.synopsis,
    },
    validate: zodResolver(EditBookSchema),
  });

  const handleEditBook = async (values: any) => {
    if (isMutating) return;
    setIsMutating(true);
    const previousBook = stateBook;
    setStateBook((prevBook: any) => ({ ...prevBook, ...values }));

    try {
      const message = await editBookById(book.id, values);
      const alert = { message, status: "success" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
      router.push(viewBookRoute(book.id));
    } catch (error: any) {
      setStateBook(previousBook);
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleEditBook)}>
      <Paper p="xl">
        <Stack gap="md">
          <FloatingInput
            styles={lightBgOneDarkBgTwo(colorScheme)}
            name="title"
            label="Title"
            key={form.key("title")}
            {...form.getInputProps("title")}
          />

          <FloatingInput
            styles={lightBgOneDarkBgTwo(colorScheme)}
            name="synopsis"
            label="Synopsis"
            key={form.key("synopsis")}
            {...form.getInputProps("synopsis")}
          />

          <Button type="submit" disabled={isMutating} aria-label="Update Book">
            {isMutating ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
