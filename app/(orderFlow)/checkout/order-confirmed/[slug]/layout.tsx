import type { Metadata } from "next";
import { getPageData } from "../../../../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();
  const { id } = await params;

  const returnObj: Metadata = {
    title: "Order Status | " + pageData.name,
    description: "",
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
