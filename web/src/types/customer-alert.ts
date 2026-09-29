export interface ShowroomBranch {
  id: string;
  title: string;
  description: string;
  city: "HCM" | "HN";
  mapLink: string;
}

export interface CustomerAlertPayload {
  showroomTitle: string;
  showroomAddress?: string;
  productName: string;
  quotedPrice: string;
  customerName?: string;
  customerPhone?: string;
  expectedTime?: string;
  note?: string;
}

export interface CustomerAlertResponse {
  ok: boolean;
  message?: string;
  error?: string;
}

export const MANSON_SHOWROOMS: ShowroomBranch[] = [
  {
    id: "quan-2",
    title: "Quận 2 (Đỗ Ô Tô)",
    description: "80 Nguyễn Hoàng, An Phú, Quận 2, TP. Hồ Chí Minh",
    city: "HCM",
    mapLink: "https://maps.app.goo.gl/vxv7M3BaKRqngXWp8",
  },
  {
    id: "tan-phu",
    title: "Tân Phú (Đỗ Ô Tô)",
    description: "25 Phan Chu Trinh, Tân Thành, Tân Phú, TP. Hồ Chí Minh",
    city: "HCM",
    mapLink: "https://maps.app.goo.gl/jFVwy9CxxTcAJjQb6",
  },
  {
    id: "trung-van",
    title: "Trung Văn (Đỗ Ô Tô)",
    description: "Số 8, khu BT4 - 3, Vinaconex 3, Trung Văn, Nam Từ Liêm, TP. Hà Nội",
    city: "HN",
    mapLink: "https://maps.app.goo.gl/ym6VAq54Fw1aKDpM9",
  },
  {
    id: "thai-thinh",
    title: "Thái Thịnh (Đỗ Ô Tô)",
    description: "196 Thái Thịnh, Đống Đa, TP. Hà Nội",
    city: "HN",
    mapLink: "https://maps.app.goo.gl/Mfbh3KG9VS7uBZQj9",
  },
];
