import { ProductModel } from "@/models/product-model";
import { brandDealRepository } from "@/repositories/brand-deal-repository";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

const Card = ({ product }: { product: ProductModel }) => {
  const { title, originalPrice, discountRate, image } = product;
  const discountPrice = (originalPrice * discountRate) / 100;
  return (
    <Stack direction="row" mx={2}>
      <Stack
        sx={{
          width: "140px",
          height: "140px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <img src={image} />
      </Stack>
      <Stack direction="column">
        <Stack>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body1">ProgressBar</Typography>
        </Stack>
        <Stack>
          <Typography variant="h6">할인가 {discountPrice}원</Typography>
          <Typography variant="body2">
            곧 정상가 {originalPrice}원으로 돌아갑니다.
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export const BrandDealList = () => {
  const [products, setProducts] = useState([] as ProductModel[]);
  async function getProducts() {
    const r = await brandDealRepository.list(1);
    setProducts([...products, ...r.itemList]);
  }

  useEffect(() => {
    if (products.length > 0) return;
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
      <Stack spacing={2} direction="column" mx={2}>
        {products.map((product) => (
          <Stack key={product.id}>
            <Card product={product} />
          </Stack>
        ))}
      </Stack>
    </InfiniteScroll>
  );
};
