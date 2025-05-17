import { dimensions } from "@/global/constants";
import { Grid, GridCol, Stack } from "@mantine/core";
import { Fragment } from "react";
import { Ad } from "../common";

export default function ListGridServer({ props }: any) {
  const { content, DataItemServer, listGridProps } = props;
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
              <DataItemServer item={item} />
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
              <DataItemServer item={item} />
            </Stack>
          );

          return rows;
        })}
      </Stack>
    );

  return null;
}
