import React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  $isActiveStyle?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledButton = styled.button<ButtonProps>`
  background: transparent;
  border: 2px solid var(--color-blue);
  width: 100%;
  border-radius: 10px;
  padding: 14px;
  color: var(--color-white);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-white);
    color: var(--color-blue);
    border-color: var(--color-white);
  }

  ${(props) =>
    props.size === "sm" &&
    css`
      font-size: 14px;
      padding: 8px;
    `}

  ${(props) =>
    props.size === "lg" &&
    css`
      font-size: 18px;
      padding: 18px;
    `}

  ${(props) =>
    props.$isActiveStyle &&
    css`
      background-color: var(--color-white);
      border-color: var(--color-white);
      color: var(--color-blue);
    `}
`;

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  $isActiveStyle = false,
  onClick,
}) => {
  return (
    <StyledButton size={size} $isActiveStyle={$isActiveStyle} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
