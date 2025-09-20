import Link from "next/link";
import styled from "styled-components";

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
`;

const Text = styled.span`
  font-weight: 400;
  font-size: 13px;
`;

type TopBarItemProps = {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  redirectPath?: string;
  target?: string; // Add target prop to control link behavior
};

const TopBarItem: React.FC<TopBarItemProps> = ({
  icon,
  text,
  onClick = () => {},
  redirectPath,
  target = "_self", // Default to _self if no target is provided
  ...rest
}) => {
  const handleClick = () => {
    if (redirectPath) {
      window.open(redirectPath, target); // Open link in specified target
    } else {
      onClick();
    }
  };

  if (redirectPath) {
    return (
      <ItemWrapper>
        <Link className="text-decoration-none d-flex" href={redirectPath} target={target} {...rest}>
          <Icon>{icon}</Icon>
          <Text>{text}</Text>
        </Link>
      </ItemWrapper>
    );
  }

  // Otherwise, render as a normal clickable div
  return (
    <ItemWrapper onClick={handleClick} {...rest}>
      <Icon>{icon}</Icon>
      <Text>{text}</Text>
    </ItemWrapper>
  );
};

export default TopBarItem;
