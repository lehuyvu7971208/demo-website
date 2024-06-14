"use client";

// Utilities
import classNames from "classnames";
import { TextareaHTMLAttributes, forwardRef, useMemo } from "react";

export type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  inputClassName?: string;
  error?: Nullable<string>;
};

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ error, label, className, inputClassName, ...props }, ref) => {
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
        {label && <label className="text-xs text-gray-600">{label}</label>}

        <textarea ref={ref} {...props} className={computedInputClassName} />

        {error && <div className={"text-rose-600 text-[11px]"}>{error}</div>}
      </div>
    );
  }
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
