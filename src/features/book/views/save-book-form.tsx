"use client";
import {
  Text,
  Paper,
  Stack,
  Button,
  FileButton,
  useMantineColorScheme,
} from "@mantine/core";
import { Genre } from "../enums";
import { Session } from "next-auth";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { SaveBookSchema } from "../schema";
import { useRouter } from "next/navigation";
import { saveBook, saveBooks } from "../action";
import { Action } from "@/global/classes/action";
import { useNotification } from "@/global/hooks";
import { booksRoute } from "@/global/constants/routes";
import { zodResolver } from "mantine-form-zod-resolver";
import { FormSelect, FloatingInput } from "@/global/components/common";
import { lightBgOneDarkBgTwo } from "@/global/constants/floating-input-props";

type SaveBookFormProps = {
  session?: Session | null;
};

export default function SaveBookForm({ session }: SaveBookFormProps) {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const { colorScheme } = useMantineColorScheme();
  const userId = session?.user?.id || "";

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
      authorId: userId,
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
      const response = await saveBook({ ...values, authorId: userId });

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

  const genreMap = new Map(
    Object.entries(Genre)
      .filter((g) => g[0] !== "All")
      .map((g) => [g[1], g[0]])
  );

  return (
    <>
      <Paper p="xl">
        <Stack gap="md">
          <Stack gap="md">
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

            <Button onClick={handleSaveBooks} disabled={isMutating}>
              {isMutating ? "Saving..." : "Save"}
            </Button>

            <Button disabled={!file} color="yellow" onClick={clearFile}>
              Reset
            </Button>
          </Stack>

          <form onSubmit={form.onSubmit(handleSaveBook)}>
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

              <FormSelect
                styles={lightBgOneDarkBgTwo(colorScheme)}
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
