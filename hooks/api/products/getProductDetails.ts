import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getProductDetails = async (product_id:string) => {
  const url = baseUrl + `/api/product/${product_id}/`;
  const res = await axiosWrapper.get(url);
  return res.data;
};
export const useGetProductDetails = (product_id:string) => {
  return useQuery({
    queryKey: [`product ${product_id}`],
    queryFn:()=> getProductDetails(product_id),
    enabled:!!product_id
  });
};