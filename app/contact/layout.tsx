import type { Metadata } from "next";
import { getWebPage } from "../../hooks/api/webPage";
import { getPageData } from "../../hooks/api/webPage";
import { MdWeb } from "react-icons/md";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();

  return {
    title: "Contact Us" + " | " + pageData.name,
    openGraph: {
      title: pageData.title ? pageData.title + " | " + pageData.name : "",
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
