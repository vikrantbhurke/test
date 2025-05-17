"use client";
import { useState } from "react";
import { editBookById } from "../action";
import { EditBookSchema } from "../schema";
import { Button, Paper, Stack, useMantineColorScheme } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { FloatingInput } from "@/global/components/common";
import { useNotification } from "@/global/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks/use-toast";
import { Action } from "@/global/classes";
import { useRouter } from "next/navigation";
import { viewBookRoute } from "@/global/constants/routes";
import { lightBgOneDarkBgTwo } from "@/global/constants/floating-input-props";

type EditBookFormProps = {
  book: any;
};

export default function EditBookForm({ book }: EditBookFormProps) {
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
      const response = await editBookById(book.id, values);

      if (Action.isSuccess(response)) {
        const alert = { message: response.message, status: "success" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
        router.push(viewBookRoute(book.id));
      } else {
        const alert = { message: response.error, status: "error" as const };
        if (isMobile) showToast(alert);
        else showNotification(alert);
      }
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

          <Button type="submit" disabled={isMutating}>
            {isMutating ? "Updating..." : "Update"}
          </Button>
        </Stack>
      </Paper>
    </form>
  );
}
