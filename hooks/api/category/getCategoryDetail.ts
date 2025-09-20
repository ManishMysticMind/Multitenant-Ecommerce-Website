import { useQuery } from "@tanstack/react-query";
import axiosWrapper from "../axiosWrapper";
import { baseUrl } from "../axiosWrapper";

const getCategoryDetail = async (slug: string) => {
  const url = baseUrl + `/api/category/${slug}/`;
  const res = await axiosWrapper.get(url);

  return res.data;
};

export const useGetCategoryDetail = (slug: string) => {
  return useQuery({
    queryKey: [`category detail`, slug],
    queryFn: () => getCategoryDetail(slug),
  });
};
