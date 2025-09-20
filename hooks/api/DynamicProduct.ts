import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "./axiosWrapper";

const getProducts = async (id: number, type: string) => {
  if (type) {
      const url = baseUrl + `/api/${type}/${id}/`;
      const res = await axiosWrapper.get(url);
      return res.data;
  }
};

export const useGetProducts = (id: number, type: string) => {
  return useQuery({
    queryKey: [`${type} ${id}`],
    queryFn: () => getProducts(id, type),
  });
};