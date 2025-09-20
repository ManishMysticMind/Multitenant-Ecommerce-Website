import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const getCountryList = async () => {
  const url = baseUrl + `/api/country/`;
  const res = await axiosWrapper.get(url);
  return res.data;
};

export const useGetCountries = () => {
  return useQuery({
    queryKey: [`countries`],
    queryFn: () => getCountryList(),
  });
};
