"use client";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { IconLogin } from "@tabler/icons-react";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { useToast } from "@/global/hooks";
import { requestEmail } from "@/features";
import { zodResolver } from "mantine-form-zod-resolver";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import { RequestEmailSchema } from "@/features/user/schema";
import { FloatingInput } from "@/global/components/common/client";
import { Button, Stack, Text, useMantineColorScheme } from "@mantine/core";

export function RequestEmailForm() {
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
    if (isMutating) return;
    setIsMutating(true);
    const response = await requestEmail(values);
    if (isMobile) showToast(response);
    else showNotification(response);
    setIsMutating(false);
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
          aria-label="Send Link"
          disabled={isMutating}
          loading={isMutating}
          loaderProps={{ type: "dots", color: "var(--bg-one)" }}>
          Send Link
        </Button>
      </Stack>
    </form>
  );
}
