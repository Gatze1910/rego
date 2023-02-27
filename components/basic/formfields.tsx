import { InputHTMLAttributes } from "react"
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { LoginFields } from "../../pages/login";
import { RegisterFields } from "../../pages/users/register";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: string;
    flipicon?: boolean;
    label?: string;
    validation?: InputValidation;
}

interface InputValidation {
    field: keyof LoginFields | keyof RegisterFields;
    register: UseFormRegister<any>;
    error: FieldError;
    option?: RegisterOptions<any, any>;
}

export const Input = (props: InputProps) => {
    return (
        <div className="uk-margin-top">
            {props.label ? <label className="uk-form-label" htmlFor={props.id}>{props.label}</label> : null}
            <div className="uk-inline">
                <span className={"uk-form-icon" + (props.flipicon ? " uk-form-icon-flip" : "")} uk-icon={"icon: " + props.icon}></span>
                <input
                    className={"uk-input" + (props.validation.error ? " uk-form-danger" : "")}
                    {...props.validation.register(props.validation.field, props.validation.option)}
                    {...props}
                />
            </div>
            {props.validation.error && <p className='uk-text-small uk-text-danger uk-margin-remove'>{props.validation.error.message}</p>}
        </div >

    )
}

export const Submit = (props: InputProps) => {

    return (
        <input className={'uk-margin-medium-top uk-button' + (props.disabled ? "" : " uk-button-primary")} type="submit" {...props} />
    )
}