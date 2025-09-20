import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const postShippingRate = async (data: any) => {
  try {
    const res = await axiosWrapper.post(baseUrl + `/api/calculate-shipping-rate/`, data);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetShippingRate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => postShippingRate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product detail"] });
    },
    // onError: (data: any) => {
    //   alert("There has been an error . Please try again later.");
    // },
  });
};