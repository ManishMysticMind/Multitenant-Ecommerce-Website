import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoPersonOutline } from "react-icons/io5";
import { styled } from "styled-components";
import { useGuestLogin } from "../../../hooks/api/auth/guestLogin";
import { useGetUserProfile } from "../../../hooks/api/user/getProfile";
import { useAuth } from "../../../hooks/auth/useAuth";
import CartLinkIcon from "../cart/CartLinkIcon";
import Button from "../common/Button";
import { GenericLink, GenericNextJSLink } from "../../../lib/constants/styles";

const UserProfileWishlistAndCartIcons = () => {
  const { data: userData } = useGetUserProfile();
  const { mutate: guestLoginCredentials } = useGuestLogin();
  const { logout, checkToken, role } = useAuth();
  const router = useRouter();

  // Add state to control dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle closing the dropdown
  const closeDropdown = () => setShowDropdown(false);

  const handleLogout = () => {
    logout();
    guestLoginCredentials();
    // Reload will close dropdown naturally, but explicit state update is good practice
    closeDropdown();
    window.location.reload();
  };

  const handleLogin = () => {
    // Close dropdown before navigating
    closeDropdown();
    router.push("/login");
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <IconsWrapper>
        <DropdownButton
          id="user-id"
          key="down"
          drop="down-centered"
          title={<IoPersonOutline className="SearchIcons text-white" />}
          // Control the show state
          show={showDropdown}
          onToggle={(nextShow: boolean) => setShowDropdown(nextShow)}
        >
          {role === "guest" ? (
            <div className="p-2">
              <Button
                label="Login"
                varient="primary"
                borderradius="5px"
                size="sm"
                onClick={() => {
                  handleLogin();
                }}
                width="100%"
              />
              <hr />
              <div className="d-flex justify-content-between">
                <Text>Don&apos;t have an account?</Text>
                <GenericLink href="/signup">Register</GenericLink>
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
                onClick={() => {
                  handleLogout();
                }}
                width="100%"
              />
            </div>
          )}
        </DropdownButton>
        {/* <IoMdHeartEmpty className="SearchIcons" /> */}
        <CartLinkIcon />
      </IconsWrapper>
    </>
  );
};

export default UserProfileWishlistAndCartIcons;

const IconsWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
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

  #user-id.dropdown-toggle:focus,
  #user-id.dropdown-toggle:active {
    background-color: transparent !important; d
    box-shadow: none !important;
    outline: none !important; d
  }
  #user-id.dropdown-toggle:hover {
    background-color: transparent !important;
  }
  #user-id.dropdown-toggle:focus,
  #user-id.dropdown-toggle:active,
  #user-id.dropdown-toggle:hover {
    /* Don't explicitly set color here unless needed to override Bootstrap default active/focus color */
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
  color: #333;
  margin-bottom: 0px;
`;

const SignUpLink = styled(Link)`
  font-size: 14px;
  color: #007bff;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
