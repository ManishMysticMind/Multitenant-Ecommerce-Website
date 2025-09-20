import { useMutation } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const getConnectIpsStatus = async (order_id: number | null) => {
  const url =
    baseUrl + `/api/verify-connectips-payment?TXNID=${order_id}`;
  const res = await axiosWrapper.post(url, {});
  return res.data;
};

export const useGetConnectIpsStatus = () => {
  return useMutation({
    mutationFn: (order_id: number | null) => getConnectIpsStatus(order_id),
    onError: (data: any) => {
      for (let key in data) {
        showToast("error", `${key}:${data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
