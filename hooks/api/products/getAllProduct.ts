import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";


const getProducts = async () => {
  const url = baseUrl + '/api/product/';
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetAllProducts = () => {
  return useQuery({
    queryKey: [`products`],
    queryFn:()=> getProducts(),
  });
};
