import Link from "next/link";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { useGetCategoryList } from "../../../hooks/api/category/getCategoryList";
import SectionTitle from "../common/SectionTitle";
// import Image from "next/image";

const categoriesData = [
  {
    id: 1,
    name: "Mobiles & Accessories",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/mobile-placeholder.jpg",
  },
  {
    id: 2,
    name: "Rice Products",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/rice-placeholder.jpg",
  },
  {
    id: 3,
    name: "Laptops & Computers",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/laptop-placeholder.jpg",
  },
  {
    id: 4,
    name: "Camera",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/camera-placeholder.jpg",
  },
  {
    id: 5,
    name: "TV & Audio",
    discount: "Upto 70% Off",
    imageUrl: "/images/categories/tv-placeholder.jpg",
  },
  {
    id: 6,
    name: "Home Appliances",
    discount: "Upto 60% Off",
    imageUrl: "https://placehold.co/150x150",
  },
  {
    id: 7,
    name: "Fashion",
    discount: "Upto 80% Off",
    imageUrl: "https://placehold.co/150x150",
  },
];

const specification = {
  row: 1,
  column: 6,
};

interface CategoryCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image: string;
}

interface CategoriesContainerProps {
  $lgColumns: number; // Use $ prefix to mark as transient prop
}

const CategoryType2 = () => {
  const { data: categoryList } = useGetCategoryList(true);

  const itemsCount = specification.column * specification.row;

  return (
    <Container className="">
      <SectionTitle label="Categories" size="md" />

      {/* Pass the prop with $ prefix */}
      <CategoriesContainer $lgColumns={specification.column}>
        {categoryList
          ?.slice(0, itemsCount)
          ?.map((category: any, index: any) => (
            <Link
              key={index}
              href={`/products?category=${category?.slug}`}
              className="text-decoration-none"
            >
              <CategoryCard key={category.id} image={category.image}>
                <CategoryName>{category.name}</CategoryName>
                <DiscountText>{category.discount}</DiscountText>
              </CategoryCard>
            </Link>
          ))}
      </CategoriesContainer>
    </Container>
  );
};
export default CategoryType2;

const CategoriesContainer = styled.div<CategoriesContainerProps>`
  display: flex;
  flex-flow: wrap;
  gap: 1rem;
  margin-bottom: 1rem;

  > * {
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: calc((100% - (2 - 1) * 1rem) / 2);
    max-width: calc((100% - (2 - 1) * 1rem) / 2);

    /* md: show half the lg columns */
    @media (min-width: 768px) {
      flex-basis: calc(
        (100% - (${(props) => Math.ceil(props.$lgColumns / 2)} - 1) * 1rem) /
          ${(props) => Math.ceil(props.$lgColumns / 2)}
      );
      max-width: calc(
        (100% - (${(props) => Math.ceil(props.$lgColumns / 2)} - 1) * 1rem) /
          ${(props) => Math.ceil(props.$lgColumns / 2)}
      );
    }

    /* lg: show whatever the columns is given */
    @media (min-width: 992px) {
      flex-basis: calc(
        (100% - (${(props) => props.$lgColumns} - 1) * 1rem) /
          ${(props) => props.$lgColumns}
      );
      max-width: calc(
        (100% - (${(props) => props.$lgColumns} - 1) * 1rem) /
          ${(props) => props.$lgColumns}
      );
    }
  }
`;

const CategoryCard = styled.div<CategoryCardProps>`
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.55)),
    url(${(props) => props.image || "/images/CardPlaceholder.png"});
  background-size: cover;
  background-position: center;
  border-radius: 70px;
  height: 7rem;
  padding: 1rem 1.75rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  color: white;
  text-align: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`;

const CategoryName = styled.h5`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5); // Text shadow for readability
`;

const DiscountText = styled.p`
  font-size: 0.85rem;
  margin-bottom: 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.4); // Text shadow for readability
`;
