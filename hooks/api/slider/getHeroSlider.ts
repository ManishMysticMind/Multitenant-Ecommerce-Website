import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../auth/login";
import axiosWrapper from "../axiosWrapper";

const getSliders = async () => {
  const url = `${baseUrl}/api/slider/`;
  const res = await axiosWrapper.get(url);
  return res.data.results;
};

export const useGetSlidersList = () => {
  return useQuery({
    queryKey: ["slider_list"],
    queryFn: () => getSliders(),
  });
};
