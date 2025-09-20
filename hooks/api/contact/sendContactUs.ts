import axiosWrapper, { baseUrl } from "../axiosWrapper";

export const sendContactUs = async (data: any) => {
  const payload = {
    ...data,
    // name, email, message
    phone: data.phone_number,
  };
  const url = baseUrl + "/api/account/contact/";
  const res = await axiosWrapper.post(url, payload);
  return res.data;
};
