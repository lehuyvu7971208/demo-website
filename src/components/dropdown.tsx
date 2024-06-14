"use client";

import {
  useRef,
  useMemo,
  useState,
  ReactNode,
  useEffect,
  HTMLAttributes,
  FunctionComponent,
} from "react";
import classNames from "classnames";

type SlotProps = {
  toggle: () => void;
};

type DropdownProps = {
  menu: (options: SlotProps) => ReactNode;
  toggle: (options: SlotProps) => ReactNode;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

const Dropdown: FunctionComponent<DropdownProps> = ({
  menu,
  toggle,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const ESC_KEY_CODE = 27;
      if (ESC_KEY_CODE !== event.keyCode) return;

      return setShow(false);
    };

    const handleClickOutside = (event: any) => {
      if (event.target && ref.current?.contains(event.target)) return;

      return setShow(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const computedClassName = useMemo<string>(() => {
    return classNames(["inline-block relative", className]);
  }, [className]);

  return (
    <div ref={ref} {...props} className={computedClassName}>
      {toggle({
        toggle: () => setShow(!show),
      })}

      {show && (
        <div
          className="absolute z-10 right-0"
          style={{ top: "calc(100% + 0.5rem)" }}
        >
          {menu({ toggle: () => setShow(!show) })}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
