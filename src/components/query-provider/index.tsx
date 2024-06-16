"use client";

import { FunctionComponent, PropsWithChildren, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
