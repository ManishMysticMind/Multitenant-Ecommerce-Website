import { useMutation } from "@tanstack/react-query";
import axiosWrapper from "../axiosWrapper";
import { baseUrl } from "../auth/login";
import { showToast } from "../../../lib/toast";

interface SubmitReviewData {
  productId: number;
  orderId: number;
  rating: number;
  comment: string;
  image?: File[] | null;
}

const postReview = async ({
  productId,
  orderId,
  rating,
  comment,
  image,
}: SubmitReviewData) => {
  const formData = new FormData();
  formData.append("order_id", orderId.toString());
  formData.append("rating", rating.toString());
  formData.append("comment", comment);
  if (image) {
    formData.append("images", image instanceof File ? image : image[0]);
  }

  Array.from(formData.entries()).forEach(([key, value]) => {
    console.log(`${key}:`, value);
  });

  const url = `${baseUrl}/api/products/${productId}/reviews/`;
  const res = await axiosWrapper.formPost(url, formData);
  return res.data;
};

export const useSubmitReview = () => {
  return useMutation({
    mutationFn: (data: SubmitReviewData) => postReview(data),
    onSuccess: () => {
      showToast("success", "Review submitted successfully", {
        theme: "light",
      });
    },
    onError: (error: any) => {
      console.error("Error submitting review:", error);
      const result = error?.response?.data;
      if (result && typeof result === "object") {
        for (const key in result) {
          showToast("error", `${key}: ${result[key]}`, {
            theme: "light",
          });
        }
      } else {
        showToast("error", "Failed to submit review", {
          theme: "light",
        });
      }
    },
  });
};
