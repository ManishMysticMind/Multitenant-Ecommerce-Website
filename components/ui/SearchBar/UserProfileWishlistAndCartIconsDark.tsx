import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoPersonOutline } from "react-icons/io5";
import { styled } from "styled-components";
import { useGuestLogin } from "../../../hooks/api/auth/guestLogin";
import { useGetUserProfile } from "../../../hooks/api/user/getProfile";
import { useAuth } from "../../../hooks/auth/useAuth";
// import CartLinkIcon from "../cart/CartLinkIcon";
import Button from "../common/Button";
import CartLinkIconDark from "../cart/CartLinkIconDark";
import { GenericLink, GenericNextJSLink } from "../../../lib/constants/styles";

const UserProfileWishlistAndCartIconsDark = () => {
  const { data: userData } = useGetUserProfile();
  const { mutate: guestLoginCredentials } = useGuestLogin();
  const { logout, checkToken, role } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    guestLoginCredentials();
    window.location.reload();
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <IconsWrapper>
        <div className="rounded-circle border border-black">
          <DropdownButton
            id="user-id"
            key="down"
            drop="down-centered"
            title={<IoPersonOutline className="SearchIcons" />}
          >
            {role === "guest" ? (
              <div className="p-2">
                <Button
                  label="Login"
                  varient="primary"
                  borderradius="5px"
                  size="sm"
                  onClick={() => handleLogin()}
                  width="100%"
                />
                <hr />
                <div className="d-flex justify-content-start">
                  <Text className="me-1">Don&apos;t have an account?</Text>
                  <GenericLink href="/signup" style={{ fontSize: "14px" }}>
                    Register
                  </GenericLink>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column px-3 py-1">
                <strong>{userData?.username}</strong>
                <GenericNextJSLink href="/my-account">
                  Visit Profile
                </GenericNextJSLink>
                <Dropdown.Divider />
                <Button
                  label="Log Out"
                  varient="primary"
                  borderradius="5px"
                  size="sm"
                  onClick={() => handleLogout()}
                  width="100%"
                />
              </div>
            )}
          </DropdownButton>
          {/* <IoMdHeartEmpty className="SearchIcons" /> */}
        </div>
        <div className="rounded-circle border border-black">
          <CartLinkIconDark />
        </div>
      </IconsWrapper>
    </>
  );
};

export default UserProfileWishlistAndCartIconsDark;

const IconsWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-right: 1rem;

  .SearchIcons {
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 2.1rem;
    padding: 0.4rem 0.3rem;
    border-radius: 50%;
    color: black;
  }
  @media screen and (max-width: 800px) {
    gap: 0.5rem;
  }
  #user-id {
    background-color: unset;
    border: none;
    padding: 0rem;
    color: black;
  }
  #user-id::after {
    display: none;
  }
  .dropdown-menu.show {
    margin-top: 0.5rem;
  }
  .dropdown-item:active {
    color: unset;
    text-decoration: none;
    background-color: unset;
  }
  .dropdown-item:hover {
    background-color: unset;
  }
`;

const Text = styled.p`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.textPrimary || "#007bff"};
  margin-bottom: 0px;
`;

const SignUpLink = styled(Link)`
  font-size: 14px;
  color: ${(props) => props.theme?.colors?.primary || "#007bff"};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
