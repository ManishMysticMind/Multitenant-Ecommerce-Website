// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import axiosWrapper from "../axiosWrapper";


// const deleteProduct = async (product_id: number) => {
//   try{
//   const url = baseUrl + `/api/product/${product_id}/`;
//   const res = await axiosWrapper.delete(url);
//   return res.data;
//   }
//   catch(error:any){
//     return Promise.reject(error?.response?.data || "Something went wrong");
//   }
// };

// export const useDeleteProduct = () => {
//   return useMutation({
//     mutationFn: (product_id: number) => deleteProduct(product_id),
//    onSuccess:()=>{
//    },
//    onError:(data:any)=>{
//     for (let key in data) {
//       showToast("error", `${key}:${data[key]}`, {
//         theme: "light",
//       });
//     }
//    }

//   });
// };
