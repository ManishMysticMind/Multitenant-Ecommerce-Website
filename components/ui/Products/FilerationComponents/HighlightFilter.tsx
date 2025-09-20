import styled from "styled-components";
import { useProductFilters } from "../../../../hooks/useProductFilters";

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const CheckboxOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  cursor:pointer;
`;

export default function HighlightFilter({ highlights }: any) {
  const { highlight: selectedHighlights, setFilters } = useProductFilters();

  const handleProductHighlight = (highlight: string) => {
    const highlightsArray = selectedHighlights?.split(",") || [];
    if (highlightsArray.includes(highlight)) {
      // Remove highlight if it is already selected
      const updatedHighlights = highlightsArray.filter(
        (item) => item !== highlight
      );
      setFilters({ highlight: updatedHighlights.join(",") });
    } else {
      // Add highlight if it is not selected
      const updatedHighlights = [...highlightsArray, highlight];
      setFilters({ highlight: updatedHighlights.join(",") });
    }
  };

  return (
    <CheckboxContainer>
      {highlights.map((highlight: string, index: number) => (
        <CheckboxOption key={index}>
          <input
            type="checkbox"
            checked={selectedHighlights?.split(",").includes(highlight)}
            onChange={() => handleProductHighlight(highlight)}
          />
          {highlight}
        </CheckboxOption>
      ))}
    </CheckboxContainer>
  );
}
