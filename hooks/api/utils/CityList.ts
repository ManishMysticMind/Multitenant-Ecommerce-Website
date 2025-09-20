import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getCityList = async (country_id: any, state_id: any) => {
  const url = baseUrl + `/api/country/${country_id}/state/${state_id}/cities/`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetCities = (
  country_id: string | undefined,
  state_id: string | undefined
) => {
  return useQuery({
    queryKey: [`cities`],
    queryFn: () => getCityList(country_id, state_id),
    enabled: !!(country_id && state_id),
  });
};
