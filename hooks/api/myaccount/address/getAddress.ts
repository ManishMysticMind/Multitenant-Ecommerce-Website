import axiosWrapper, { baseUrl } from "../../axiosWrapper";

export async function getUserAddresses() {
  const data = localStorage.getItem("active_user");
  const user = data ? JSON.parse(data) : null;
  const userId = user?.user?.id;

  console.log("User id: ", userId);

  return axiosWrapper
    .get(`${baseUrl}/api/user/${userId}/address/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching user addresses:", error);
      throw error;
    });
}
