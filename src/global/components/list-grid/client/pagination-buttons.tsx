"use client";
import Link from "next/link";
import { Group, Pagination } from "@mantine/core";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function PaginationButtons({ paginationProps }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const segments = pathname.split("/");
  const last = segments[segments.length - 1];
  const { footerHeight = 60, total, ...rest } = paginationProps;

  const getHref = (page: number) => {
    if (!isNaN(Number(last))) segments[segments.length - 1] = page.toString();
    const newPath = segments.join("/");
    const query = searchParams.toString();
    return query ? `${newPath}?${query}` : newPath;
  };

  const getCurrentPage = () => {
    const page = Number(last);
    return isNaN(page) ? 1 : page;
  };

  const getItemProps = (page: number) => {
    return {
      component: Link,
      href: getHref(page),
    };
  };

  const getControlProps = (control: string) => {
    let href;
    const component = Link;

    switch (control) {
      case "first":
        href = getHref(1);
        break;
      case "last":
        href = getHref(total);
        break;
      case "next":
        href = getHref(getCurrentPage() + 1);
        break;
      case "previous":
        href = getHref(getCurrentPage() - 1);
        break;
      default:
        break;
    }

    return {
      href,
      component,
    };
  };

  const handleOnChange = (page: number) => {
    const href = getHref(page);
    router.push(href);
  };

  return (
    <Group h={footerHeight} justify="center" align="center">
      <Pagination
        {...rest}
        siblings={1}
        total={total}
        onChange={handleOnChange}
        getItemProps={getItemProps}
        getControlProps={getControlProps}
      />
    </Group>
  );
}
