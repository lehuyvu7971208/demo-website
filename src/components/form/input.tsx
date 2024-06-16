import classNames from "classnames";
import { InputHTMLAttributes, forwardRef, useMemo } from "react";

export type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  inputClassName?: string;
  error?: Nullable<string>;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, className, inputClassName, ...props }, ref) => {
    const computedClassName = useMemo<string>(
      () => classNames([className, "flex flex-col gap-y-1"]),
      [className]
    );

    const computedInputClassName = useMemo<string>(
      () =>
        classNames([
          inputClassName,
          `
          p-3 text-xs w-full outline-none 
          rounded-md border border-gray-300 focus:border-blue-400 
          placeholder:border-gray-300 disabled:opacity-70
        `,
          {
            "text-rose-600 border-rose-600": !!error,
          },
        ]),
      [error, inputClassName]
    );

    return (
      <div className={computedClassName}>
        {label && (
          <label
            className="text-xs text-gray-600"
            data-testid={`input-${props.name}-label`}
          >
            {label}
          </label>
        )}

        <input ref={ref} className={computedInputClassName} {...props} />

        {error && (
          <div
            className={"text-rose-600 text-[11px]"}
            data-testid={`input-${props.name}-error`}
          >
            {error}
          </div>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
