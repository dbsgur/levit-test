import {
  Header,
  BrandDealSection,
  TimeSpecialSection,
  TodaySpecialSection,
} from "@/components";

const TimeDeal = () => {
  return (
    <div>
      <Header title="타임딜" isBackButtonVisible={false} />
      <TodaySpecialSection />
      <BrandDealSection />
      <TimeSpecialSection />
    </div>
  );
};

export default TimeDeal;
