import { MouseEventHandler, ReactNode } from "react";
import { JsxChild } from "typescript";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  disabled?: boolean;
}
export const ButtonPrimary = (props: ButtonProps) => {

  return (
    <>
      <button className={props.disabled ? "uk-button" : "uk-button uk-button-primary"} type={props.type} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    </>
  )
}

export const ButtonSecondary = (props: ButtonProps) => {

  return (
    <>
      <button className={props.disabled ? "uk-button" : "uk-button uk-button-secondary"} type={props.type} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
      </button>
    </>
  )
}
