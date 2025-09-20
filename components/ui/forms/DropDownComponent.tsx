"use client";
import * as React from "react";
import { Form } from "react-bootstrap";
import { UseFormRegister, FieldValues, Path } from "react-hook-form";
import styled from "styled-components";

interface Option<T = string | number> {
  name: string;
  id: T;
}

interface IDropDown<T extends FieldValues, K extends keyof T> {
  label?: string;
  name: Path<T>;
  options: Option<T[K]>[];
  placeholder?: string;
  register: UseFormRegister<T>;
  error?: string;
  selectedValues?: T[K] | T[K][];
  isMultiple?: boolean;
  validate?: any;
  [key: string]: any;
}

const DropDownInput = <T extends FieldValues, K extends keyof T>({
  label,
  options,
  register,
  validate,
  name,
  error,
  placeholder,
  selectedValues,
  isMultiple = false,
  ...args
}: IDropDown<T, K>) => {
  return (
    <DropdownWrapper>
      <div style={{ position: "relative" }}>
        {label && <StyledLabel>{label}</StyledLabel>}
      </div>
      <DropdownContainer>
        <StyledSelect
          {...register(name, { validate })}
          multiple={isMultiple}
          defaultValue={selectedValues}
          {...args}
        >
          <option value="">{placeholder || `Select ${name}`}</option>
          {options?.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </StyledSelect>
      </DropdownContainer>
      <div className="error-message text-danger">
        {error && <p className="m-0 fs-6">{error}</p>}
      </div>
    </DropdownWrapper>
  );
};

export default DropDownInput;

const DropdownWrapper = styled.div`
  margin: 1rem 0;
  position: relative;
`;

const StyledLabel = styled(Form.Label)`
  position: absolute;
  left: 1rem;
  top: -1rem;
  background-color: white;
  padding: 0.4rem;
`;

const DropdownContainer = styled.div`
  border: 1px solid #79747e;
  border-radius: 5px;
  padding: 10px;
  background: #fff;
  display: flex;
  align-items: center;
`;

const StyledSelect = styled(Form.Select)`
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 16px;
  color: #495057;
  appearance: none; /* Removes default arrow */

  &:focus {
    box-shadow: none;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
