import Link from "next/link";
import React from "react";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { styled } from "styled-components";
import { useGetCartCount } from "../../../hooks/api/cart/GetCartItemCount";

const CartLinkIconDark = () => {
  const { data } = useGetCartCount();
  return (
    <ShoppingCartIconDiv>
      <Link href={"/cart"}>
        <ShoppingCart>
          <LiaShoppingBagSolid className="SearchIcons" />
          {data?.total !== 0 && <Badge className="badge">{data?.total}</Badge>}
        </ShoppingCart>
      </Link>
    </ShoppingCartIconDiv>
  );
};

export default CartLinkIconDark;

const ShoppingCartIconDiv = styled.div`
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
`;

const ShoppingCart = styled.div`
  position: relative;
  .badge {
    border-radius: 50%;
    padding: 0.4rem 0.55rem;
    position: absolute;
    top: -0.7rem;
    right: -0.7rem;
  }
`;

const Badge = styled.div`
  background: ${(props) => props.theme.colors.primary};
  border: 1px solid black;
`;
