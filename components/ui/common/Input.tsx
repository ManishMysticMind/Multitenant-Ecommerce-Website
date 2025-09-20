import { UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface InputProps {
  label: string;
  placeholder: string;
  varient?: "primary" | "secondary" | "";
  type: string;
  name?: string;
  register: UseFormRegister<any>;
  validate?: {};
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: any;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  defaultValue?: any;
}

const InputField = styled.input`
  padding: 1rem;
  border-radius: 0.4rem;
  border: 1px solid #79747e;
  width: 100%;
`;
const TextAreaField = styled.textarea`
  border: 1px solid #79747e;
  border-radius: 0.4rem;
  padding: 1rem;
  width: 100%;
  height: 10rem;
`;
const InputBtnComponent = styled.div<Partial<InputProps>>`
  width: ${(props) => {
    switch (props.varient) {
      case "primary":
        return "100%";
      case "secondary":
        return "48%";
      default:
        return "100%";
    }
  }};
  position: relative;
  margin-bottom: 0.1rem;
  margin-top: 1rem;
  margin-right: 0rem;
  margin-left: 0rem;
`;
const InputBtnLabel = styled.label`
  position: absolute;
  top: -1rem;
  left: 1rem;
  background-color: white;
  padding: 0.4rem;
`;
const Input: React.FC<InputProps> = ({
  varient,
  label,
  placeholder,
  type,
  name,
  validate,
  register,
  onChange,
  onKeyDown,
  maxLength,
  value,
  error,
  className,
  defaultValue,
}) => {
  return (
    <>
      <InputBtnComponent varient={varient}>
        <InputBtnLabel>{label}</InputBtnLabel>
        {type === "checkbox" ? (
          <InputField type="checkbox"></InputField>
        ) : type === "textarea" ? (
          <TextAreaField {...register(`${name}`, validate)}></TextAreaField>
        ) : onChange ? (
          <InputField
            placeholder={placeholder}
            type={type}
            {...register(`${name}`, validate)}
            onChange={onChange}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            value={value}
            className={className}
            defaultValue={defaultValue}
          ></InputField>
        ) : (
          <InputField
            placeholder={placeholder}
            type={type}
            {...register(`${name}`, validate)}
            onKeyDown={onKeyDown}
            maxLength={maxLength}
            value={value}
            className={className}
            defaultValue={defaultValue}
          ></InputField>
        )}
      </InputBtnComponent>
      <div className="error-message text-danger mb-1">
        {error && <p className="m-0 fs-6">{error}</p>}
      </div>
    </>
  );
};

export default Input;
