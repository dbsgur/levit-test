export class ProductModel {
  id!: number;
  title!: string;
  originalPrice!: number;
  discountRate!: number;
  image!: string;
  stockPercentage?: number;
  discountEndDate?: Date;
}
