import { ProductModel } from "../models/product-model";
import { httpClient } from "../libs/http-client";

export const brandDealRepository = {
  list(page: number) {
    return httpClient.get<{ isLastPage: boolean; itemList: ProductModel[] }>(
      `/deals/brand-deal?page=${page}`
    );
  },
};
