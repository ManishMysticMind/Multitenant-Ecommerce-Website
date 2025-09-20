"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import Button from "../../../common/Button";
import { FaStar } from "react-icons/fa6";
import { useSubmitReview } from "../../../../../hooks/api/review/submitReview";
import {
  reviewSchema,
  ReviewSchema,
} from "../../../../../lib/validation/ReviewForm/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RxCross1 } from "react-icons/rx";

interface ReviewProductProps {
  product: any;
  onClose: () => void;
  onSubmitReview?: (data: any) => void;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({
  product,
  onClose,
  onSubmitReview,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      image: null,
    },
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const { mutate, isPending } = useSubmitReview();
  const rating = watch("rating");
  const ratingMessage: Record<number, string> = {
    1: "Very Bad",
    2: "Bad",
    3: "Average",
    4: "Satisfactory",
    5: "Excellent",
  };

  // console.log("product.order_id:", product.order_id);

  const onSubmit = (data: ReviewSchema) => {
    const payload = {
      productId: product.id,
      orderId: product.order_id,
      rating: data.rating,
      comment: data.comment,
      image: data.image ? [data.image] : undefined,
    };
    console.log("Submitting review with payload:", payload);
    mutate(payload, {
      onSuccess: () => {
        onSubmitReview?.(payload);
        onClose();
      },
    });
  };

  return (
    <ReviewWrapper>
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <h4 className="my-0">Write a Review</h4>
        <Button label="Close" varient="secondary" onClick={onClose} size="sm" />
      </div>
      <div>
        <label className="fw-medium">Rate and review purchased product</label>
      </div>

      <ReviewItemsBox>
        <div className="product d-flex gap-4 align-items-start mb-3">
          <Image
            src={product.product_image ?? "/images/CardPlaceholder.png"}
            width={90}
            height={90}
            alt="Product"
          />
          <div className="d-flex flex-column ">
            <div className="fw-semibold">{product.name}</div>
            <div
              className="fw-normal mb-2"
              style={{ fontSize: "0.875rem", color: "#666" }}
            >
              Color: {product.color}
            </div>
            <div className="mb-3">
              <div className="d-flex align-items-end gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => setValue("rating", star)}
                    style={{
                      cursor: "pointer",
                      color: star <= rating ? "#FFD700" : "#ccc",
                      fontSize: "2rem",
                    }}
                  >
                    <FaStar size={24} />
                  </span>
                ))}
                {rating > 0 && (
                  <span
                    className="ms-2 mb-2 fw-semibold"
                    style={{ fontSize: "1rem", color: "#333" }}
                  >
                    ({ratingMessage[rating]})
                  </span>
                )}
              </div>
              {errors.rating && (
                <span className="text-danger ms-2">
                  {errors.rating.message}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label>Review Detail</label>
          <textarea
            rows={4}
            className="form-control p-3"
            {...register("comment")}
            placeholder="What do you think of this product?"
          />
          {errors.comment && (
            <span className="text-danger">{errors.comment.message}</span>
          )}
        </div>
        <UploadWrapper>
          <label htmlFor="imageUpload">
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              // {...register("images")}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                if (file) {
                  setValue("image", file);
                  setImagePreview(URL.createObjectURL(file));
                }
              }}
              hidden
            />
            <DropzoneBox
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{ borderColor: isDragging ? "#666" : "#ccc" }}
            >
              {imagePreview ? (
                <div className="position-relative w-100 h-100">
                  <button
                    type="button"
                    className="close-btn position-absolute top-5 end-0 m-1"
                    style={{
                      backgroundColor: "gray",
                      border: "1px solid lightgreen",
                      height: "20px",
                      width: "20px",
                      borderRadius: "50%",
                      color: "white",
                      padding: "0.25rem",
                      cursor: "pointer",
                      zIndex: 10,
                    }}
                    onClick={() => {
                      setValue("image", null);
                      setImagePreview(null);
                    }}
                  >
                    <RxCross1
                      size={11}
                      className="position-absolute top-0 start-0 m-1"
                    />
                  </button>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              ) : (
                <>
                  <UploadIcon
                    src="/icons/upload-cloud.svg"
                    alt="Upload"
                    width={30}
                    height={30}
                  />
                  <UploadText>
                    Click or drag image to this area to upload
                  </UploadText>
                </>
              )}
            </DropzoneBox>
          </label>
        </UploadWrapper>
        <div className="d-flex justify-content-start gap-2">
          <Button
            label="Submit Review"
            varient="primary"
            onClick={handleSubmit(onSubmit, (errors) => {
              console.log("Form validation errors:", errors);
            })}
            type="submit"
            borderradius="4px"
          />
          {/* <Button
            label="Cancel"
            varient="secondary"
            onClick={onClose}
            borderradius="4px"
          /> */}
        </div>
      </ReviewItemsBox>
    </ReviewWrapper>
  );
};

export default ReviewProduct;

const ReviewWrapper = styled.div`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 12px;
`;

const ReviewItemsBox = styled.div`
  border: 1px solid #e7e7e7;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 1rem;

  .form-control {
    border: 1px solid #e7e7e7;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    resize: none;
    height: 216px;
    width: 70%;
    margin-top: 0.5rem;
  }
  .upload-input {
    border: 1px solid #e7e7e7;
    border-radius: 12px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    width: 100%;
    margin-top: 0.5rem;
  }
  .close-btn {
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const UploadWrapper = styled.div`
  margin-top: 1rem;
`;

const DropzoneBox = styled.div`
  border: 2px dashed #ccc;
  padding: 0.5rem;
  width: 100%;
  aspect-ratio: 1 / 1;
  max-width: 200px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.3s;
  &:hover {
    border-color: #999;
  }
`;

const UploadText = styled.p`
  font-size: 0.875rem;
  color: #777;
  margin-top: 0.5rem;
`;

const UploadIcon = styled(Image)`
  opacity: 0.6;
`;
