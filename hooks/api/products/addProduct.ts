// import { useMutation } from "@tanstack/react-query";
// import axiosWrapper, { baseUrl } from "../axiosWrapper";

// const postProduct = async (data: FormData) => {
//   try {
//     const url = baseUrl + "/api/product/";
//     const res = await axiosWrapper.formPost(url, data);
//     return res.data;
//   } catch (error: any) {
//     return Promise.reject(error?.response?.data || "Something went wrong");
//   }
// };

// export const useCreateProduct = () => {
//   return useMutation({
//     mutationFn: (data: FormData) => postProduct(data),
//     onSuccess: () => {
//       showToast("success", "Product Created Successfully", {
//         theme: "light",
//       });
//     },
//     onError: (data: any) => {
//       for (let key in data) {
//         showToast("error", `${key}:${data[key]}`, {
//           theme: "light",
//         });
//       }
//     },
//   });
// };
