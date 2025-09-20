import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getCollectionList = async (shown_on_homepage?: boolean) => {
  let searchParams = new URLSearchParams();
  if (shown_on_homepage) {
    searchParams.append("show_on_homepage", String(shown_on_homepage));
  }

  const url = baseUrl + `/api/collection/?${searchParams}`;
  const res = await axiosWrapper.get(url);

  return res.data.results;
};

export const useGetCollectionList = (shown_on_homepage?: boolean) => {
  return useQuery({
    queryKey: [`collection `,shown_on_homepage],
    queryFn: () => getCollectionList(shown_on_homepage),
  });
};
