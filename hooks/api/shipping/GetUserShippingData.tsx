import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getUserShippingList = async (user_id: number) => {
  const url = baseUrl + `/api/user/${user_id}/address`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetUserShippingData = (user_id: number) => {
  return useQuery({
    queryKey: [`user_shipping_list`],
    queryFn: () => getUserShippingList(user_id),
    enabled: !!user_id,
  });
};
