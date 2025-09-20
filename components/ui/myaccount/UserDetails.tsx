import React from "react";
import { Tab } from "react-bootstrap";
import { styled } from "styled-components";
import UserInfo from "./accountDetails/UserInfo/UserInfo";
import UserAddress from "./accountDetails/UserAdress/UserAddress";
import MyOrders from "./accountDetails/MyOrders/MyOrders";
import MyWishlist from "./accountDetails/MyWishlist/MyWishlist";
import MyReviews from "./accountDetails/MyReviews/MyReviews";
import ChangePassword from "./accountDetails/ChangePassword/ChangePassword";

const UserDetails = () => {
  return (
    <>
      <UserInformation>
        <Tab.Content>
          <Tab.Pane eventKey="first">
            <UserInfo />
          </Tab.Pane>
          <Tab.Pane eventKey="second">
            <UserAddress />
          </Tab.Pane>
          <Tab.Pane eventKey="third">
            <MyOrders />
          </Tab.Pane>
          {/* fourth and fifth not used right now */}
          <Tab.Pane eventKey="fourth">
            <MyWishlist />
          </Tab.Pane>
          <Tab.Pane eventKey="fifth">
            <MyReviews />
          </Tab.Pane>
          <Tab.Pane eventKey="sixth">
            <ChangePassword />
          </Tab.Pane>
        </Tab.Content>
      </UserInformation>
    </>
  );
};

export default UserDetails;

const UserInformation = styled.div`
  box-shadow: 1px 1px 7px 3px #00000008;
  padding: 1.5rem;
  border-radius: 6px;
  .edit-user-detail {
    background-color: unset;
    border: none;
    color: black;
    padding: 0rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }
  .edit-user-detail:active {
    background-color: unset;
    border: none;
    color: black;
  }
  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`;
