export interface CartItem {
  variantId: number;
  productId: number;
  productName: string;
  variantName: string;
  sku: string | null;
  retailPrice: number;
  dealerPrice: number;
  quantity: number;
  imageUrl: string | null;
}

export interface CheckoutData {
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  shippingAddress: {
    address: string;
    ward: string;
    district: string;
    city: string;
  };
  requiresInstallation: boolean;
  installationNotes?: string;
  paymentMethod: "SEPAY" | "QR" | "CASH";
  vat?: {
    required: boolean;
    companyName?: string;
    taxCode?: string;
    address?: string;
    email?: string;
  };
  notes?: string;
}
