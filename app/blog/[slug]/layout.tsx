import type { Metadata } from "next";
import {
  getBlogPage,
  getPageData
} from "../../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();
  const { slug } = await params;
  const blogDetails = await getBlogPage(slug);

  return {
    title: (blogDetails.title ? blogDetails.title + " | " : "") + pageData.name,
    description: blogDetails.meta_description || "",
    keywords: blogDetails.meta_keywords || "",
    openGraph: {
      title:
        (blogDetails.title ? blogDetails.title + " | " : "") + pageData.name,
      description: blogDetails.meta_description || "",
      images: [blogDetails.featured_image_url],
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
