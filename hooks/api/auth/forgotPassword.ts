import { useMutation } from "@tanstack/react-query";
import { TForgetPassword } from "../../../lib/validation/forgotPasswordSchema";
import { showToast } from "../../../lib/toast";
import axiosWrapper from "../axiosWrapper";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const postForgetPassword = async (data: TForgetPassword) => {
  try {
    const res = await axiosWrapper.post(
      baseUrl + `/api/account/password/reset/link/`,
      data
    );
    if (res.data) {
      showToast("success", "Mail sent. Check your mail.");
    }
    return res.data;
  } catch (error: any) {
    // showToast("error", `${error?.response?.data?.detail}`, {
    //   theme: "light",
    // });
  }
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (data: TForgetPassword) => postForgetPassword(data),
    onError: (data: any) => {
      showToast("error", `${data.response.data.detail}`, {
        theme: "light",
      });
    },
  });
};
