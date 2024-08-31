import { useEffect, useState } from "react";
import { lureDealRepository } from "@/repositories/lure-deal-repository";
import { ProductModel } from "@/models/product-model";
import InfiniteScroll from "react-infinite-scroller";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { getDiscountPrice } from "@/libs";

const Card = ({ product }: { product: ProductModel }) => {
  const { title, originalPrice, discountRate, image } = product;
  const discountPrice = getDiscountPrice(originalPrice, discountRate);
  return (
    <Stack
      sx={{
        borderRadius: "12px",
        width: "146px",
        height: "227px",
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <Stack sx={{ width: "100%", height: "142px", objectFit: "cover" }}>
        <img src={image} />
      </Stack>
      <Stack sx={{ padding: "10px 10px 0 10px" }}>
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
        <Stack direction="row" spacing={2}>
          <Typography variant="body1" sx={{ color: "#F8323E" }}>
            {discountRate}%
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: "700" }}>
            {discountPrice}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Content = () => {
  const [products, setProducts] = useState([] as ProductModel[]);

  useEffect(() => {
    async function getProducts() {
      const r = await lureDealRepository.list();
      setProducts([...r]);
    }
    getProducts();
  }, []);

  async function test() {
    // const r = await lureDealRepository.list();
    // setProducts([...products, ...r]);
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={test}
      hasMore={true}
      loader={<Stack key="loader">Loading ...</Stack>}
      useWindow={false}
      getScrollParent={() => document.getElementById("scrollContainer")}
    >
      <Stack spacing={2} direction="row" mx={2} sx={{ overflow: "scroll" }}>
        {products.map((product: ProductModel) => (
          <Stack key={product.id}>
            <Card product={product} />
          </Stack>
        ))}
      </Stack>
    </InfiniteScroll>
  );
};

export const TodaySpecialSection = () => {
  return (
    <Stack
      sx={{ backgroundColor: "#ff6231", paddingBottom: "20px" }}
      direction="column"
    >
      <Typography
        variant="h2"
        sx={{
          padding: "16px 0px 10px 16px",
          color: "white",
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        오늘만 이 가격, 순삭특가!
      </Typography>
      <Content />
    </Stack>
  );
};
