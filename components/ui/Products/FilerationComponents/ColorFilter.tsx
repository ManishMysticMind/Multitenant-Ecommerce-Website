import styled from "styled-components";
import { useProductFilters } from "../../../../hooks/useProductFilters";

const ColorContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const OuterCircle = styled.div<{ selected: boolean }>`
  width: 35px;
  height: 32px;
  border: ${(props) =>
    props.selected && `2px solid ${props.theme.colors.primary}`};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${(props) => props.color};
  cursor: pointer;

  &:hover {
    border-color: #ff5733;
  }
`;

export default function ColorFilter({ colors }: any) {
  const { color: selectedColor, setFilters } = useProductFilters();
  return (
    <ColorContainer>
      {colors?.map((color: string, index: number) => (
        <OuterCircle key={index} selected={selectedColor === color}>
          <ColorOption
            color={color}
            onClick={() => setFilters({ color: color })}
          />
        </OuterCircle>
      ))}
    </ColorContainer>
  );
}
