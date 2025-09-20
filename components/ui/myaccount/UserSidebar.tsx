import React from "react";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import { FiUser, FiKey } from "react-icons/fi";
import { GrLocation } from "react-icons/gr";
import { BsCartCheck } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa6";

const UserSidebar = () => {
  return (
    <>
      <UserSidebarMenu>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first">
              <FiUser /> My Account
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">
              <GrLocation />
              Address
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">
              <BsCartCheck />
              My Orders
            </Nav.Link>
          </Nav.Item>
          {/* <Nav.Item>
            <Nav.Link eventKey="fourth">
              <IoMdHeartEmpty />
              My Wishlist
            </Nav.Link>
          </Nav.Item> */}
          <Nav.Item>
            <Nav.Link eventKey="fifth">
              <FaRegStar />
              My Reviews
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="sixth">
              <FiKey />
              Change Password
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </UserSidebarMenu>
    </>
  );
};

export default UserSidebar;

const UserSidebarMenu = styled.div`
  box-shadow: 1px 1px 7px 3px #00000008;
  border-radius: 6px;
  .nav-pills {
    padding: 1rem 0rem;
  }
  .nav-link {
    color: black;
    padding: 0.9rem 1rem;
    border-radius: 0rem;
    border-left: 6px solid white;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
  .nav-link.active {
    background-color: #fff8d2;
    color: black;
    border-left: 6px solid ${(props) => props.theme.colors.primary};
  }
  .nav-link svg {
    font-size: 1.25rem;
  }
`;
