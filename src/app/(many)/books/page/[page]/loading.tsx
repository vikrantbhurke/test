import { dimensions } from "@/global/constants";
import { Grid, GridCol, Stack } from "@mantine/core";
import { CustomSkeleton } from "@/global/components/common";

export default function Loading() {
  const gridDesktop = (
    <Grid visibleFrom="sm">
      {Array.from({ length: 12 }, (_, index) => (
        <GridCol key={index} span={dimensions.gridColSpan}>
          <CustomSkeleton h={300} w="100%" a="pulse" v="rounded" />
        </GridCol>
      ))}
    </Grid>
  );

  const gridMobile = (
    <Grid hiddenFrom="sm">
      {Array.from({ length: 2 }, (_, index) => (
        <GridCol key={index} span={dimensions.gridColSpan}>
          <CustomSkeleton h={300} w="100%" a="pulse" v="rounded" />
        </GridCol>
      ))}
    </Grid>
  );

  return (
    <Stack p="xs" h="100%" w="100%" justify="center" maw={dimensions.mawLg}>
      <CustomSkeleton
        h={dimensions.headerHeight}
        w="100%"
        a="pulse"
        v="rounded"
      />
      {gridDesktop}
      {gridMobile}
    </Stack>
  );
}
