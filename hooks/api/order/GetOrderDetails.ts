import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getOrderDetail = async (orderId: number | null) => {
  const url = baseUrl + `/api/order/${orderId}/`;

  try {
    const res = await axiosWrapper.get(url);
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      // Optionally return null or throw a more informative error
      throw new Error("Order not found");
    }
    throw error; // rethrow other errors
  }
};

export const useGetOrderDetail = (orderId: number | null) => {
  return useQuery({
    queryKey: [`order ${orderId}`],
    queryFn: () => getOrderDetail(orderId),
    enabled: !!orderId
  });
};
