"use client";
import {
  Button,
  Grid,
  List,
  Stack,
  Stepper,
  Text,
  ThemeIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useNotification } from "@/global/hooks";
import { RootState } from "@/global/states/store";
import { signUpUser } from "@/features";
import { useToast } from "@/global/hooks";
import { zodResolver } from "mantine-form-zod-resolver";
import { signInRoute } from "@/global/constants/routes";
import { lightBgOneDarkBgTwo } from "@/global/constants";
import { SignUpUserSchema } from "@/features/user/schema";
import { Gender, Provider } from "@/features/user/enums";
import { FloatingInput, FormSelect } from "@/global/components/common/client";
import { IconCircleCheckFilled, IconCircleXFilled } from "@tabler/icons-react";
import { Screen } from "@/global/enums";

export function SignUpForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const { showNotification } = useNotification();
  const { colorScheme } = useMantineColorScheme();
  const [isMutating, setIsMutating] = useState(false);
  const { screen } = useSelector((state: RootState) => state.global);
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    mode: "controlled",
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    },

    validate: zodResolver(SignUpUserSchema),
  });

  const handleSignUpUser = async (values: any) => {
    if (isMutating) return;
    setIsMutating(true);
    const response = await signUpUser(Provider.Credentials, values);
    if (screen === Screen.Mobile || screen === Screen.Tablet)
      showToast(response);
    else showNotification(response);
    router.push(signInRoute);
    setIsMutating(false);
  };

  const genderMap = new Map(Object.entries(Gender).map((g) => [g[1], g[0]]));

  return (
    <form onSubmit={form.onSubmit(handleSignUpUser)}>
      <Stack gap="md">
        <Stepper
          active={active}
          size="xs"
          iconSize={24}
          onStepClick={setActive}>
          <Stepper.Step label="Name">
            <Stack gap="md" my="md">
              <FloatingInput
                styles={lightBgOneDarkBgTwo(colorScheme)}
                name="firstname"
                label="Firstname"
                key={form.key("firstname")}
                {...form.getInputProps("firstname")}
              />

              <FloatingInput
                styles={lightBgOneDarkBgTwo(colorScheme)}
                name="lastname"
                label="Lastname"
                key={form.key("lastname")}
                {...form.getInputProps("lastname")}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Details">
            <Stack gap="md" my="md">
              <FloatingInput
                styles={lightBgOneDarkBgTwo(colorScheme)}
                name="email"
                label="Email"
                key={form.key("email")}
                {...form.getInputProps("email")}
              />

              <FloatingInput
                styles={lightBgOneDarkBgTwo(colorScheme)}
                name="username"
                label="Username"
                key={form.key("username")}
                {...form.getInputProps("username")}
              />

              <FormSelect
                styles={lightBgOneDarkBgTwo(colorScheme)}
                value="Male"
                name="gender"
                label="Gender"
                options={genderMap}
                {...form.getInputProps("gender")}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Step label="Password">
            <Stack gap="md" my="md">
              <FloatingInput
                styles={lightBgOneDarkBgTwo(colorScheme)}
                name="password"
                label="Password"
                type="password-input"
                key={form.key("password")}
                {...form.getInputProps("password")}
              />

              <FloatingInput
                styles={lightBgOneDarkBgTwo(colorScheme)}
                name="confirmPassword"
                label="Confirm Password"
                type="password-input"
                key={form.key("confirmPassword")}
                {...form.getInputProps("confirmPassword")}
              />
            </Stack>
          </Stepper.Step>

          <Stepper.Completed>
            <Stack my="md" align="center">
              <List>
                {Object.keys(form.errors).length > 0 ? (
                  <List.Item
                    icon={
                      <ThemeIcon size={40} c="red" bg="transparent">
                        <IconCircleXFilled size={40} />
                      </ThemeIcon>
                    }>
                    <Text>Oops! Found invalid values. Enter valid ones.</Text>
                  </List.Item>
                ) : (
                  <List.Item
                    icon={
                      <ThemeIcon size={40} c="emerald" bg="transparent">
                        <IconCircleCheckFilled size={40} />
                      </ThemeIcon>
                    }>
                    <Text>Great! Everything looks good. Click Sign Up.</Text>
                  </List.Item>
                )}
              </List>
            </Stack>
          </Stepper.Completed>
        </Stepper>

        <Grid>
          <Grid.Col span={6}>
            <Button
              aria-label="Back"
              onClick={prevStep}
              w="100%"
              c="var(--bg-one)"
              color="var(--tx-one)">
              Back
            </Button>
          </Grid.Col>

          <Grid.Col span={6}>
            <Button
              aria-label="Next"
              onClick={nextStep}
              w="100%"
              c="var(--bg-one)"
              color="var(--tx-one)">
              Next
            </Button>
          </Grid.Col>
        </Grid>

        {active === 3 && (
          <Button
            aria-label="Sign Up"
            w="100%"
            c="var(--bg-one)"
            color="var(--tx-one)"
            type="submit"
            disabled={isMutating}
            loading={isMutating}
            loaderProps={{ type: "dots", color: "var(--bg-one)" }}>
            Sign Up
          </Button>
        )}
      </Stack>
    </form>
  );
}
