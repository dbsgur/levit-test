import { ProductModel } from "@/models/product-model";
import { brandDealRepository } from "@/repositories/brand-deal-repository";
import { useEffect, useMemo, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { webPath } from "@/router";

const BrandDealContext = createContext<{ getBrandDeals: () => ProductModel[] }>(
  {
    getBrandDeals() {
      return [];
    },
  }
);

function brandDealProvider({ children }: { children?: React.ReactNode }) {
  const navigate = useNavigate();
  const [brandDeals, setBrandDeals] = useState([] as ProductModel[]);

  const navigateToError = () => {
    navigate(webPath.internalServerError());
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

export { brandDealProvider };
