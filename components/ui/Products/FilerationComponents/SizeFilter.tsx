import styled from "styled-components";
import { useProductFilters } from "../../../../hooks/useProductFilters";

const SizeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const HiddenRadio = styled.input`
  display: none; /* Hide the default radio button */
`;

const SizeOptionLabel = styled.label<{ selected: boolean }>`
  padding: 6px 12px;
  border: 1px solid ${(props) => (props.selected ? props?.theme.colors.primary : "#ccc")};
  border-radius: 4px;
  cursor: pointer;
  background: ${(props) => (props.selected ? props?.theme.colors.primary : "white")};
  color: ${(props) => (props.selected ? "white" : "black")};
  text-align: center;

  &:hover {
    border-color: ${(props) => (props.theme.colors.primary)};
  }
`;

export default function SizeFilter({
  sizes
}: {
  sizes: string[];
}) {
const {sizes:selectedSize,setFilters}=  useProductFilters();
  return (
    <SizeContainer>
      {sizes.map((size, index) => (
        <div key={index}>
          {/* Hidden Radio Input */}
          <HiddenRadio
            type="radio"
            id={`size-${size}`}
            name="size"
            value={size}
            checked={selectedSize === size}
            onChange={() => setFilters({sizes:size})}
          />
          {/* Styled Label */}
          <SizeOptionLabel
            htmlFor={`size-${size}`}
            selected={selectedSize === size}
          >
            {size}
          </SizeOptionLabel>
        </div>
      ))}
    </SizeContainer>
  );
}
