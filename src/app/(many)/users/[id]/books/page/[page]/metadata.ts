import { getUserById } from "@/features/user/action";

type generateMetadataParams = {
  params: Promise<{ id: string; page: string }>;
};

export async function generateMetadata({
  params,
}: generateMetadataParams): Promise<{
  title: string;
  description: string;
}> {
  const { id, page } = await params;
  const user = await getUserById(id);

  return {
    title: `${user.firstname} ${user.lastname}'s Books – Page ${page} | Bookverse`,
    description: `Explore books by ${user.firstname} ${user.lastname}, page ${page}.`,
  };
}
