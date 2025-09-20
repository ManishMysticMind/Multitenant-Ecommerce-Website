"use client";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import SizeFilter from "./SizeFilter";
import HighlightFilter from "./HighlightFilter";
import PriceRangeFilter from "./PriceRangeFilter";
import SidebarSection from "./SidebarSection";
import { useProductFilters } from "../../../../hooks/useProductFilters";
import { useGetCategoryList } from "../../../../hooks/api/category/getCategoryList";

export default function Sidebar() {
  const { data: categoryList, isLoading } = useGetCategoryList();
  const {
    search,
    category,
    color,
    sizes,
    highlight,
    min_price,
    max_price,
    setFilters,
  } = useProductFilters();

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({
      [name]: name.includes("Price") ? parseInt(value) : value,
    });
  };
  return (
    <div className="d-flex flex-column gap-4">
      <SidebarSection title="All Categories">
        <CategoryFilter categories={categoryList} />
      </SidebarSection>
      {/* <SidebarSection title="Color">
        <ColorFilter
          colors={["red", "blue", "green", "yellow", "black"]}
          selectedColor="red"
          onSelectColor={handleFilterChange}
        />
      </SidebarSection> */}
      {/* <SidebarSection title="Sizes">
        <SizeFilter sizes={["XS", "S", "M", "L", "XL", "XXL"]} />
      </SidebarSection> */}
      {/* <SidebarSection title="Highlight">
        <HighlightFilter
          highlights={[
            "Promotions",
            "Deals Of The Month",
            "New Arrivals",
            "On Discounts",
            "Free Shipping",
          ]}
          selected={[]}
          onToggle={handleFilterChange}
        />
      </SidebarSection> */}
      <SidebarSection title="Price">
        <PriceRangeFilter min={10} max={1_00_000} />
      </SidebarSection>
    </div>
  );
}
