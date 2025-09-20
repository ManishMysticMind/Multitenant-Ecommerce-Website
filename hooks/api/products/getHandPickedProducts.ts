import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";


const getHandPickedProduct = async () => {
  const url = baseUrl + '/api/collection/70/products/';
  const res = await axiosWrapper.get(url);

  return res.data.results;
};

export const useGetHandPickedProduct = () => {
  return useQuery({
    queryKey: [`Hand Pciked For You`],
    queryFn:()=> getHandPickedProduct(),
  });
};
