import Image from "next/image";
import classNames from "classnames";
import { ButtonHTMLAttributes, forwardRef, useMemo } from "react";

type ButtonProps = {
  loading?: boolean;
};

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ loading, className, ...props }, ref) => {
  const computedClassName = useMemo<string>(
    () =>
      classNames([
        `
        text-xs outline-none w-full p-3 rounded-md uppercase 
        transition-all ease-linear text-white bg-blue-400 hover:bg-blue-600
        `,
        className,
        {
          "bg-blue-200": loading,
        },
      ]),
    [loading, className]
  );

  return (
    <button ref={ref} {...props} className={computedClassName}>
      {loading ? (
        <Image
          width={16}
          height={16}
          alt="Loading"
          src="/images/loading.svg"
          className="animate-spin inline-block"
        />
      ) : (
        props.children
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
