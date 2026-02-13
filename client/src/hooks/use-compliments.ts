import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useCompliments() {
  return useQuery({
    queryKey: [api.compliments.list.path],
    queryFn: async () => {
      const res = await fetch(api.compliments.list.path);
      if (!res.ok) throw new Error("Failed to fetch compliments");
      return api.compliments.list.responses[200].parse(await res.json());
    },
  });
}
