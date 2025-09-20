import { useMutation } from "@tanstack/react-query";
import { showToast } from "../../../lib/toast";
import axiosWrapper from "../axiosWrapper";
import { ILoginResponse } from "../../auth/useAuth";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const guestLoginCredentials = async () => {
  const data = localStorage.getItem("active_user");
  const userData: ILoginResponse = data && JSON.parse(data);
  const token = userData?.access;

  if (!token) {
    const res = await axiosWrapper.post(baseUrl + `/api/guest-token/`, {});
    if (res.status === 200 || 201) {
      if (res.data.access) {
        localStorage.setItem("active_user", JSON.stringify(res.data));
      }
      return res.data;
    }
  } else {
    return null; // Return null if the token already exists
  }
};

export const useGuestLogin = () => {
  return useMutation({
    mutationFn: () => guestLoginCredentials(),
    onError: (data: any) => {
      for (let key in data?.response?.data) {
        showToast("error", `${data?.response?.data[key]}`, {
          theme: "light",
        });
      }
    },
  });
};
