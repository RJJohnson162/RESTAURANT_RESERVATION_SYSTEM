import styled, { css } from "styled-components";
import { primary, white } from "@/lib/colors";

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${white};
      color: #fff;
      transition: 0.5s;
      &:hover {
        background-color: #fff;
        color: #f7418f;
        border: 1px solid #f7418f;
        transform: scale(1.02);
      }
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
      transition: 0.5s;
      &:hover {
        background-color: #fff;
        color: #01260d;
        border: 1px solid #fff;
        transform: scale(1.05);
      }
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, block, ...rest }) {
  return (
    <StyledButton block={block ? 1 : 0} {...rest}>
      {children}
    </StyledButton>
  );
}
