import { useQuery } from "@tanstack/react-query";
import axiosWrapper, { baseUrl } from "../axiosWrapper";

const fetchUserOrders = async () => {
  const data = localStorage.getItem("active_user");
  const user = data ? JSON.parse(data) : null;
  const userId = user?.user?.id;
  const params = new URLSearchParams({ user_id: userId }).toString();
  const url = `${baseUrl}/api/order/?${params}`;
  const res = await axiosWrapper.get(url);
  return res.data.results;
};

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
  });
};
