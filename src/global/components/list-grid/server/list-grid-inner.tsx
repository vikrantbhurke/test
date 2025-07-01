import { Fragment } from "react";
import { dimensions } from "@/global/constants";
import { Grid, GridCol, Stack } from "@mantine/core";
import { Ad } from "@/global/components/common/server";

export function ListGridInner({ props }: any) {
  const { layout, ad, content, DataItem, listGridProps, auth } = props;
  const { gutter, gap, ...rest } = listGridProps;

  if (layout === "grid")
    return (
      <Grid gutter={gutter} justify="start" {...rest}>
        {content.map((item: any, index: number) => {
          const cols = [];

          if (ad && index > 0 && index % 5 === 0) {
            cols.push(
              <GridCol span={dimensions.gridColSpan} key={index}>
                <Ad />
              </GridCol>
            );
          }

          cols.push(
            <GridCol span={dimensions.gridColSpan} key={item.id}>
              <DataItem item={item} auth={auth} />
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

          if (ad && index > 0 && index % 5 === 0) {
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
