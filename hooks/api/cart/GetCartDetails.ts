import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";


const getCartDetail = async () => {
  const url = baseUrl + '/api/cart/';
  const res = await axiosWrapper.get(url);
  return res.data[0] || res.data;
};

export const useGetCartDetails = () => {
  return useQuery({
    queryKey: [`cart_detail`],
    queryFn:()=> getCartDetail(),
  });
};
