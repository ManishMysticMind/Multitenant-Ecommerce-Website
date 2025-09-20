import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getWebSiteInfo = async () => {
  const url = baseUrl + `/api/tenant/detail/`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetWebSiteInfo = (select?: any) => {
  return useQuery({
    queryKey: ["all_website_info"],
    queryFn: getWebSiteInfo,
    select,
  });
};

export const useFilterWebSiteInfo = () => {
  return useGetWebSiteInfo((data: any) => {
    const filterData = {
      ...data,
      theme_color: null,
    };

    return filterData;
  });
};
