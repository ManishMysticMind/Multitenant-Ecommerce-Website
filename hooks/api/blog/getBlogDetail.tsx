import axiosWrapper, { baseUrl } from "../axiosWrapper";

export const getBlogDetail = async (slug: string) => {
  const url = baseUrl + "/api/blog-details/" + slug;
  const res = await axiosWrapper.get(url);
  return res.data[0] || res.data;
};
