import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';
import { TStockProgressBarProps } from '../../../lib/types';

const ProgressBarContainer = styled.div`
  padding: 0.8rem 0rem;
  border-top: 1px solid #f3f3f3;
  border-radius: 4px;
  background-color: #fff;
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 12px;
`;

const StatusText = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin: 0.5rem 0 0;
  color: #242424;
`;

const ProductStockProgressBar: React.FC<TStockProgressBarProps> = ({ soldStock, totalStock ,variant="warning"}) => {
  const progressPercentage = (soldStock / totalStock) * 100;

  return (
    <ProgressBarContainer>
      <StyledProgressBar 
        variant={variant} 
        now={progressPercentage} 
        max={100} 
      />
      <StatusText>
        Sold: {soldStock} / {totalStock}
      </StatusText>
    </ProgressBarContainer>
  );
};

export default ProductStockProgressBar;
