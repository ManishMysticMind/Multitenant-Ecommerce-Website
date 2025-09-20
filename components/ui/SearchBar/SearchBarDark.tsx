import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { IoIosArrowDown } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { styled } from "styled-components";
import { TCategory, TProductDetail } from "../../../lib/types";
import { useGetCategoryList } from "../../../hooks/api/category/getCategoryList";
import { useDebounce } from "../../../hooks/useDebounce";
import { useSearchProducts } from "../../../hooks/api/products/searchProduct";
// import Image from "next/image";
import { useRouter } from "next/navigation";
import { CurrencyType } from "../../../lib/constants";

const SearchBarDark = ({
  isDark = true,
  isHovered = false,
  setHover,
}: {
  isDark?: boolean;
  isHovered?: boolean;
  setHover?: (value?: boolean) => void;
}) => {
  const router = useRouter();
  const { data: categories } = useGetCategoryList(false);
  const [searchTerm, setSearchTerm] = useState("");
  const searchValue = useDebounce(searchTerm, 500);
  const [isFocused, setIsFocused] = useState(false);

  const { data: searchData } = useSearchProducts(searchValue);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (setHover) setHover(true);
  };

  const handleSearchProduct = (e: any) => {
    if (setHover) setHover();
    if (e.key === "Enter") {
      const searchValue = (e.target as HTMLInputElement).value;
      router.push(`/products/?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleSearchProductOnClick = (e: any) => {
    if (setHover) setHover();
    let searchValue = searchTerm;
    router.push(`/products/?search=${encodeURIComponent(searchValue)}`);
  };

  const renderSearchedProducts = () => {
    if (!searchValue || !searchData) return null;

    if (searchData.results.length > 0) {
      return (
        <Dropdown.Menu
          show
          className="position-absolute"
          style={{ width: "220px", minWidth: "220px" }}
        >
          {searchData.results.map((item: TProductDetail) => {
            const { photos } = item;
            return (
              <div
                key={item.id}
                className="d-flex overflow-hidden"
                onClick={() => {
                  setSearchTerm("");
                  router.push(`/product/${item?.slug}`);
                }}
              >
                {/* <Image
                  src={photos[0]?.image_url || "/images/CardPlaceholder.png"}
                  width={50}
                  height={50}
                  alt={item.name}
                  objectFit="cover"
                  className="m-1 d-flex align-items-center"
                /> */}
                <Dropdown.Item>
                  <ProductName className="text-limit-one-lin">
                    {item?.name}
                  </ProductName>
                  <DiscountPrice>
                    {CurrencyType}
                    {item?.price}
                  </DiscountPrice>
                </Dropdown.Item>
                <hr />
              </div>
            );
          })}
        </Dropdown.Menu>
      );
    } else if (isHovered) {
      return (
        <Dropdown.Menu
          show
          className="position-absolute"
          style={{ width: "220px", minWidth: "220px" }}
        >
          <Dropdown.Item disabled>No results found</Dropdown.Item>
        </Dropdown.Menu>
      );
    }
    return null;
  };
  return (
    <SearchBarMain>
      <BorderBlack
        isDark={isDark}
        className="d-flex justify-content-center "
        style={{ borderRadius: "2rem" }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
          }}
        >
          <Input
            name="search"
            value={searchTerm}
            placeholder="Search for products"
            onChange={(e) => handleSearch(e)}
            aria-label="Search for products"
            onKeyDown={(e) => handleSearchProduct(e)}
            onFocus={() => {
              if (setHover) setHover(true);
            }}
            className=""
            onBlur={() => {
              if (setHover) setHover(false);
            }}
            autoComplete="off"
          />
          {renderSearchedProducts()}
        </div>

        <DropdownButton
          id="dropdown-categories-button"
          title={
            <span>
              All Categories <IoIosArrowDown />
            </span>
          }
          aria-haspopup="true"
        >
          <div style={{ maxHeight: "20rem", overflowY: "scroll" }}>
            {categories?.map((item: TCategory) => (
              <div key={item.id}>
                <Dropdown.Item href={`/products-category/${item.slug}`}>
                  {item.name}
                </Dropdown.Item>
              </div>
            ))}
          </div>
        </DropdownButton>

        <SearchBtn
          type="submit"
          aria-label="Search"
          onClick={(e) => handleSearchProductOnClick(e)}
          style={{
            border: "1px solid #535353",
          }}
        >
          <CiSearch className="text-white"></CiSearch>
        </SearchBtn>
      </BorderBlack>
    </SearchBarMain>
  );
};

export default SearchBarDark;

const SearchBarMain = styled.div`
  display: flex;
  border-radius: 2rem;
  .searchForm {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  #dropdown-categories-button {
    background-color: white;
    font-size: 15px;
    border: none;
    border-radius: unset;
    padding: 0.75rem 2rem;
    color: #6b6b6b;
    @media screen and (max-width: 1200px) {
      padding: 1.1rem 0.5rem 1rem 0rem;
    }
    @media screen and (min-width: 800px) {
      padding: 1.2rem 5px;
    }
  }
  #dropdown-categories-button::after {
    display: none;
  }
  @media screen and (max-width: 800px) {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }

  .dropdown-item.active,
  .dropdown-item:active {
    color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.backgroundLight};
  }
`;

interface IBorderBlackProps {
  isDark?: boolean;
}

const BorderBlack = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isDark",
})<IBorderBlackProps>`
  border: ${(props) => (props.isDark ? "1px solid #535353" : "none")};
`;

const Input = styled.input`
  flex-grow: 1;
  font-size: 15px;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 3rem 0rem 0rem 3rem;

  @media screen and (max-width: 1200px) {
    padding: 0.8rem 0rem 0.8rem 1rem;
    width: 70%;
  }

  &:focus-visible {
    outline: none;
    border: none;
  }
`;

// color: ${(props) => props.theme.colors.primary};
// font-size: ${(props) => props.theme.typography.fontSize.large};
// background-color: ${(props) => props.theme.colors.textPrimary};

const SearchBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: "black";
  font-size: ${(props) => props.theme.typography.fontSize.large};
  background-color: #535353;
  padding: 0rem 1.4rem;
  border-radius: 0rem 3rem 3rem 0rem;
  border: none;
  @media screen and (max-width: 1200px) {
    padding: 1rem;
    font-size: 1.5rem;
  }
  @media screen and (max-width: 800px) {
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 0rem 2rem 2rem 0rem;
  }
`;

const ProductName = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
`;

const DiscountPrice = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
`;
