import React, { useState } from "react";
import SectionTitle from "../../../common/SectionTitle";
import styled from "styled-components";
import { Col, Row } from "react-bootstrap";
import UserDetailEdit from "./edit/UserDetailEdit";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useGetUserProfile } from "../../../../../hooks/api/user/getProfile";
import Button from "../../../common/Button";

const UserInfo = () => {
  const [activeForm, setActiveForm] = useState("myAccount");
  const handleEditUser = () => setActiveForm("editUser");
  const handleBack = () => setActiveForm("myAccount");
  const { data: user } = useGetUserProfile();
  return (
    <>
      {activeForm === "myAccount" && (
        <MyAccount className="my-account">
          <SectionTitle label="My Account" size="md" className="pt-0 pb-3" />
          <Text className="mb-2">
            <strong>Contact Information</strong>
          </Text>
          <Text>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text>{user?.email}</Text>
          <Text>{user?.phone}</Text>
          <Button
            className="text-decoration-none edit-user-detail mt-3"
            onClick={handleEditUser}
            label="Edit"
            size="sm"
          />
        </MyAccount>
      )}
      {activeForm === "editUser" && (
        <>
          <EditContainer>
            <UserDetailEdit />
            <Button
              className="go-back"
              onClick={handleBack}
              icon={<AiOutlineArrowLeft className="me-1" />}
              label="Go Back"
              size="lg"
              varient="primary-outline"
              borderradius="5px"
              width="12rem"
            />
          </EditContainer>
        </>
      )}
    </>
  );
};

export default UserInfo;

const MyAccount = styled.div`
  .divider {
    color: #e7e7e7;
    margin-top: 0.5rem;
  }
  .edit-user-detail {
    background-color: unset !important;
    border: none;
    color: #0038b0 !important;
    padding: 0rem;
  }
  .edit-user-detail:active {
    background-color: unset;
    border: none;
    color: #0038b0;
  }
  .edit-user-detail:hover {
    box-shadow: none;
  }
`;

const Text = styled.div`
  color: #313131;
  margin-bottom: 0.3rem;
`;
const EditContainer = styled.div`
  position: relative;
  .go-back {
    position: absolute;
    bottom: 1rem;
    left: 0rem;
  }
  .edit-user-detail:hover {
    box-shadow: none;
  }
`;
