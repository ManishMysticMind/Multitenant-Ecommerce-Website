import type { Metadata } from "next";
import { getPageData } from "../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // const webpage = await getWebPage("blog");
  const webpage = {
    title: "Account",
    description: "User Account page",
    featured_img: "",
  };
  const pageData = await getPageData();
  return {
    title: (webpage.title ? webpage.title + " | " : "") + pageData.name,
    description: webpage.description || "",
    openGraph: {
      title: webpage.title || "",
      description: webpage.description || "",
      images: [webpage.featured_img],
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>
}
