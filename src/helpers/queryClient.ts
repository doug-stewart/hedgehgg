import {
  defaultShouldDehydrateQuery,
  environmentManager,
  MutationCache,
  QueryClient,
} from "@tanstack/react-query";

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) || query.state.status === "pending",
      },
    },
    mutationCache: new MutationCache({
      onSuccess: (_data, _variables, _context, mutation) => {
        queryClient.invalidateQueries({
          queryKey: mutation.options.mutationKey,
        });
      },
    }),
  });
  return queryClient;
}

let browserQueryClient: QueryClient | undefined;

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
