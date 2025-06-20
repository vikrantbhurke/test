import { Fragment } from "react";
import { Grid, Stack } from "@mantine/core";
import { dimensions } from "@/global/constants";
import { Ad } from "@/global/components/common/server";

export default function ListGridInner({ props }: any) {
  const { content, DataItem, listGridProps, auth } = props;
  const { gutter, gap, layout, ...rest } = listGridProps;

  if (layout === "grid")
    return (
      <Grid gutter={gutter} justify="start" {...rest}>
        {content.map((item: any, index: number) => {
          const cols = [];

          // Add an ad component every 5 items
          if (index > 0 && index % 5 === 0) {
            cols.push(
              <Grid.Col span={dimensions.gridColSpan} key={index}>
                <Ad />
              </Grid.Col>
            );
          }

          cols.push(
            <Grid.Col span={dimensions.gridColSpan} key={item.id}>
              <DataItem item={item} auth={auth} />
            </Grid.Col>
          );

          return cols;
        })}
      </Grid>
    );

  if (layout === "list")
    return (
      <Stack gap={gap} {...rest}>
        {content.map((item: any, index: number) => {
          const rows = [];

          // Add an ad component every 5 items
          if (index > 0 && index % 5 === 0) {
            rows.push(
              <Fragment key={index}>
                <Ad />
              </Fragment>
            );
          }

          rows.push(
            <Stack key={item.id}>
              <DataItem item={item} auth={auth} />
            </Stack>
          );

          return rows;
        })}
      </Stack>
    );

  return null;
}
