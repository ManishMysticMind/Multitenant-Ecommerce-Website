import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../auth/login";
import axiosWrapper from "../axiosWrapper";

const fetchUserReviews = async (userId: number) => {
  try {
    const url = baseUrl + `/api/products/reviews/?filterby=user-${userId}`;
    const res = await axiosWrapper.get(url);
    return res.data; // array of review objects
  } catch (error: any) {
    return Promise.reject(error?.response?.data || "Something went wrong");
  }
};

export const useUserReviews = (userId: number) => {
  return useQuery({
    queryKey: ["user-reviews", userId],
    queryFn: () => fetchUserReviews(userId),
    enabled: !!userId,
    select: (data) => data.results || [], // Select only results array
  });
};
