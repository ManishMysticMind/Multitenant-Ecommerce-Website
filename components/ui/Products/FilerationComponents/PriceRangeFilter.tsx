import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../common/Button";
import { Form } from "react-bootstrap";
import { useProductFilters } from "../../../../hooks/useProductFilters";

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  container-type: inline-size;

  @media (max-width: 1400px) {
    flex-direction: column;
  }
  @media (max-width: 575px) {
    flex-direction: row;
  }

  input {
    width: 90px;
    padding: 4px 8px;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

const RangeSlider = styled.div`
  position: relative;
  height: 10px;
  background: #ccc;
  border-radius: 5px;
  margin-top: 16px;
  cursor: pointer;

  input[type="range"] {
    position: absolute;
    width: 100%;
    height: 10px;
    margin: 0;
    appearance: none;
    -webkit-appearance: none;
    background: transparent;
    pointer-events: none;

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      pointer-events: all;
      background: blue; /* Desired color */
      width: 16px;
      height: 16px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 5;
    }

    &::-moz-range-thumb {
      pointer-events: all;
      background: blue;
      width: 16px;
      height: 16px;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      z-index: 5;
    }

    // &::-webkit-slider-thumb:hover {
    //   background: yellow;
    // }
    // &::-moz-range-thumb:hover {
    //   background: yellow;
    // }

    // &::-webkit-slider-thumb:active {
    //   background: green;
    // }
    // &::-moz-range-thumb:active {
    //   background: green;
    // }
  }

  .slider-track {
    position: absolute;
    height: 10px;
    background: rgb(249, 227, 34); /* Change track color here */
    border-radius: 5px;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 4px 8px;
  background: #333;
  color: #fff;
  font-size: 0.8rem;
  border-radius: 4px;
  white-space: nowrap;
  transform: translateX(-50%);
  top: -30px;
`;

export default function PriceRangeFilter({ min = 0, max = 1000 }: any) {
  const { setFilters } = useProductFilters();

  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  // this stores temporary values from user
  const [minInputVal, setMinInputVal] = useState(min.toString());
  const [maxInputVal, setMaxInputVal] = useState(max.toString());
  const minGap = 5;

  const handleMinChange = (e: any) => {
    setMinInputVal(e.target.value);
  };

  const handleMaxChange = (e: any) => {
    setMaxInputVal(e.target.value);
  };

  const handleMinBlur = () => {
    const value = parseInt(minInputVal, 10);
    if (!isNaN(value)) {
      if (value >= min && value < maxVal - minGap) {
        setMinVal(value);
      } else {
        // Reset to the valid value
        setMinInputVal(minVal.toString());
      }
    } else {
      // If input is not a valid number, reset to the previous valid value
      setMinInputVal(minVal.toString());
    }
  };

  const handleMaxBlur = () => {
    const value = parseInt(maxInputVal, 10);
    if (!isNaN(value)) {
      if (value <= max && value > minVal + minGap) {
        setMaxVal(value);
      } else {
        // Reset to the valid value
        setMaxInputVal(maxVal.toString());
      }
    } else {
      // If input is not a valid number, reset to the previous valid value
      setMaxInputVal(maxVal.toString());
    }
  };

  const handleMinSlider = (e: any) => {
    const value = Math.max(
      min,
      Math.min(maxVal - minGap, parseInt(e.target.value, 10)),
    );
    setMinVal(value);
    setMinInputVal(value.toString());
  };

  const handleMaxSlider = (e: any) => {
    const value = Math.min(
      max,
      Math.max(minVal + minGap, parseInt(e.target.value, 10)),
    );
    setMaxVal(value);
    setMaxInputVal(value.toString());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFilters({
      min_price: minVal,
      max_price: maxVal,
    });
  };

  useEffect(() => {
    setMinVal(min);
    setMaxVal(max);
    setMinInputVal(min.toString());
    setMaxInputVal(max.toString());
  }, [min, max]);

  // useEffect to update minVal and maxVal when filters change from outside
  return (
    <Form onSubmit={handleSubmit}>
      <PriceContainer>
        <InputBox>
          <input
            type="text"
            value={minInputVal}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            min={min}
            max={maxVal - minGap}
            name="minVal"
          />
          <input
            type="text"
            value={maxInputVal}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            min={minVal + minGap}
            max={max}
            name="maxVal"
          />
        </InputBox>
        <RangeSlider>
          <div
            className="slider-track"
            style={{
              left: `${((minVal - min) / (max - min)) * 100}%`,
              right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
            }}
          ></div>
          <input
            type="range"
            name="min"
            min={min}
            max={max}
            value={minVal}
            onChange={handleMinSlider}
            className="min-range"
            style={{ zIndex: 3 }}
          />
          <input
            type="range"
            name="max"
            min={min}
            max={max}
            value={maxVal}
            onChange={handleMaxSlider}
            className="max-range"
            style={{ zIndex: 2 }}
          />
          {/* <Tooltip
          style={{
            left: `${((minVal - min) / (max - min)) * 100}%`,
          }}
        >
          {minVal}
        </Tooltip>
        <Tooltip
          style={{
            left: `${((maxVal - min) / (max - min)) * 100}%`,
          }}
        >
          {maxVal}
        </Tooltip> */}
        </RangeSlider>
        <Button type="submit" label="Apply" size="sm" className="mt-2" />
      </PriceContainer>
    </Form>
  );
}
