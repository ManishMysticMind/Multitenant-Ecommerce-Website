import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";


const getCartCount = async () => {
  const url = baseUrl + '/api/total-cart-items/';
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetCartCount = () => {
  return useQuery({
    queryKey: [`cart_count`],
    queryFn:()=> getCartCount(),
  });
};
