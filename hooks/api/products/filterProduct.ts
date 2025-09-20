import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { TProductFilters } from "../../useProductFilters";

const getProducts = async (filters: TProductFilters) => {
  const query = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== "undefined") {
      query.set(key, value.toString());
    }
  });

  const url = `${baseUrl}/api/product/?${query.toString()}`;

  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetFilterProducts = (filters: TProductFilters) => {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
  });
};
