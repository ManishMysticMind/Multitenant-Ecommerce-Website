import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getProducts = async (id: number, model: string) => {
  if (model === "collection") {
    const url = baseUrl + `/api/collection/${id}/`;
    const res = await axiosWrapper.get(url);
    return res.data;
  } else if (model === "category") {
    const url = baseUrl + `/api/category/${id}/`;
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
