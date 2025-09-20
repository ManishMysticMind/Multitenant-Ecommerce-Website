import axiosWrapper, { baseUrl } from "../axiosWrapper";

export const getBlogs = async () => {
  const url = baseUrl + "/api/blog/?status=published";
  const res = await axiosWrapper.get(url);
  return res.data[0] || res.data;
};
