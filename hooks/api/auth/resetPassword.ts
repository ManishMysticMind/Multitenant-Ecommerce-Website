import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { showToast } from "../../../lib/toast";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const postResetPassword = async (data: any) => {
  const res = await axios.post(
    baseUrl + `/api/account/password/reset/confirm/`,
    data
  );
  // if (res.data.access) {
  //   localStorage.setItem("active_user", JSON.stringify(res.data));
  // }
  return res.data;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: (data) => postResetPassword(data),
    onSuccess: () => {
      showToast("success", "Password Reset Successful. Please login.", {
        theme: "light",
      });
    },
    onError: (data: any) => {
      showToast("error", `Password reset failed`, {
        theme: "light",
      });
    },
  });
};
