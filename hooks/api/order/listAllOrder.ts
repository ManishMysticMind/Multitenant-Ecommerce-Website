// list order by user

import axiosWrapper, { baseUrl } from "../axiosWrapper";

// list orders of current user with optional filters
export async function listOrders(filters = {}) {
  const data = localStorage.getItem("active_user");
  const user = data ? JSON.parse(data) : null;
  const userId = user?.user?.id;

  // Add user_id to filters
  const params = new URLSearchParams({ user_id: userId, ...filters }).toString();
  const url = `${baseUrl}/api/order/?${params}`;

  return axiosWrapper
    .get(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching user orders:", error);
      throw error;
    });
}
