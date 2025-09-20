import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import { styled } from "styled-components";
import SectionTitle from "../../../common/SectionTitle";
import OrderCard from "../MyOrders/OrderCard";
import ReviewItem from "./ReviewItem";
import { listOrders } from "../../../../../hooks/api/order/listAllOrder";
import ReviewProduct from "../MyOrders/ReviewProduct";

const MyReviews = () => {
  const [toReviewOrders, setToReviewOrders] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("history");
  const [reviewedProducts, setReviewedProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchToReviewOrders = async () => {
      const filters = { order_status: "COMPLETED" };
      const res = await listOrders(filters);
      setToReviewOrders(res.results);
    };
    fetchToReviewOrders();
  }, []);

  const handleReviewClick = (product: any) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseReview = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (selectedProduct) {
    return (
      <ReviewContainer>
        <ReviewProduct
          product={selectedProduct}
          onClose={handleCloseReview}
          onSubmitReview={(data) => {
            console.log("Review submitted:", data);
            handleCloseReview();
          }}
        />
      </ReviewContainer>
    );
  }
  return (
    <>
      <ReviewContainer>
        <SectionTitle label="My Reviews" size="md" className="pt-0 pb-3" />
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k || "history")}
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="history" title="History">
            <ReviewItem />
          </Tab>
          <Tab eventKey="reviewed" title="To Review">
            <OrderCard
              allOrders={toReviewOrders}
              status="review_status"
              onReviewClick={handleReviewClick}
            />
          </Tab>
        </Tabs>
      </ReviewContainer>
    </>
  );
};

export default MyReviews;

const ReviewContainer = styled.div`
  .nav-link {
    color: black;
    padding: 0.5rem 2rem;
    border: none;
  }
  .nav-link.active {
    color: ${(props) => props.theme.colors.primary};
    border: none;
    padding: 0.5rem 2rem;
    border-bottom: 3px solid ${(props) => props.theme.colors.primary}!important;
  }
  .nav-link:hover {
    border-color: white;
  }
  .nav-tabs {
    border-bottom: 1px solid #e7e7e7;
  }
`;
