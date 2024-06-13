"use client";

import { FunctionComponent, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationEventsProps = {};

const NavigationEvents: FunctionComponent<NavigationEventsProps> = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
  }, [pathname, searchParams]);

  return null;
};

export default NavigationEvents;
