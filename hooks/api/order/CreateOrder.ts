import { useMutation } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const createOrder = async (payload: any) => {
  const url = baseUrl + "/api/order/";
  const res = await axiosWrapper.post(url, payload);
  return res.data;
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: (shipping_address: any) => createOrder(shipping_address),
    onSuccess: () => {
      showToast("success", "Order created", {
        theme: "light",
      });
    },
    onError: (data: any) => {
      if (data.response?.data) {
        Object.entries(data.response.data).forEach(([key, value]) => {
          showToast("error", `${value}`, {
            theme: "light",
          });
        });
      } else {
        showToast("error", "An unknown error occurred", {
          theme: "light",
        });
      }
    },
  });
};
