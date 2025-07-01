// "use client";
// import {
//   cancelStripeSubscription,
//   createStripeSubscription,
//   suspendStripeSubscription,
//   activateStripeSubscription,
// } from "../action";
// import { useDisclosure } from "@mantine/hooks";
// import { Button, Modal, Stack, Text } from "@mantine/core";

// type StripeButtonsProps = {
//   subscriptionId: string;
// };

// export function StripeButtons({ subscriptionId }: StripeButtonsProps) {
//   const [suspendOpened, { open: suspendOpen, close: suspendClose }] =
//     useDisclosure();

//   const [cancelOpened, { open: cancelOpen, close: cancelClose }] =
//     useDisclosure();

//   const handleCreate = async () => {
//     const response = await createStripeSubscription();
//     if (response.approve_url) window.open(response.approve_url, "_self");
//   };

//   const handleActivate = async () =>
//     await activateStripeSubscription(subscriptionId);

//   return (
//     <Stack>
//       <SuspendModal
//         opened={suspendOpened}
//         close={suspendClose}
//         subscriptionId={subscriptionId}
//       />

//       <CancelModal
//         opened={cancelOpened}
//         close={cancelClose}
//         subscriptionId={subscriptionId}
//       />

//       <Button
//         c="black"
//         bg="#556CD6"
//         onClick={handleCreate}
//         loaderProps={{ type: "dots" }}>
//         Subscribe With Stripe
//       </Button>

//       <Button
//         onClick={suspendOpen}
//         bg="#F2BA36"
//         c="black"
//         loaderProps={{ type: "dots", color: "black" }}>
//         Suspend Subscription
//       </Button>

//       <Button
//         bg="green"
//         onClick={handleActivate}
//         loaderProps={{ type: "dots", color: "white" }}>
//         Activate Subscription
//       </Button>

//       <Button
//         bg="red"
//         onClick={cancelOpen}
//         loaderProps={{ type: "dots", color: "white" }}>
//         Cancel Subscription
//       </Button>
//     </Stack>
//   );
// }

// export const CancelModal = ({ opened, close, subscriptionId }: any) => {
//   const handleCancel = async () =>
//     await cancelStripeSubscription(subscriptionId);

//   return (
//     <Modal opened={opened} onClose={close} centered>
//       <Stack gap="lg">
//         <Text fz="sm" ta="center">
//           Are you sure you want to cancel your subscription? You will lose
//           access to paid features immediately. You will have to subscribe again
//           to regain access.
//         </Text>

//         <Button
//           bg="red"
//           onClick={handleCancel}
//           loaderProps={{ type: "dots", color: "white" }}>
//           Cancel Subscription
//         </Button>
//       </Stack>
//     </Modal>
//   );
// };

// export const SuspendModal = ({ opened, close, subscriptionId }: any) => {
//   const handleSuspend = async () =>
//     await suspendStripeSubscription(subscriptionId);

//   return (
//     <Modal opened={opened} onClose={close} centered>
//       <Stack gap="lg">
//         <Text fz="sm" ta="center">
//           Are you sure you want to suspend your subscription? You cannot access
//           paid features and you will not be charged while suspended. You can
//           always reactivate your subscription.
//         </Text>

//         <Button
//           c="black"
//           bg="#F2BA36"
//           onClick={handleSuspend}
//           loaderProps={{ type: "dots", color: "white" }}>
//           Suspend Subscription
//         </Button>
//       </Stack>
//     </Modal>
//   );
// };
