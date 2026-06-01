export interface QuoteLine {
  productId: number;
  productName: string;
  variantId: number;
  variantName: string;
  sku: string;
  unitPrice: number;
  quantity: number;
}

export interface QuoteDraft {
  customerName: string;
  customerPhone: string;
  note: string;
  dealerName: string;
  dealerGroup: string;
  priceTier: "agent1" | "agent2";
  lines: QuoteLine[];
  createdAt: string;
}
