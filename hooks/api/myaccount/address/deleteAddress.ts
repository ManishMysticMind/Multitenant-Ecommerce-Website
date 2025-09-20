import axiosWrapper, { baseUrl } from "../../axiosWrapper";

export async function deleteUserAddress(addressId: number) {
  const data = localStorage.getItem("active_user");
  const user = data ? JSON.parse(data) : null;
  const userId = user?.user?.id;

  const url = `${baseUrl}/api/user/${userId}/address/${addressId}`;

  return axiosWrapper
    .delete(url)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error deleting user addresses:", error);
      throw error;
    });
}
