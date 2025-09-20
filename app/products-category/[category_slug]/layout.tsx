import type { Metadata } from "next";
import { getCategoryPage, getPageData } from "../../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();
  const { category_slug } = await params;
  const categoryDetails = await getCategoryPage(category_slug);

  const title =
    categoryDetails.meta_title != ""
      ? categoryDetails.meta_title
      : categoryDetails.name;
  const returnObj: Metadata = {
    title: title + " | " + pageData.name,
    description: categoryDetails.meta_description || "",
    keywords: [categoryDetails.meta_keyword, categoryDetails.meta_title],
    openGraph: {
      title:
        (categoryDetails.meta_title ? categoryDetails.meta_title + " | " : "") +
        pageData.name,
      description: categoryDetails.meta_description || "",
      images: categoryDetails.photos,
    },
    twitter: {
      card:
        categoryDetails.photos != null && categoryDetails.photos.length > 0
          ? categoryDetails.photos[0]?.image.toString()
          : "",
      title:
        (categoryDetails.meta_title ? categoryDetails.meta_title + " | " : "") +
        pageData.name,
      description: categoryDetails.meta_description || "",
      images: categoryDetails.photos,
    },
  };
  return returnObj;
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
