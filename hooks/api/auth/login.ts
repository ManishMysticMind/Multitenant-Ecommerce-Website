import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../lib/toast";
import axiosWrapper from "../axiosWrapper";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const postLoginCredentials = async (data: any) => {
  const res = await axiosWrapper.post(baseUrl + `/api/token/`, data);
  if (res.status === 200) {
    if (res.data.access) {
      localStorage.setItem("active_user", JSON.stringify(res.data));
    }
    return res.data;
  }
};

export const usePostLogin = () => {
  return useMutation({
    mutationFn: (data) => postLoginCredentials(data),
    onSuccess: (data) => {
      showToast("success", "Login Successful", {
        theme: "light",
      });
    },
    onError: (data: any) => {
      for(let key in data?.response?.data) {
        showToast("error", `${data?.response?.data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
