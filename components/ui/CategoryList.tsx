import React from "react";
import styled from "styled-components";
import { useGetCategoryList } from "../../hooks/api/category/getCategoryList";
import DividerLine from "./common/Divider";
import { TCategory } from "../../lib/types";
import { ListingShimmer } from "./Shimmer/List-shimmer";
import { TbDatabase } from "react-icons/tb";
import Link from "next/link";

const CategoryHeading = styled.h4`
  background: ${(props) => props.theme.colors.primary};
  color: white;
  padding: 0.8rem;
  text-align: start;
  border-radius: 0.3rem 0.3rem 0rem 0rem;
  font-size: ${(props) => props.theme.typography.fontSize.large};
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 0.5rem;
  .categoryIcon {
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.3rem;
    font-size: 2rem;
    border-radius: 50%;
  }
`;
const CategoryItem = styled.li`
  list-style-type: none;
  font-weight: 500;
  font-size: 15px;
  padding: 0.3rem;
`;
const CategoryList = () => {
  const { data: categoryList, isLoading } = useGetCategoryList(true);
  if (isLoading) return <ListingShimmer />;

  return (
    <>
      <CategoryHeading>
        <TbDatabase className="categoryIcon" />
        All Categories
      </CategoryHeading>
      <div className="px-3">
        {categoryList?.slice(0, 7).map((item: TCategory) => (
          <CategoryItem key={item?.id}>
            <Link
              href={`/products-category/${item?.slug}`}
              className="ps-3 text-decoration-none text-black"
            >
              {item?.name}
            </Link>
            <DividerLine color="#DDDDDD" />
          </CategoryItem>
        ))}
      </div>
    </>
  );
};

export default CategoryList;
