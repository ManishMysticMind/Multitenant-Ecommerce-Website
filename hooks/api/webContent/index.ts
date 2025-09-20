import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getWebContent = async (page_name:string) => {
  const url = baseUrl + `/api/webcontent/${page_name}/`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetWebContent = (page_name:string) => {
  return useQuery({
    queryKey: [`page ${page_name}`],
    queryFn:()=> getWebContent(page_name),
  });


};
