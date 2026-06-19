export interface ProductImage {
  id: number;
  url: string;
  alt: string | null;
  position: number | null;
  variantIds?: number[];
}

export interface ProductVariant {
  id: number;
  barcode: string | null;
  sku: string | null;
  displayName: string | null;
  price: number | null;
  agentPrice1: number | null;
  agentPrice2: number | null;
  active: boolean;
  imageId: number | null;
  imageDecorIds?: number[] | null;
  link?: string | null;
  weight?: number | null;
  packageLength?: number | null;
  packageWidth?: number | null;
  packageHeight?: number | null;
}

export interface Product {
  id: number;
  name: string;
  vendor: string;
  description: string | null;
  images: ProductImage[];
  variants?: ProductVariant[];
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}
