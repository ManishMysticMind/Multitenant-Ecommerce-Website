import { useMutation } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

type TProps = {
  product_id: number;
  attributes: any[];
};

const getPriceByAttributes = async ({ product_id, attributes }: TProps) => {
  const payload = {
    attributes: attributes,
  };
  const url = baseUrl + `/api/product/${product_id}/price-with-attribute/`;
  const res = await axiosWrapper.post(url, payload);
  return res.data;
};

export const useGetProductPriceByAttributes = () => {
  return useMutation({
    mutationFn: (data: TProps) => getPriceByAttributes(data),
    onError: (data: any) => {
      for (let key in data) {
        showToast("error", `${key}:${data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
