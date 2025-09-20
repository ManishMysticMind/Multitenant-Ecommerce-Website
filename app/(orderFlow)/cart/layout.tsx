import type { Metadata } from "next";
import { getPageData } from "../../../hooks/api/webPage";

type Props = {
  params: any;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageData = await getPageData();
  const { id } = await params;

  const returnObj: Metadata = {
    title: "My Cart | " + pageData.name,
    description: "",
  };
  return returnObj;
}

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
