"use client";
import React, { use, useEffect } from "react";
import { Tab, Row, Col, Container } from "react-bootstrap";
import UserDetails from "../../components/ui/myaccount/UserDetails";
import UserSidebar from "../../components/ui/myaccount/UserSidebar";
import { useGetUserProfile } from "../../hooks/api/user/getProfile";
import Loading from "../../components/ui/Loading";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/auth/useAuth";

const MyAccount = () => {
  const router = useRouter();
  const { data: user } = useGetUserProfile();
  const { handleGuestAccess, role } = useAuth();

  useEffect(() => {
    handleGuestAccess("/login");
  }, [role, handleGuestAccess]);

  return (
    <>
      <Container className="my-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={12} md={3}>
              <UserSidebar />
            </Col>
            <Col sm={12} md={9}>
              {!user ? (
                <Loading />
              ) : user.is_guest ? (
                <h1>Please log in</h1>
              ) : (
                <UserDetails />
              )}
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default MyAccount;
