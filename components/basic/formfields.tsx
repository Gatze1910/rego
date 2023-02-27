import { InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form'
import { LoginFields } from '../../pages/login'
import { ShopFields } from '../../pages/shops/create'
import { RegisterFields } from '../../pages/users/register'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string
  flipicon?: boolean
  label?: string
  validation: InputValidation
}

interface InputValidation {
  field: keyof ShopFields
  register: UseFormRegister<any>
  error: FieldError
  option?: RegisterOptions<any, any>
}

export const Input = (props: InputProps) => {
  return (
    <div className="uk-margin-top">
      {props.label ? (
        <label className="uk-form-label" htmlFor={props.id}>
          {props.label}
        </label>
      ) : null}
      <div className="uk-inline uk-width-1-1">
        <span
          className={
            'uk-form-icon' + (props.flipicon ? ' uk-form-icon-flip' : '')
          }
          uk-icon={'icon: ' + props.icon}
        ></span>
        <input
          {...props}
          className={
            'uk-input' + (props.validation.error ? ' uk-form-danger' : '')
          }
          {...props.validation.register(
            props.validation.field,
            props.validation.option,
          )}
        />
      </div>
      {props.validation.error && (
        <p className="uk-text-small uk-text-danger uk-margin-remove">
          {props.validation.error.message}
        </p>
      )}
    </div>
  )
}

export const FileInput = (props: Omit<InputProps, 'validation'>) => {
  return (
    <div className="uk-margin-top">
      {props.label ? (
        <label className="uk-form-label" htmlFor={props.id}>
          {props.label}
        </label>
      ) : null}
      <div uk-form-custom="target: true">
        <div className="uk-inline">
          <span
            className={
              'uk-form-icon' + (props.flipicon ? ' uk-form-icon-flip' : '')
            }
            uk-icon={'icon: ' + props.icon}
          ></span>
          <input
            type="file"
            accept={props.accept}
            aria-label="Custom controls"
            onChange={props.onChange}
          />
          <input
            className="uk-input"
            type="text"
            placeholder={props.placeholder}
            aria-label="Custom controls"
          />
        </div>
      </div>
    </div>
  )
}

export const Select = (props: SelectHTMLAttributes<HTMLSelectElement>) => {
  return (
    <select className="uk-select" {...props}>
      {props.children}
    </select>
  )
}

export const Search = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input type="text" {...props} className={'uk-input ' + props.className} />
  )
}

export const Submit = (props: Omit<InputProps, 'validation'>) => {
  return (
    <input
      {...props}
      className={
        'uk-margin-medium-top uk-button' +
        (props.disabled ? '' : ' uk-button-primary')
      }
      type="submit"
    />
  )
}
