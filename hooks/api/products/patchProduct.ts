// import { useMutation, useQueryClient} from "@tanstack/react-query";
// import { showToast } from "@/lib/toast";
// import axiosWrapper from "../../axiosWrapper";
// import { baseUrl } from "../../auth/login";

// interface TPatchProductData {
//   data: any;
//   product_id: number;
// }

// const patchProduct= async ({ data, product_id }: TPatchProductData) => {
//   try{
//   const url = baseUrl + `/api/product/${product_id}/`;
//   const res = await axiosWrapper.formPatch(url, data);
//   return res.data;
//   }
//   catch(error:any){
//     return Promise.reject(error?.response?.data || "Something went wrong");
//   }
// };

// export const usePatchProduct = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (patchEventData: TPatchProductData) =>
//     patchProduct(patchEventData),

//     onSuccess: (data) => {
//       showToast("success", "Product Updated", {
//         theme: "light",
//       });
//       queryClient.invalidateQueries({ queryKey: ["company_list"] });
//     },
//     onError: (data: any) => {
//       showToast("error", `${data.response.data.detail} || "Something went wrong"`, {
//         theme: "light",
//       });
//     },
//   });
// };


