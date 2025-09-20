import styled from "styled-components";
import Image from "next/image";
import { TProductDetail } from "../../../lib/types";
import ProductStockProgressBar from "./ProductStockProgressBar";
import Link from "next/link";
import { formatCurrency } from "../../../lib/utils/utils";

const StyledProduct = styled.div<Partial<TProductDetail>>`
  border: 1px solid #f3f3f3;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1rem;
  .productImage {
    aspect-ratio: 3/2;
    object-fit: contain;
    width: 100%;
  }
  .products {
    text-decoration: none;
    color: black;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  .discount-badge {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 2;
  }
`;

const Discount = styled.div`
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.1rem 0.7rem;
  border-radius: 5px;
  font-weight: 500;
  width: fit-content;
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
`;
const ProductPrice = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  gap: 0.5rem;
`;
const DiscountPrice = styled.div`
  font-weight: 600;
`;
const OriginalPrice = styled.div`
  color: #7e7e7e;
  text-decoration: line-through;
`;
const ProductName = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;
const ProductCode = styled.div`
  font-size: 1rem;
  font-weight: 600;
`;
const Review = styled.div``;
const ProductDetail = styled.div``;

type TProductDetailProps = {
  data: TProductDetail;
  showProgressBar?: boolean;
};

const ProductCard = ({
  data,
  showProgressBar = false,
}: TProductDetailProps) => {
  const {
    id,
    name,
    old_price,
    price,
    price_with_discount,
    photos,
    avg_rating,
    rating_detail,
    currency,
    slug,
    mark_as_new,
    discount_applied,
    discount_amount,
  } = data;

  const isShowProgressBar = showProgressBar;

  return (
    <StyledProduct key={id}>
      <Link href={`/product/${slug}`} className="products">
        <ImageWrapper>
          <span className="discount-badge">
            {discount_applied && discount_amount && (
              <Discount>
                {discount_amount.includes("%") && `${discount_amount} Off`}
              </Discount>
            )}
            {mark_as_new && <Discount>New</Discount>}
          </span>
          <div className="text-center">
            <Image
              src={photos[0]?.image_url ?? "/images/CardPlaceholder.png"}
              alt=""
              className="productImage"
              width={157}
              height={166}
            />
          </div>
        </ImageWrapper>
        <ProductDetail>
          <ProductName className="text-limit-one-line mt-2">{name}</ProductName>
          {/* <ProductCode>{code}</ProductCode> */}
        </ProductDetail>
        <ProductPrice>
          <DiscountPrice>
            {price_with_discount && Number(price_with_discount) > 0
              ? formatCurrency(Number(price_with_discount), currency)
              : formatCurrency(Number(price), currency)}
          </DiscountPrice>
          {price_with_discount && Number(price_with_discount) > 0 && (
            <OriginalPrice>
              {formatCurrency(Number(price), currency)}
            </OriginalPrice>
          )}
          {!price_with_discount && old_price && Number(old_price) > 0 && (
            <OriginalPrice>
              {formatCurrency(Number(old_price), currency)}
            </OriginalPrice>
          )}
        </ProductPrice>
        {/* <div className="d-flex gap-2 align-items-center">
          <Rating initialValue={Number(avg_rating)} size={14} readonly/>
          {Number(avg_rating) > 0 && <Review>{avg_rating}</Review>}
        </div> */}
        {isShowProgressBar && (
          <ProductStockProgressBar soldStock={30} totalStock={40} />
        )}
      </Link>
    </StyledProduct>
  );
};

export default ProductCard;
