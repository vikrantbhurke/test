import { dimensions } from "@/global/constants";
import { Grid, GridCol, Stack } from "@mantine/core";
import { NewSkeleton } from "@/global/components/common/server";

export default function Loading() {
  const gridDesktop = (
    <Grid visibleFrom="md">
      {Array.from({ length: 12 }, (_, index) => (
        <GridCol key={index} span={dimensions.gridColSpan}>
          <NewSkeleton h={300} w="100%" a="pulse" v="rounded" r="xs" />
        </GridCol>
      ))}
    </Grid>
  );

  const gridMobile = (
    <Grid hiddenFrom="md">
      {Array.from({ length: 2 }, (_, index) => (
        <GridCol key={index} span={dimensions.gridColSpan}>
          <NewSkeleton h={300} w="100%" a="pulse" v="rounded" r="xs" />
        </GridCol>
      ))}
    </Grid>
  );

  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <NewSkeleton
        h={dimensions.headerHeight}
        w="100%"
        a="pulse"
        v="rounded"
        r="xs"
      />
      {gridDesktop}
      {gridMobile}
    </Stack>
  );
}
