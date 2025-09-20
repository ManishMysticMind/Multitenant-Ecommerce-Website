import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa6";

import SectionTitle from "../../../common/SectionTitle";
import OrderCard from "./OrderCard";
import { listOrders } from "../../../../../hooks/api/order/listAllOrder";
import { BsCartCheck } from "react-icons/bs";
import Button from "../../../common/Button";
import { IoChevronForward } from "react-icons/io5";
import { useRouter } from "next/navigation";
import ReviewProduct from "./ReviewProduct";

type tabType = "All" | "To Pay" | "To Ship" | "To Review";

const MyOrders = () => {
  const router = useRouter();
  const [allOrders, setAllOrders] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<tabType>("All");
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleReviewClick = (product: any) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleCloseReview = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleResize = () => {
    // bootstrap small screen width is 768
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    // initialize for small screen
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTabSelect = (key: tabType) => {
    setActiveTab(key);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      let filters: any = {};

      if (activeTab === "To Pay") {
        filters.payment_status = "P";
      } else if (activeTab === "To Ship") {
        filters.shipping_status = "PENDING";
        filters.payment_status__ne = "P";
      } else if (activeTab === "To Review") {
        filters.order_status = "COMPLETED";
        filters.review_status = "PENDING";
      }

      const res = await listOrders(filters);
      setAllOrders(res.results);
    };

    fetchOrders();
    console.log("Active Tab:", activeTab);
    console.log("All Orders:", allOrders);
  }, [activeTab]);

  const handleRedirectShop = () => {
    router.push("/");
  };
  if (selectedProduct) {
    return (
      <MyOrderContainer>
        <ReviewProduct
          product={selectedProduct}
          onClose={handleCloseReview}
          onSubmitReview={(data) => {
            // Handle review submission logic here
            console.log("Review submitted:", data);
          }}
        />
      </MyOrderContainer>
    );
  }

  if (allOrders.length === 0)
    return (
      <>
        <MyOrderContainer>
          <div className="d-flex justify-content-between align-items-center">
            <SectionTitle label="My Orders" size="md" className="pt-0 pb-3" />
          </div>
          <div className="d-flex justify-content-center">
            <div className="tabContents mb-5">
              <BsCartCheck className="orderIcon" />
              <p className="mb-0 text-center">
                No orders placed yet. Shop now to get started!
              </p>
              <Button
                varient="primary-outline"
                label={
                  <span>
                    Continue Shopping <IoChevronForward />
                  </span>
                }
                width="17rem"
                onClick={handleRedirectShop}
              />
            </div>
          </div>
        </MyOrderContainer>
      </>
    );

  return (
    <MyOrderContainer>
      <div className="d-flex justify-content-between align-items-center">
        <SectionTitle label="My Orders" size="md" className="pt-0 pb-3" />
        {isSmallScreen && (
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {activeTab}
              <FaAngleDown />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setActiveTab("All")}>
                All
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setActiveTab("To Pay")}>
                To Pay
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setActiveTab("To Ship")}>
                To Ship
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setActiveTab("To Review")}>
                To Review
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      {!isSmallScreen && (
        <Tabs
          activeKey={activeTab}
          id="uncontrolled-tab-example"
          className="mb-3"
          onSelect={handleTabSelect as any}
        >
          <Tab eventKey="All" title="All"></Tab>
          <Tab eventKey="To Pay" title="To Pay"></Tab>
          <Tab eventKey="To Ship" title="To Ship"></Tab>
          <Tab eventKey="To Review" title="To Review"></Tab>
          {/* Uncomment when implemented */}
          {/* <Tab eventKey="receive" title="To Receive">
            not implemented yet
            <ToPayProducts />
          </Tab>
          <Tab eventKey="review" title="To Review">
            <ToReviewProducts />
          </Tab> */}
        </Tabs>
      )}
      {activeTab === "All" && (
        <OrderCard allOrders={allOrders} status="order_status" />
      )}
      {activeTab === "To Pay" && (
        <OrderCard allOrders={allOrders} status="payment_status" />
      )}
      {activeTab === "To Ship" && (
        <OrderCard allOrders={allOrders} status="shipping_status" />
      )}
      {activeTab === "To Review" && (
        <OrderCard
          allOrders={allOrders}
          status="review_status"
          onReviewClick={handleReviewClick}
        />
      )}
    </MyOrderContainer>
  );
};

export default MyOrders;

const MyOrderContainer = styled.div`
  .dropdown-toggle::after {
    display: none;
  }
  #dropdown-basic {
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: unset;
    color: #aaaaaa;
    border: 1px solid #aaaaaa;
  }
  .dropdown-item {
    color: #aaaaaa;
  }
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
  .tabContents {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
  .orderIcon {
    color: ${(props) => props.theme.colors.primary};
    font-size: 4rem;
    background-color: #faf6f4;
    border-radius: 50%;
    padding: 1rem;
    overflow: visible;
  }
`;
