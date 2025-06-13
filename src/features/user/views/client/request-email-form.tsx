"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { Action } from "@/global/classes";
import { useSelector } from "react-redux";
import { IconLogin } from "@tabler/icons-react";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks";
import { requestEmail } from "@/features/user/action";
import { zodResolver } from "mantine-form-zod-resolver";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import { RequestEmailSchema } from "@/features/user/schema";
import { FloatingInput } from "@/global/components/common/client";
import { Button, Stack, Text, useMantineColorScheme } from "@mantine/core";

export default function RequestEmailForm() {
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { colorScheme } = useMantineColorScheme();
  const [isMutating, setIsMutating] = useState(false);
  const { isMobile } = useSelector((state: RootState) => state.global);

  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
    },

    validate: zodResolver(RequestEmailSchema),
  });

  const handleRequestEmail = async (values: any) => {
    try {
      if (isMutating) return;
      setIsMutating(true);
      const response = await requestEmail(values);

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
      const alert = { message: error.message, status: "error" as const };
      if (isMobile) showToast(alert);
      else showNotification(alert);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleRequestEmail)}>
      <Stack gap="md">
        <FloatingInput
          styles={lightBgOneDarkBgTwo(colorScheme)}
          name="email"
          label="Email"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />

        <Text c="gray" fz="xs">
          Please enter your email id. A link to reset new password will be sent
          on this email id.
        </Text>

        <Button
          leftSection={<IconLogin size={20} />}
          c="var(--bg-one)"
          color="var(--tx-one)"
          type="submit"
          disabled={isMutating}
          loading={isMutating}
          loaderProps={{ type: "dots", color: "var(--bg-one)" }}>
          Send Link
        </Button>
      </Stack>
    </form>
  );
}
