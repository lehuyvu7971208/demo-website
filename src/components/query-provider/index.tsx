"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent, PropsWithChildren, useEffect, useRef } from "react";

type QueryProviderProps = PropsWithChildren & {};

const QueryProvider: FunctionComponent<QueryProviderProps> = ({ children }) => {
  const queryClient = useRef<QueryClient>(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={queryClient.current}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider;
