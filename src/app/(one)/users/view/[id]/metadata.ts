import type { Metadata } from "next";
import { getUserById } from "@/features";

type generateMetadataParams = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: generateMetadataParams): Promise<Metadata> {
  const { id } = await params;
  const user = await getUserById(id);
  const baseUrl = process.env.APP_URL;

  return {
    title: `${user.firstname} ${user.lastname} – Bookverse Profile`,
    description: `View ${user.firstname} ${user.lastname}'s saved books, reviews, and activity.`,
    openGraph: {
      title: `${user.firstname} ${user.lastname} – Bookverse`,
      description: `Explore ${user.firstname} ${user.lastname}'s book collection and discussions.`,
      url: `${baseUrl}/users/view/${user.id}`,
    },
    twitter: {
      card: "summary",
      title: `${user.firstname} ${user.lastname} – Bookverse`,
      description: `Check out what ${user.firstname} ${user.lastname} is reading.`,
    },
  };
}
