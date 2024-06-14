"use client";

import classNames from "classnames";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes, forwardRef, useMemo } from "react";

type AnchorProps = LinkProps &
  HTMLAttributes<HTMLAnchorElement> & {
    activeClassName?: string;
  };

const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ className, activeClassName, ...props }, ref) => {
    const pathname = usePathname();

    const isActive = useMemo<boolean>(
      () => pathname === props.href,
      [pathname, props.href]
    );

    const computedClassName = classNames([
      `transition-all text-xs ease-linear text-gray-600 hover:text-blue-400`,
      className,
      {
        [activeClassName ?? ""]: isActive,
      },
    ]);

    return <Link ref={ref} {...props} className={computedClassName} />;
  }
);

Anchor.displayName = "Anchor";

export default Anchor;
1;
