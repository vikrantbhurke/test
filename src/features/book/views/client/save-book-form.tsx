"use client";
import {
  Text,
  Paper,
  Stack,
  Button,
  FileButton,
  useMantineColorScheme,
} from "@mantine/core";
import { Genre } from "@/features/book/enums";
import { useForm } from "@mantine/form";
import { useRef, useState } from "react";
import { SaveBookSchema } from "@/features/book/schema";
import { useRouter } from "next/navigation";
import { saveBook, saveBooks } from "@/features/book/action";
import { Action } from "@/global/classes/action";
import { useNotification } from "@/global/hooks";
import { booksServerWindowRoute } from "@/global/constants/routes";
import { zodResolver } from "mantine-form-zod-resolver";
import { FormSelect, FloatingInput } from "@/global/components/common/client";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import { RootState } from "@/global/states/store";
import { useSelector } from "react-redux";

export default function SaveBookForm() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const [isMutating, setIsMutating] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);
  const { colorScheme } = useMantineColorScheme();
  const { session } = useSelector((state: RootState) => state.global);

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
      authorId: session?.user?.id,
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
        router.push(booksServerWindowRoute);
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
      const response = await saveBook({
        ...values,
        authorId: session?.user?.id,
      });

      if (Action.isSuccess(response)) {
        showNotification({ message: response.message, status: "success" });
        router.push(booksServerWindowRoute);
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
              accept="application/json"
              aria-label="Upload JSON File">
              {(props) => (
                <Button {...props} aria-label="Upload JSON File">
                  Upload JSON
                </Button>
              )}
            </FileButton>

            <Button
              onClick={handleSaveBooks}
              disabled={isMutating}
              aria-label="Save Book">
              {isMutating ? "Saving..." : "Save"}
            </Button>

            <Button
              disabled={!file}
              color="yellow"
              onClick={clearFile}
              aria-label="Reset File">
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

              <Button
                type="submit"
                disabled={isMutating}
                aria-label="Save Book">
                {isMutating ? "Saving..." : "Save"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </>
  );
}
