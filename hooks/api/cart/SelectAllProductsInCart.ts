import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const selectAllProductsInCart = async (is_selected: Boolean) => {
    const url = baseUrl + `/api/cart/select-all/?selected=${is_selected}`;
    const res = await axiosWrapper.post(url, {});
    return res.data;
};

export const useSelectAllProductsInCart = () => {
  const queryClient=useQueryClient();
  return useMutation({
    mutationFn: (is_selected: Boolean) => selectAllProductsInCart(is_selected),
    onSuccess:()=>{
      queryClient.invalidateQueries({ queryKey: ["cart_detail"] });
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
