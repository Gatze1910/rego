import { MouseEventHandler, ReactNode } from 'react'
import { JsxChild } from 'typescript'
import Link from 'next/link'

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  onClick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  disabled?: boolean
}

interface LinkProps {
  href: string
  target?: string
  children: ReactNode
}

export const ButtonPrimary = (props: ButtonProps) => {
  return (
    <>
      <button
        className={
          'uk-margin-small-top uk-button' +
          (props.disabled ? '' : ' uk-button-primary')
        }
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </>
  )
}

export const ButtonSecondary = (props: ButtonProps) => {
  return (
    <>
      <button
        className={
          'uk-margin-small-top uk-button' +
          (props.disabled ? '' : ' uk-button-secondary')
        }
        type={props.type}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </>
  )
}

export const ButtonLink = (props: LinkProps) => {
  return (
    <>
      <Link
        className="uk-margin-small-top uk-button uk-button-primary"
        href={props.href}
      >
        {props.children}
      </Link>
    </>
  )
}
