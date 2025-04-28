interface nullString {
  String: string;
  Valid: boolean;
}

interface nullInt32 {
  Int32: number;
  Valid: boolean;
}

interface nullTime {
  Time: string;
  Valid: boolean;
}

interface nullbool {
  Boolean: boolean;
  Valid: boolean;
}

interface AllProductResponse {
  ID: string;
  Name: string;
  Description: nullString;
  BasePrice: string;
  CurrentPrice: string;
  ImageUrl: nullString;
  CreatedAt: nullTime;
  Weight: nullString;
  UpdatedAt: nullTime;
  TotalCount: number;
}

export type GetProductsResponse = AllProductResponse[];

// Interface for a product image
interface ProductImage {
  id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

export interface ProductResponse {
  ID: string;
  Name: string;
  CategoryName: string;
  Description: string;
  BasePrice: string;
  CurrentPrice: string;
  ImageUrl: string;
  CreatedAt: string;
  UpdatedAt: string;
  Stock: number;
  Images: ProductImage[];
  weight: string;
  categories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

interface CategoryResponse {
  ID: string;
  Name: string;
  Slug: string;
  ParentID: nullString;
  IsGenderSpecific: nullbool;
  ImageUrl: nullString;
  CreatedAt: nullTime;
  UpdatedAt: nullTime;
  ParentName: nullString;
  ParentSlug: nullString;
}

export type GetAllCategoriesResponse = CategoryResponse[];

export type GetCategoryByIDResponse = CategoryResponse;

interface TopSoldProductResponse {
  id: string;
  name: string;
  description: string;
  basePrice: string;
  currentPrice: string;
  imageUrl: string;
  weight: string;
  createdAt: string | null;
  updatedAt: string | null;
  totalSold: number;
}

export type GetTopSoldProductsResponse = TopSoldProductResponse[];

export interface ProductByCategory {
  id: string;
  name: string;
  currentPrice: string;
  imageUrl: nullString;
  weight: nullString;
  updatedAt: nullTime;
  categoryName: string;
  parentCategoryName: nullString;
  totalCount: number;
}

export type GetProductsByCategorySlugsResponse = ProductByCategory[];

export interface CreateOrderResponse {
  orderID: string;
}
