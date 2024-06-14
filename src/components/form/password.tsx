"use client";

import classNames from "classnames";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import { InputHTMLAttributes, forwardRef, useMemo, useState } from "react";

export type FormPasswordProps = {
  label?: string;
  error?: string;
};

const FormPassword = forwardRef<
  HTMLInputElement,
  FormPasswordProps & InputHTMLAttributes<HTMLInputElement>
>(({ label, error, ...props }, ref) => {
  const [show, setShow] = useState<boolean>(false);

  const type = useMemo<"text" | "password">(() => {
    return show ? "text" : "password";
  }, [show]);

  const className = useMemo<string>(
    () =>
      classNames([
        `
          p-3 text-xs w-full pr-10
          outline-none rounded-md border border-gray-300
           focus:border-blue-400 placeholder:border-gray-300 disabled:opacity-70
        `,
        {
          "text-rose-600 border-rose-600": !!error,
        },
      ]),
    [error]
  );

  const toggle = () => setShow(!show);

  return (
    <div className="flex flex-col gap-y-1 relative">
      {label && <label className="text-xs text-gray-600">{label}</label>}

      <div className={"w-full relative"}>
        <input ref={ref} {...props} type={type} className={className} />

        <div
          onClick={toggle}
          className={`
            w-5 absolute bottom-2.5 
            right-2.5 text-gray-400 
            cursor-pointer hover:text-blue-400
          `}
        >
          {show ? <EyeIcon /> : <EyeSlashIcon />}
        </div>
      </div>

      {error && <div className={"text-rose-600 text-[11px]"}>{error}</div>}
    </div>
  );
});

FormPassword.displayName = "FormPassword";

export default FormPassword;
