import { ProductModel } from "@/models/product-model";
import { brandDealRepository } from "@/repositories/brand-deal-repository";
import { useEffect, useMemo, useState, createContext, useContext } from "react";

const BrandDealContext = createContext<{ getBrandDeals: () => ProductModel[] }>(
  {
    getBrandDeals() {
      return [];
    },
  }
);

function BrandDealProvider({ children }: { children?: React.ReactNode }) {
  const [brandDeals, setBrandDeals] = useState([] as ProductModel[]);

  const navigateToError = () => {
    window.location.href = "/internal-error";
  };
  const brandDealContext = useMemo(
    () => ({
      getBrandDeals() {
        return brandDeals;
      },
    }),
    [brandDeals]
  );

  useEffect(() => {
    if (brandDeals.length > 0) return;
    brandDealRepository
      .list(1)
      .then((response) => {
        setBrandDeals(response.itemList);
      })
      .catch((err) => navigateToError());
  }, []);

  return (
    <BrandDealContext.Provider value={brandDealContext}>
      {children}
    </BrandDealContext.Provider>
  );
}
const useBrandDeals: () => ProductModel[] = () => {
  const context = useContext(BrandDealContext);
  const brandDeals = context.getBrandDeals();
  return brandDeals;
};

export { BrandDealProvider, useBrandDeals };
