import type { Metadata } from "next";
import { getWebPage } from "../../hooks/api/webPage";
import { getPageData } from "../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const webpage = await getWebPage("about");
  const pageData = await getPageData();

  if (!webpage) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: webpage.title
      ? webpage.title + " | " + pageData.name
      : pageData.name,
    openGraph: {
      title: webpage.title
        ? webpage.title + " | " + pageData.name
        : pageData.name,
      images: [pageData.logo_url],
    },
  };
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
