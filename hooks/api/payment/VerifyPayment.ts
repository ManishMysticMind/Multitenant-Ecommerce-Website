import { useMutation } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

const verifyKhaltiPayment = async (pidx: string) => {
  const payload = {
    pidx: pidx,
  };
  const url = baseUrl + `/api/payment-verify/`;
  const res = await axiosWrapper.post(url, payload);
  return res.data;
};

export const useVerifyKhaltiPayment = () => {
  return useMutation({
    mutationFn: (pidx: string) => verifyKhaltiPayment(pidx),
    onError: (data: any) => {
      for (let key in data?.response?.data) {
        showToast("error", `${data?.response?.data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
