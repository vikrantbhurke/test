import { Fragment } from "react";
import { dimensions } from "@/global/constants";
import { Grid, GridCol, Stack } from "@mantine/core";
import { Ad } from "@/global/components/common/server";

export default function ListGridInner({ props }: any) {
  const { content, DataItem, listGridProps, sessionUser } = props;
  const { gutter, gap, layout, ...rest } = listGridProps;

  if (layout === "grid")
    return (
      <Grid gutter={gutter} justify="start" {...rest}>
        {content.map((item: any, index: number) => {
          const cols = [];

          if (index > 0 && index % 5 === 0) {
            cols.push(
              <GridCol span={dimensions.gridColSpan} key={index}>
                <Ad />
              </GridCol>
            );
          }

          cols.push(
            <GridCol span={dimensions.gridColSpan} key={item.id}>
              <DataItem item={item} sessionUser={sessionUser} />
            </GridCol>
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

          if (index > 0 && index % 5 === 0) {
            rows.push(
              <Fragment key={index}>
                <Ad />
              </Fragment>
            );
          }

          rows.push(
            <Stack key={item.id}>
              <DataItem item={item} sessionUser={sessionUser} />
            </Stack>
          );

          return rows;
        })}
      </Stack>
    );

  return null;
}
