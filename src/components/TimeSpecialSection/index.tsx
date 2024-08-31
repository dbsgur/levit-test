import { Stack, Typography, Grid2, Tab, Tabs } from "@mui/material";
import { Heading } from "../Heading";
import { ProductModel } from "@/models/product-model";
import { useState, useEffect } from "react";
import { timeDealRepository } from "@/repositories/time-deal-repository";
import InfiniteScroll from "react-infinite-scroller";
import { formatCurrency, getDiscountPrice } from "@/libs";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Card = ({
  product,
  isOpen,
}: {
  product: ProductModel;
  isOpen: boolean;
}) => {
  const { title, originalPrice, discountRate, image } = product;
  const discountPrice = getDiscountPrice(originalPrice, discountRate);
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignSelf: "center",
        width: "177px",
        margin: "0 auto",
      }}
    >
      <Stack
        sx={{
          borderRadius: "8px",
          border: "1px solid gray",
          width: "175px",
          height: "175px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img src={image} />
        {!isOpen && (
          <Stack
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="body1">오픈 예정</Typography>
          </Stack>
        )}
      </Stack>
      <Stack>
        <Typography
          variant="body1"
          sx={{
            overflow: "hidden",
            textOverflow: "elipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "gray", textDecoration: "line-through" }}
        >
          {formatCurrency(originalPrice)}원
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography variant="body1" sx={{ color: "#F8323E" }}>
            {discountRate}%
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "700" }}>
            {discountPrice}원
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Content = ({
  time,
  isOpen,
}: {
  time: "current" | "next";
  isOpen: boolean;
}) => {
  const [products, setProducts] = useState([] as ProductModel[]);

  async function getProducts() {
    const r = await timeDealRepository.list(time, 1);
    setProducts([...products, ...r.itemList]);
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={getProducts}
      hasMore={true}
      loader={
        <div className="loader" key="loader">
          Loading ...
        </div>
      }
    >
      <Grid2 container spacing={2} mx={2}>
        {products.map((product) => (
          <Grid2 key={product.id} size={6}>
            <Card product={product} isOpen={isOpen} />
          </Grid2>
        ))}
      </Grid2>
    </InfiniteScroll>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Stack sx={{ p: 2 }}>{children}</Stack>}
    </div>
  );
}

export const TimeSpecialSection = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const now = new Date();
  const currentHour = Number(
    now
      .toLocaleString("ko-KR", {
        timeZone: "Asia/Seoul",
        hour: "2-digit",
        hour12: false,
      })
      .split("시")[0]
  );
  const isOpen = currentHour >= 7 || currentHour < 23;
  return (
    <Stack>
      {isOpen ? (
        <>
          <Tabs
            value={tabIndex}
            onChange={(_, newValue: number) => setTabIndex(newValue)}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              label={
                currentHour > 12
                  ? `오후 ${currentHour - 12}시`
                  : `오전 ${currentHour}시`
              }
              {...a11yProps(0)}
            />
            <Tab
              label={
                currentHour + 1 > 12
                  ? `오후 ${currentHour + 1 - 12}시`
                  : `오전 ${Number(currentHour + 1)}시`
              }
              {...a11yProps(1)}
            />
          </Tabs>
          <CustomTabPanel value={tabIndex} index={0}>
            <Content time="current" isOpen={true} />
          </CustomTabPanel>
          <CustomTabPanel value={tabIndex} index={1}>
            <Content time="next" isOpen={true} />
          </CustomTabPanel>
        </>
      ) : (
        <>
          <Heading title="7시에 시작되는 오늘의 타임특가!" />
          <Content time="current" isOpen={false} />
        </>
      )}
    </Stack>
  );
};
