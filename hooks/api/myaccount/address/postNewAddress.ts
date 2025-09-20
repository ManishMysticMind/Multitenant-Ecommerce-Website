import { showToast } from "../../../../lib/toast";
import axiosWrapper, { baseUrl } from "../../axiosWrapper";

export async function postNewAddress(payload: any) {
  const data = localStorage.getItem("active_user");
  const user = data ? JSON.parse(data) : null;
  const userId = user?.user?.id;

  console.log("this is the userID", userId);
  const url = `${baseUrl}/api/user/${userId}/address/`;

  return axiosWrapper
    .post(url, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating user addresses:", error);
      throw error;
    });
}
