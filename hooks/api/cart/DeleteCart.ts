import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const deleteCart = async (cart_id: number) => {
  const url = baseUrl + `/api/cart/${cart_id}/`;
  const res = await axiosWrapper.delete(url);
  return res.data;
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (cart_id: number) => deleteCart(cart_id),
    onSuccess: () => {
        showToast("success", "Cart is empty now", {
            theme: "light",
          });
      queryClient.invalidateQueries({ queryKey: ["cart_detail"] });
      queryClient.invalidateQueries({ queryKey: ["cart_count"] });
        
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
