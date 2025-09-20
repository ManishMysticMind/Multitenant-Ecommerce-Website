import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getCategoryList = async (shown_on_homepage?: boolean) => {
  let searchParams = new URLSearchParams();
  if (shown_on_homepage) {
    searchParams.append("show_on_homepage", String(shown_on_homepage));
  }

  const url = baseUrl + `/api/category/?${searchParams}`;
  const res = await axiosWrapper.get(url);

  return res.data.results;
};

export const useGetCategoryList = (shown_on_homepage?: boolean) => {
  return useQuery({
    queryKey: [`category `,shown_on_homepage],
    queryFn: () => getCategoryList(shown_on_homepage),
  });
};
