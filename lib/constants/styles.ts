import Link from "next/link";
import { styled } from "styled-components";

export const GenericLink = styled.a`
  color: grey;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const GenericNextJSLink = styled(Link)`
  color: grey;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
