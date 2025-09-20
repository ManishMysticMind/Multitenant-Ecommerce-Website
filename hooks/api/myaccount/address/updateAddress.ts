import axiosWrapper, { baseUrl } from "../../axiosWrapper";

export async function updateAddress(payload: any, id: number) {
  const data = localStorage.getItem("active_user");
  const user = data ? JSON.parse(data) : null;
  const userId = user?.user?.id;

  return axiosWrapper
    .patch(`${baseUrl}/api/user/${userId}/address/${id}/`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating addresses:", error);
      throw error;
    });
}
