import { ProductModel } from "@/models/product-model";
import { Heading } from "../Heading";
import { Stack, Typography, Chip } from "@mui/material";
import { getDiscountPrice } from "@/libs";
import { getTimeRemaining } from "@/libs/date";
import { useBrandDeals } from "@/libs/brand-deal";

const Card = ({ product }: { product: ProductModel }) => {
  const { title, originalPrice, discountRate, image, discountEndDate } =
    product;
  const discountPrice = getDiscountPrice(originalPrice, discountRate);
  const remainTime = getTimeRemaining(discountEndDate);
  return (
    <Stack spacing={1}>
      <Stack
        sx={{
          borderRadius: "8px",
          border: "1px solid gray",
          width: "120px",
          height: "120px",
          overflow: "hidden",
        }}
      >
        <img src={image} />
      </Stack>
      <Stack>
        <Stack>
          <Chip
            color="error"
            label={remainTime ?? "만료"}
            sx={{ padding: "2px" }}
          />
        </Stack>
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
            {discountPrice}원
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

const Content = () => {
  const products = useBrandDeals();
  return (
    <Stack direction="row" sx={{ overflow: "scroll" }}>
      {products.map((product) => (
        <Stack key={product.id} spacing={2} mx={2}>
          <Card product={product} />
        </Stack>
      ))}
    </Stack>
  );
};

export const BrandDealSection = () => {
  return (
    <Stack>
      <Heading title="오늘의 브랜드딜" isVisibleFullViewButton={true} />
      <Content />
    </Stack>
  );
};
