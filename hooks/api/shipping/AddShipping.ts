import { useMutation } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { TShippingFormSchema } from "../../../lib/validation/ShippingForm/ShippingFormSchema";
import { showToast } from "../../../lib/toast";

const postShippingAddress = async ({
  userId,
  data,
}: {
  userId: number;
  data: TShippingFormSchema;
}) => {
  const url = baseUrl + `/api/user/${userId}/address/`;
  const res = await axiosWrapper.post(url, data);
  return res.data;
};

export const useAddShippingAddress = () => {
  return useMutation({
    mutationFn: (data: { userId: number; data: TShippingFormSchema }) =>
      postShippingAddress(data),
    onSuccess: () => {
      showToast("success", "Address assigned", {
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
