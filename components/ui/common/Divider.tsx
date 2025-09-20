import React from 'react';
import styled from 'styled-components';

// Styled component with props
const Divider = styled.hr<{ height?: string; color?: string; margin?: string }>`
  height: ${({ height }) => height || '2px'};
  background-color: ${({ color }) => color || '#EFEFEF'};
  border: none;
  margin: ${({ margin }) => margin || '0.3rem 0'};
`;

// Component that takes props
const DividerLine = ({ height, color, margin }: { height?: string; color?: string; margin?: string }) => {
  return <Divider height={height} color={color} margin={margin} />;
};

export default DividerLine;
