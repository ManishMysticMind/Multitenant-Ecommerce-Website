import styled from "styled-components";
import { useProductFilters } from "../../../../hooks/useProductFilters";
import { useRouter } from "next/navigation";

const CategoryList = styled.div`
  max-height: 200px;
  overflow-y: auto;
`;

const CategoryItem = styled.div`
  font-size: 0.9rem;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    color: ${(props) => props?.theme?.colors.secondary};
    font-weight: bold;
  }

  &.selected {
    color: ${(props) => props?.theme?.colors.primary};
    font-weight: bold;
  }
`;

export default function CategoryFilter({ categories }: any) {
  const { category, setFilters } = useProductFilters();
  const router = useRouter();

  const handleCategorySelect = (category_name: string) => {
    setFilters({ category: category_name });
    router.push("/products?category=" + category_name);
  };
  return (
    <CategoryList>
      {categories?.map((item: any, index: number) => (
        <CategoryItem
          key={index}
          className={`${item?.name === category && "selected"}`}
          onClick={() => handleCategorySelect(item?.slug)}
        >
          {item?.name}
        </CategoryItem>
      ))}
    </CategoryList>
  );
}
