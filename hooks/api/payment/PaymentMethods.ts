import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getPaymentMethods = async () => {
  const url = baseUrl + "/api/plugin/";
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetPaymentMethods = () => {
  return useQuery({
    queryKey: [`get_payment_methods`],
    queryFn: () => getPaymentMethods(),
  });
};
