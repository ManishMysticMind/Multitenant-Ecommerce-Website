import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";
const getAdvertisement = async (advertisement_id: number) => {
  const url = baseUrl + `/api/advertisement/${advertisement_id}`;
  const res = await axiosWrapper.get(url);
  return res.data || [];
};

export const useGetAdvertisement = (advertisement_id: number) => {
  return useQuery({
    queryKey: [`advertisement ${advertisement_id}`],
    queryFn: () => getAdvertisement(advertisement_id),
    enabled: !!advertisement_id,
  });
};
