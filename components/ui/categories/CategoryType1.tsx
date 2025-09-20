import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import SectionTitle from "../common/SectionTitle";
import { useGetCategoryList } from "../../../hooks/api/category/getCategoryList";
import Link from "next/link";

const specification = {
  row: 1,
  column: 7,
};

// Define styled components for the flex layout
const CategoriesFlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px; /* Corresponds to g-4 spacing */
`;

interface CategoryFlexItemProps {
  $smColumns: number;
  $mdColumns: number;
  $lgColumns: number;
}

const CategoryFlexItem = styled.div<CategoryFlexItemProps>`
  text-align: center;
  box-sizing: border-box;
  flex: 0 0 auto;

  width: calc(
    (100% - (${(props) => props.$smColumns} - 1) * 24px) /
      ${(props) => props.$smColumns}
  );

  @media (min-width: 768px) {
    width: calc(
      (100% - (${(props) => props.$mdColumns} - 1) * 24px) /
        ${(props) => props.$mdColumns}
    );
  }

  @media (min-width: 992px) {
    width: calc(
      (100% - (${(props) => props.$lgColumns} - 1) * 24px) /
        ${(props) => props.$lgColumns}
    );
  }
`;

const CategoryType1 = () => {
  const { data: categoryList } = useGetCategoryList(true);

  const maxItems = specification.column * specification.row;
  // const categoriesToShow = categories.slice(0, maxItems);

  const lgColumns = specification.column;
  const mdColumns = Math.ceil(specification.column / 2);
  const smColumns = 2; // Default for small screens

  return (
    <Container className="mb-4">
      <SectionTitle label="Categories" size="md" />
      <CategoriesFlexContainer>
        {categoryList?.slice(0,maxItems)?.map((category: any, index: any) => {
          return (
            <CategoryFlexItem
              key={index}
              $smColumns={smColumns}
              $mdColumns={mdColumns}
              $lgColumns={lgColumns}
            >
              <Link
                href={`/products?category=${category?.slug}`}
                className="ps-3 text-decoration-none text-black"
              >
                <CategoryImage src={category?.image || "/images/CardPlaceholder.png"} alt={category.name} />
                <CategoryTitle>{category.name}</CategoryTitle>
                {/* <CategorySubtitle>{category.description}</CategorySubtitle> */}
              </Link>
            </CategoryFlexItem>
          );
        })}
      </CategoriesFlexContainer>
    </Container>
  );
};

export default CategoryType1;

const CategoryWrapper = styled.div``;

// const CategoryImage = styled(Image)`
const CategoryImage = styled.img`
  border-radius: 50%;
  margin-bottom: 10px;
  object-fit: cover;
  width: 80px;
  height: 80px;
`;

const CategoryTitle = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 5px;
`;

const CategorySubtitle = styled.div`
  font-size: 0.85rem;
  color: gray;
`;
