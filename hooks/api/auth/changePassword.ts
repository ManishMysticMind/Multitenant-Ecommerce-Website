import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import axiosWrapper from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const postChangePassword = async (data: any) => {
  try {
    console.log("url", baseUrl);
    console.log("the data is", data);
    const res = await axiosWrapper.post(
      baseUrl + `/api/account/password/change/`,
      data,
    );
    console.log("res change pwd", res);

    return res.data;
  } catch (error: any) {
    console.log("on no", error);
    if (
      error.response?.data &&
      typeof error.response.data === "object" &&
      !Array.isArray(error.response.data)
    ) {
      const data = error.response.data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          const value = data[key];
          if (Array.isArray(value) && value.length > 0) {
            showToast("error", value[0], {
              theme: "light",
            });
          }
        }
      }
    }
    // const errorMessage =
    //   error.response?.data?.message ||
    //   error.message ||
    //   "An unexpected error occurred during password change.";
    // showToast("error", errorMessage, {
    //   theme: "light",
    // });
    throw error;
  }
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data) => postChangePassword(data),
    onSuccess: () => {
      showToast("success", "Password changed successfully!", {
        theme: "light",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred.";
      showToast("error", errorMessage, {
        theme: "light",
      });
    },
  });
};
