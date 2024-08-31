import { ProductModel } from "../models/product-model";
import { httpClient } from "../libs/http-client";

export const lureDealRepository = {
  list() {
    return httpClient.get<ProductModel[]>(`/deals/lure-deal`);
  },
};
