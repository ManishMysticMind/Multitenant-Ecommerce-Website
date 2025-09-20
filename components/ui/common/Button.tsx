import React, { ReactNode } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  label?: string | ReactNode;
  varient?: "primary" | "secondary" | "primary-outline" | "secondary-outline";
  size?: "xs" | "sm" | "md" | "lg";
  borderradius?: string;
  width?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: string;
  className?: string;
  icon?: any;
  disabled?: boolean;
}

// color: ${(props) =>
//     props.varient === "primary"
//       ? props.theme.colors.textPrimary
//       : props.varient === "secondary"
//         ? props.theme.colors.textSecondary
//         : "transparent"};

const StyledButton = styled("button").withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) =>
    !["varient", "size", "borderradius", "width"].includes(prop),
})<ButtonProps>`
  background-color: ${(props) => {
    switch (props.varient) {
      case "primary":
        return props?.theme?.colors?.primary;
      case "secondary":
        return props?.theme?.colors?.secondary;
      case "primary-outline":
        return "transparent";
      case "secondary-outline":
        return "transparent";
      default:
        return "transparent";
    }
  }};
  color: ${(props) => {
    switch (props.varient) {
      case "primary":
        return "white";
      case "secondary":
        return "white";
      case "primary-outline":
        return props?.theme?.colors?.primary;
      case "secondary-outline":
        return props?.theme?.colors?.secondary;
      default:
        return "black";
    }
  }};
  border-radius: ${(props) =>
    props.borderradius || props.theme.borderRadius.medium};
  width: ${(props) => props.width || "auto"};
  border: ${(props) => {
    switch (props.varient) {
      case "primary":
        return `1px solid ${props.theme.colors.primary}`;
      case "primary-outline":
        return `1px solid ${props.theme.colors.primary}`;
      case "secondary":
        return `1px solid ${props.theme.colors.secondary}`;
      case "secondary-outline":
        return `1px solid ${props.theme.colors.secondary}`;
      default:
        return "transparent";
    }
  }};
  ${(props) => {
    const sizeStyles = {
      xs: {
        padding: "2px 4px",
        fontSize: "12px",
      },
      sm: {
        padding: "4px 8px",
        fontSize: "14px",
      },
      md: {
        padding: "8px 16px",
        fontSize: "16px",
      },
      lg: {
        padding: "12px 24px",
        fontSize: "18px",
      },
      default: {
        padding: "8px 16px",
        fontSize: "16px",
      },
    };

    const { padding, fontSize } =
      sizeStyles[props.size || "md"] || sizeStyles.default;

    return css`
      padding: ${padding};
      font-size: ${fontSize};
    `;
  }}

  transition: all 0.3s ease;

  &:hover {
    ${(props) => {
      switch (props.varient) {
        case "primary":
        case "secondary":
          return css`
            opacity: 0.9;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          `;
        case "primary-outline":
          return css`
            background-color: ${props.theme.colors.primary};
            color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          `;
        case "secondary-outline":
          return css`
            background-color: ${props.theme.colors.secondary};
            color: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          `;
        default:
          return css`
            opacity: 0.9;
          `;
      }
    }}
  }
`;

// Button Component
/**
 * Button component with customizable styles and behavior.
 *
 * @param {ButtonProps} props - Properties to configure the button.
 * @param {string} [props.label] - The text label displayed on the button.
 * @param {"primary" | "secondary"} [props.varient="primary"] - The variant style of the button.
 * @param {"sm" | "md" | "lg"} [props.size="md"] - The size of the button.
 * @param {string} [props.borderradius] - The border radius of the button.
 * @param {string} [props.width="100px"] - The width of the button.
 * @param {() => void} [props.onClick] - Click event handler for the button.
 */
const Button: React.FC<ButtonProps> = ({
  varient = "primary",
  label,
  size = "md",
  borderradius,
  type,
  icon,
  onClick,
  disabled,
  ...className
}: ButtonProps) => {
  return (
    <StyledButton
      type={type}
      varient={varient}
      borderradius={borderradius}
      size={size}
      onClick={onClick}
      disabled={disabled}
      {...className}
    >
      {icon && icon}
      {label}
    </StyledButton>
  );
};

export default Button;
