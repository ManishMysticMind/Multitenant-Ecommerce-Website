import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getBestSellingProduct = async (id: number) => {
  const url = baseUrl + `/api/collections/${id}/`;
  const res = await axiosWrapper.get(url);

  return res.data;
};

export const useGetBestSellingProduct = (id: number) => {
  return useQuery({
    queryKey: [`Collection ${id}`],
    queryFn: () => getBestSellingProduct(id),
  });
};
