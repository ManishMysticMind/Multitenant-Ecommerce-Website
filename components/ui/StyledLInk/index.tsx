import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import styled from "styled-components";

type TProps = {
  href: string;
  className?: string; 
  text: string;
};

const StyledLink = ({ href, className = "", text }: TProps) => {
  return (
    <StyledLinkComponent href={href} className={`d-flex align-items-center gap-1 text-decoration-none ${className}`}>
      {text} <FiArrowRight />
    </StyledLinkComponent>
  );
};

export default StyledLink;

const StyledLinkComponent = styled(Link)`
  color: ${(props) => props.theme?.colors?.primary || "#007bff"};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 4px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
