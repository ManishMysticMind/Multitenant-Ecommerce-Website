import { useMutation } from "@tanstack/react-query";
import { TSignupFormSchema } from "../../../lib/validation/SignupForm/SignupFormSchema";
import { showToast } from "../../../lib/toast";
import axiosWrapper from "../axiosWrapper";
import { guestLoginCredentials } from "./guestLogin";

export const baseUrl = process.env.NEXT_PUBLIC_API_URL;

type TypeOfSignUpData = {
  userId: number;
  data: TSignupFormSchema;
};
const postRegisterCredentials = async ({ userId, data }: TypeOfSignUpData) => {
  const res = await axiosWrapper.patch(
    baseUrl + `/api/account/${userId}/`,
    data
  );
  localStorage.removeItem("active_user");
  await guestLoginCredentials();
  return res.data;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: TypeOfSignUpData) => postRegisterCredentials(data),
    onSuccess: () => {
      showToast("success", "Account Created Successfully", {
        theme: "light",
      });
      // setTimeout(
      //   () =>
      //     showToast("success", "Please login now", {
      //       theme: "light",
      //     }),
      //   1000
      // );
    },
    onError: ({ response }: any) => {
      Object.entries(response?.data).forEach(([field, messages]: any) => {
        showToast("error", `${messages[0]}`, {
          theme: "light",
        });
      });
    },
  });
};
