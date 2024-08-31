import { BrandDealList, Header } from "@/components";

const BrandDeal = () => {
  return (
    <div>
      <Header title="브랜드딜" isBackButtonVisible={true} />
      <BrandDealList />
    </div>
  );
};

export default BrandDeal;
