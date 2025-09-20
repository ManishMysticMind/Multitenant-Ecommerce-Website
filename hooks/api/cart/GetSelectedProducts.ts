import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";


const getSelectedProducts = async () => {
  const url = baseUrl + '/api/cart/?selected=True';
  const res = await axiosWrapper.get(url);
  return res?.data[0] || [];
};

export const useGetSelectedProducts = () => {
  return useQuery({
    queryKey: [`selected_products`],
    queryFn:()=> getSelectedProducts(),
  });
};
