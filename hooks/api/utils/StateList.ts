import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getStatesList = async (country_id:any) => {
  const url = baseUrl + `/api/country/${country_id}/state/`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetStates = (country_id:string | undefined) => {
  return useQuery({
    queryKey: [`states`],
    queryFn: () => getStatesList(country_id),
    enabled: !!country_id
  });
};
