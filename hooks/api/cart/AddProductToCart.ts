import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const addProductToCart = async (data: any) => {
  try {
    const url = baseUrl + "/api/cart/";
    const res = await axiosWrapper.post(url, data);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useAddProductToCart = () => {
  const queryClient= useQueryClient();
  return useMutation({
    mutationFn: (data: any) => addProductToCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_count"] });

      showToast("success", "Added to cart successfully", {
        theme: "light",
      });
    },
    onError: (data: any) => {
      for (let key in data) {
        showToast("error", `${key}:${data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
