import { useMutation } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const initiateKhaltiPayment = async (order_id: number) => {
    const url = baseUrl + `/api/order/${order_id}/payment/`;
    const res = await axiosWrapper.post(url, {});
    return res.data;
};

export const useKhaltiPayment = () => {
  return useMutation({
    mutationFn: (order_id: number) => initiateKhaltiPayment(order_id),
    onError: (data: any) => {
      for (let key in data) {
        showToast("error", `${key}:${data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
