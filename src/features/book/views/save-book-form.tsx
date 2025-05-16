"use client";
import { Genre } from "../enums";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { SaveBookSchema } from "../schema";
import { useRouter } from "next/navigation";
import { saveBook, saveBooks } from "../action";
import { Action } from "@/global/classes/action";
import { useNotification } from "@/global/hooks";
import { booksRoute } from "@/global/constants/routes";
import { zodResolver } from "mantine-form-zod-resolver";
import { Button, FileButton, Paper, Stack, Text } from "@mantine/core";
import { FormSelect, FloatingInput } from "@/global/components/common";

export default function SaveBookForm() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const form = useForm({
    mode: "controlled",
    initialValues: {
      title: "",
      genre: "",
      synopsis: "",
      authorId: "6801671fe63ce6ae26ae2f21",
    },

    validate: zodResolver(SaveBookSchema),
  });

  const handleSaveBooks = async () => {
    try {
      if (isMutating || !file) return;
      setIsMutating(true);
      const response = await saveBooks(file);

      if (Action.isSuccess(response)) {
        showNotification({ message: response.message, status: "success" });
        router.push(booksRoute);
      } else {
        showNotification({ message: response.error, status: "error" });
      }
    } catch (error: any) {
      showNotification({ message: error.message, status: "error" });
    } finally {
      setIsMutating(false);
    }
  };

  const handleSaveBook = async (values: any) => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      const response = await saveBook(values);

      if (Action.isSuccess(response)) {
        showNotification({ message: response.message, status: "success" });
        router.push(booksRoute);
      } else {
        showNotification({ message: response.error, status: "error" });
      }
    } catch (error: any) {
      showNotification({ message: error.message, status: "error" });
    } finally {
      setIsMutating(false);
    }
  };

  const genreMap = new Map(Object.entries(Genre).map((g) => [g[1], g[0]]));

  return (
    <>
      <Paper radius="md" p="lg">
        <Stack gap="sm">
          <Stack gap="sm">
            {file && (
              <Text size="sm" ta="center" mt="sm">
                Picked file: {file.name}
              </Text>
            )}

            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="application/json">
              {(props) => <Button {...props}>Upload JSON</Button>}
            </FileButton>

            <Button onClick={handleSaveBooks}>Save Books</Button>

            <Button disabled={!file} color="yellow" onClick={clearFile}>
              Reset
            </Button>
          </Stack>

          <form onSubmit={form.onSubmit(handleSaveBook)}>
            <Stack gap="sm">
              <FloatingInput
                name="title"
                label="Title"
                key={form.key("title")}
                {...form.getInputProps("title")}
              />

              <FloatingInput
                name="synopsis"
                label="Synopsis"
                key={form.key("synopsis")}
                {...form.getInputProps("synopsis")}
              />

              <FormSelect
                value="Fantasy"
                name="genre"
                label="Genre"
                options={genreMap}
                {...form.getInputProps("genre")}
              />

              <Button type="submit" disabled={isMutating}>
                {isMutating ? "Saving..." : "Save"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </>
  );
}
