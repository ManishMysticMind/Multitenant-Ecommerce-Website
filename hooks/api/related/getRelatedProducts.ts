import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { getURL } from "next/dist/shared/lib/utils";

const getRelatedProducts = async (slug: string) => {
  const url = baseUrl + `/api/product/${slug}/related-product`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetRelatedProducts = (slug: string) => {
  return useQuery({
    queryKey: [`Related Products ${slug}`],
    queryFn: () => getRelatedProducts(slug),
  });
};
