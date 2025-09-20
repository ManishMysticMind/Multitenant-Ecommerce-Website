import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getCollectionDetail = async (slug: string) => {
  const url = baseUrl + `/api/collection/${slug}/`;
  const res = await axiosWrapper.get(url);

  return res.data;
};

export const useGetCollectionDetail = (slug: string) => {
  return useQuery({
    queryKey: [`collection detail`, slug],
    queryFn: () => getCollectionDetail(slug),
  });
};
