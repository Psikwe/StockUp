import { useQuery } from "@tanstack/react-query";
import { GetAllProducts } from "../../services/stats.service";

export const useProducts = () => {
  const productQuery = useQuery({
    queryKey: ["productQuery"],
    queryFn: () => GetAllProducts(),
    staleTime: Infinity,
  });
  return {
    productQuery,
  };
};
