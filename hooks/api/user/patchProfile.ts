import { useMutation, useQueryClient } from "@tanstack/react-query";
  import { baseUrl } from "../auth/login";
  import axiosWrapper from "../axiosWrapper";
import { showToast } from "../../../lib/toast";

  
  interface PatchUserData {
    data: any;
    userId: number;
  }
  
  const patchUserData = async ({ data, userId }: PatchUserData) => {

    const url = baseUrl + `/api/account/${userId}/`;
    const res = await axiosWrapper.formPatch(url, data);
    return res.data;
  };
  
  export const usePatchUserProfile = () => {
    return useMutation({
      mutationFn: (data: PatchUserData) => patchUserData(data),
      onSuccess: (data) => {
        showToast("success", "Profile Updated", {
          theme: "light",
        });
      },
      onError: (data: any) => {
        const result=data?.response.data;
        for (const key in result) {
            showToast("error", `${key +":"+ result[key]}`, {
                theme: "light",
              })
        }
     }
    });
  };



  