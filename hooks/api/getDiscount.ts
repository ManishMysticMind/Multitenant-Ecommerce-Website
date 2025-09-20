import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "./axiosWrapper";

const getDiscount = async () => {
  const url = baseUrl + '/api/discount/?discount_type=Assigned to order subtotal';
  const res = await axiosWrapper.get(url);
  return res.data.results;
};

export const useGetDiscount = () => {
  return useQuery({
    queryKey: [`discount`],
    queryFn:()=> getDiscount(),
  });
};
