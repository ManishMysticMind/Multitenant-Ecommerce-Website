import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const searchProducts = async (search?: string) => {
  let searchParams = new URLSearchParams();
  if (search && search.trim() !== "") {
    searchParams.append("search", search);
  }

  const url = baseUrl + `/api/product/?${searchParams}`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useSearchProducts = (search?: string) => {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => searchProducts(search),
    enabled: !!search && search.trim() !== "",
  });
};
