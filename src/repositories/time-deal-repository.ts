import { ProductModel } from "../models/product-model";
import { httpClient } from "../libs/http-client";

export const timeDealRepository = {
  list(time: "current" | "next", page: number) {
    return httpClient.get<{ isLastPage: boolean; itemList: ProductModel[] }>(
      `/deals/time-deal?time=${time}&page=${page}`
    );
  },
};
