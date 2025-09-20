import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import styled from "styled-components";
import { CiLocationOn, CiPhone } from "react-icons/ci";
import { FiMail, FiUser } from "react-icons/fi";
import { Dropdown } from "react-bootstrap";

const ShippingInfo = ({
  selectedShippingInfo,
  allShippingData,
  setSelectedShipping,
}: {
  selectedShippingInfo: any;
  allShippingData: any[];
  setSelectedShipping: (arg0: any) => {};
}) => {
  const handleSelectShippingInfo = (shippingInfo: any) => {
    setSelectedShipping(shippingInfo);
  };

  return (
    <>
      <ShippingInfoContainer>
        <div className="d-flex justify-content-between mb-3">
          {/* Dropdown for selecting shipping address */}
          <Dropdown>
            <div className="fw-bold px-2">Select Shipping Address</div>
            <div className="px-2">
              <Form.Select
                value={selectedShippingInfo?.id || " "}
                onChange={(e) => {
                  const selectedId = e.target.value;
                  // Find the selected shipping object by ID
                  const foundShippingInfo = allShippingData.find(
                    (item) => String(item.id) === selectedId
                  ); // Ensure comparison is consistent (string)
                  if (foundShippingInfo) {
                    handleSelectShippingInfo(foundShippingInfo);
                  } else {
                    handleSelectShippingInfo({});
                  }
                }}
                className="my-1"
              >
                {allShippingData.map((shippingInfo) => (
                  <option key={shippingInfo?.id} value={shippingInfo?.id}>
                    {shippingInfo?.name + " - " + shippingInfo?.address}
                  </option>
                ))}
                <option value={undefined}>Create New</option>
              </Form.Select>
            </div>
          </Dropdown>
        </div>
        {selectedShippingInfo && selectedShippingInfo.id && (
          <Row>
            {/* Left Column */}
            <Col xs={12} md={6} className="mb-3">
              <Row className="mb-2 align-items-center">
                <Col xs="auto">
                  <FiUser />
                </Col>
                <Col>
                  <span>{selectedShippingInfo?.name}</span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs="auto">
                  <CiPhone />
                </Col>
                <Col>
                  <span>{selectedShippingInfo?.phone || "Not Found"}</span>
                </Col>
              </Row>
            </Col>

            {/* Right Column */}
            <Col xs={12} md={6}>
              <Row className="mb-2 align-items-center">
                <Col xs="auto">
                  <FiMail />
                </Col>
                <Col>
                  <span>{selectedShippingInfo?.email}</span>
                </Col>
              </Row>
              <Row className="align-items-center">
                <Col xs="auto">
                  <CiLocationOn />
                </Col>
                <Col>
                  <span>{selectedShippingInfo?.address}</span>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </ShippingInfoContainer>
    </>
  );
};

export default ShippingInfo;

const ShippingInfoContainer = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 0px 12px 2px #0000000a;
  border-radius: 6px;
  padding: 10px 15px; /* Add padding for spacing */
  margin-bottom: 1rem;
`;
