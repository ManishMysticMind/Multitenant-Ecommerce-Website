"use client";

import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import styled from "styled-components";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
import { FaChevronLeft, FaChevronRight, FaReply } from "react-icons/fa6";
import { useUserReviews } from "../../../../../hooks/api/review/useUserReviews";
import { useGetUserId } from "../../../../../hooks/api/user/getProfile";
import { useUserOrders } from "../../../../../hooks/api/review/useUserOrders";
import ProductInfoBlock from "./ProductInfoBlock";

const ReviewItem = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: userId } = useGetUserId();
  // console.log("User ID:", userId);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { data: reviews = [], isLoading } = useUserReviews(userId);

  const currentReviews = reviews.slice(indexOfFirstItem, indexOfLastItem);

  const { data: orders = [] } = useUserOrders();
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedReplies, setExpandedReplies] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleComment = (id: number) => {
    setExpandedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleReply = (id: number) => {
    setExpandedReplies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const getProductDetailsFromOrder = (productId: number) => {
    for (const order of orders) {
      const item = order.items?.find((i: any) => i.product === productId);
      if (item) return item;
    }
    return null;
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/\b(am|pm)\b/, (match) => match.toUpperCase());
  };
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  if (isLoading) return <p>Loading reviews...</p>;
  if (!reviews.length) return <p>No reviews submitted yet.</p>;

  return (
    <>
      <ReviewItemContainer className="d-flex flex-column gap-3 mt-4">
        {currentReviews.map((node: any) => {
          const productDetails = getProductDetailsFromOrder(node.product);
          const productImage =
            productDetails?.product_image || "/placeholder.png";

          return (
            <Col sm={12} key={node.id} className="review-col">
              <ProductInfoBlock
                productImage={productImage}
                productName={node.product_name}
                rating={node.rating}
                color={productDetails?.color}
                size={productDetails?.size}
                weight={productDetails?.weight}
              />
              <div className="mt-4">
                <ClampedText $expanded={!!expandedComments[node.id]}>
                  {node.comment}
                </ClampedText>
                {node.comment.length > 100 && (
                  <span
                    onClick={() => toggleComment(node.id)}
                    style={{
                      color: "#868686",
                      textDecoration: "underline",
                      cursor: "pointer",
                      fontSize: "14px",
                    }}
                  >
                    {expandedComments[node.id] ? "Read less" : "Read more"}
                  </span>
                )}
              </div>
              <div className="d-flex gap-3 mt-3 pt-1">
                {node.photos?.length > 0 &&
                  node.photos.map((photo: any, index: number) => (
                    <Image
                      key={photo.id || index}
                      src={photo.image ?? "/placeholder.png"}
                      width={100}
                      height={100}
                      alt={`Review Image ${index + 1}`}
                      className="review-image"
                    />
                  ))}
              </div>
              <div className="d-flex justify-content-between mt-2 reviewDate">
                {/* <div>
                <span className="light">Purchased On: </span>
                {node.purchase_date}
              </div> */}
                <div>
                  <span className="light">Reviewed On: </span>
                  {formatDate(node.created_at)}
                </div>
              </div>
              {node.replies?.length > 0 && (
                <div className="seller-reply mt-3">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <Image
                      src="/icons/reply.svg"
                      width={30}
                      height={30}
                      alt="Reply Icon"
                    />
                    <span className="fw-semibold">Replies from Seller:</span>
                  </div>
                  {node.replies.map((reply: any) => (
                    <div key={reply.id} className="mb-3">
                      <ClampedText $expanded={!!expandedReplies[reply.id]}>
                        {reply.comment}
                      </ClampedText>
                      {reply.comment.length > 100 && (
                        <span
                          onClick={() => toggleReply(reply.id)}
                          style={{
                            color: "#868686",
                            textDecoration: "underline",
                            cursor: "pointer",
                            fontSize: "14px",
                          }}
                        >
                          {expandedReplies[reply.id]
                            ? "Read less"
                            : "Read more"}
                        </span>
                      )}

                      <div className="light reviewDate">
                        Replied On: {formatDate(reply.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Col>
          );
        })}
        <div className="pagination-controls mt-4 d-flex justify-content-between align-items-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage(currentPage - 1);
            }}
            className="d-flex align-items-center gap-1"
          >
            <FaChevronLeft size={14} /> Previous
          </button>
          <div className="d-flex gap-2 align-items-center">
            {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                }}
                className={`page-button ${
                  page === currentPage ? "active" : ""
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={indexOfLastItem >= (reviews?.length || 0)}
            onClick={() => {
              setCurrentPage(currentPage + 1);
            }}
            className="d-flex align-items-center gap-1"
          >
            Next <FaChevronRight size={14} />
          </button>
        </div>
      </ReviewItemContainer>
    </>
  );
};

export default ReviewItem;

const ReviewItemContainer = styled.div`
  .review-col {
    border: 0.4px solid #e7e7e7;
    border-radius: 6px;
    padding: 0.7rem 1.5rem;
    @media screen and (max-width: 600px) {
      padding: 0.7rem 1rem;
    }
  }
  .light {
    color: #656565;
  }
  .reviewDate {
    font-size: 12px;
    margin-top: 0.5rem;
  }
  .review-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    margin-right: 0.5rem;
  }
  .seller-reply {
    border-top: #dedede 0.4px solid;
    padding: 1rem 0rem 0rem 0rem;
  }
  .pagination-controls button {
    padding: 0.4rem 0.8rem;
    border: none;
    background-color: transparent;
    color: gray;
    border-radius: 4px;
    cursor: pointer;
  }
  .page-button {
    padding: 0.4rem 0.75rem;
    background-color: transparent;
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    font-weight: 500;
    color: #555;

    &.active {
      background-color: #343434;
      color: white;
      border-color: #343434;
    }

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
const ProductName = styled.div`
  font-size: 1.125rem;
`;
const ClampedText = styled.div<{ $expanded?: boolean }>`
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.$expanded ? "none" : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;
