import type { Metadata } from "next";
import { getPageData, getProductPage } from "../../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();
  const { id } = await params;
  const productDetails = await getProductPage(id);

  const title =
    productDetails.meta_title != ""
      ? productDetails.meta_title
      : productDetails.name;
  const returnObj: Metadata = {
    title: title + " | " + pageData.name,
    description: productDetails.meta_description || "",
    keywords: [productDetails.meta_keyword, productDetails.meta_title],
    openGraph: {
      title:
        (productDetails.meta_title ? productDetails.meta_title + " | " : "") +
        pageData.name,
      description: productDetails.meta_description || "",
      images: productDetails.photos,
    },
    twitter: {
      card:
        productDetails.photos != null && productDetails.photos.length > 0
          ? productDetails.photos[0]?.image.toString()
          : "",
      title:
        (productDetails.meta_title ? productDetails.meta_title + " | " : "") +
        pageData.name,
      description: productDetails.meta_description || "",
      images: productDetails.photos,
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
