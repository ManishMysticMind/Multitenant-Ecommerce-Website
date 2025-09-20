import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";


const getProduct = async (title?:string) => {
  const url = baseUrl + '/api/products';
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetProductDetail = (title?:string) => {
  return useQuery({
    queryKey: [`product ${title}`],
    queryFn:()=> getProduct(title),
  });
};
