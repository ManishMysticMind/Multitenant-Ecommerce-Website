"use client";
import React, { useState } from "react";
import styled from "styled-components";
import { Container, Row } from "react-bootstrap";
import Logo from "../common/Logo";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import UserProfileWishlistAndCartIcons from "../SearchBar/UserProfileWishlistAndCartIcons";
import SearchBarDark from "../SearchBar/SearchBarDark";

const Header = ({ logoUrl }: { logoUrl: string }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSearchSubmit = (e: boolean = false) => {
    setIsHovered(e);
  };

  return (
    <>
      <Row
        onMouseLeave={() => setIsHovered(false)}
        style={{ backgroundColor: "#6bbd49" }}
      >
        <HeaderWrapper>
          <Container>
            {/* First Navbar - Logo, Search, Icons */}
            <Navbar
              expand="lg"
              className="w-100 p-0 d-flex justify-content-between"
            >
              <Navbar.Toggle
                aria-controls="nav-menu"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              <Navbar.Brand href="/">
                <Logo src={logoUrl || "/Logo.png"} />
              </Navbar.Brand>
              <div className="d-none d-md-block mt-4 mb-4">
                <SearchBarDark
                  isDark={false}
                  isHovered={isHovered}
                  setHover={handleSearchSubmit}
                />
              </div>
              <UserProfileWishlistAndCartIcons />
            </Navbar>
            <div className="d-md-none">
              <SearchBarDark
                isDark={false}
                isHovered={isHovered}
                setHover={handleSearchSubmit}
              />
            </div>
          </Container>

          {/* Second Navbar - Navigation Menu */}
          <NavigationMenu>
            <Navbar expand="lg" className="w-100 p-0">
              <Navbar.Collapse
                id="nav-menu"
                className={`align-items-center justify-content-center ${
                  menuOpen ? "show" : ""
                }`}
              >
                <Nav className="gap-sm-4">
                  <Nav.Link href="/" className="text-center text-white">
                    Home
                  </Nav.Link>
                  <Nav.Link
                    href="/privacy-policy"
                    className="text-center text-white"
                  >
                    Privacy Policy
                  </Nav.Link>
                  <Nav.Link
                    href="/shipping-policy"
                    className="text-center text-white"
                  >
                    Shipping Policy
                  </Nav.Link>
                  <Nav.Link href="/about" className="text-center text-white">
                    About Us
                  </Nav.Link>
                  <Nav.Link href="/blog" className="text-center text-white">
                    Blog
                  </Nav.Link>
                  {/* <NavDropdown
                  title="Pages"
                  id="basic-nav-dropdown"
                  className="text-center"
                >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Page 1</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Page 2</NavDropdown.Item>
                </NavDropdown> */}
                  <Nav.Link href="/contact" className="text-center text-white">
                    Contact Us
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </NavigationMenu>
        </HeaderWrapper>
      </Row>
    </>
  );
};

export default Header;

const NavigationMenu = styled(Row)`
  background-color: ${(props) => props.theme.colors.primary};
`;

const HeaderWrapper = styled(Container)`
  background-color: ${(props) => props.theme.colors.primary};
`;
