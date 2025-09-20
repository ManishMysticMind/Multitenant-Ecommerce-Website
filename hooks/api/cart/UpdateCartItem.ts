import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

interface TPatchCartItem {
  cart_item_id: number;
  quantity?: number;
  cart_id?: number;
  selected?: boolean;
}

const patchCartItem = async ({
  cart_item_id,
  quantity,
  cart_id,
  selected,
}: TPatchCartItem) => {
  const data = {
    cart_items: [
      {
        id: cart_item_id,
        quantity: quantity,
        selected: selected,
      },
    ],
  };
  const url = baseUrl + `/api/cart/${cart_id}/`;

  const res = await axiosWrapper.patch(url, data);
  return res.data;
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patchEventData: TPatchCartItem) =>
      patchCartItem(patchEventData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart_detail"] });
      // queryClient.invalidateQueries({ queryKey: ["cart_count"] });
    },
    onError: (data: any) => {
      showToast(
        "error",
        `${data.response.data.detail} || "Something went wrong"`,
        {
          theme: "light",
        }
      );
    },
  });
};
