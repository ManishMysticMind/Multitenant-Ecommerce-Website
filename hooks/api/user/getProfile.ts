import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../auth/login";
import axiosWrapper from "../axiosWrapper";

const fetchUserProfile = async () => {
  try {
    const url = baseUrl + `/api/account/me/`;
    const res = await axiosWrapper.get(url);
    return res.data;
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useGetUserProfile = (select?: any) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchUserProfile,
    select,
  });
};
export const useGetUserId = () => {
  return useGetUserProfile((data: any) => {
    return data?.id;
  });
};
