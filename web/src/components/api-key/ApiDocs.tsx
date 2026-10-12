function CodeBlock({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-zinc-900 text-zinc-100 text-xs md:text-sm p-4 leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

function Param({ name, desc }: { name: string; desc: string }) {
  return (
    <li className="flex items-start gap-2">
      <code className="shrink-0 rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-mono text-zinc-700">{name}</code>
      <span className="text-sm text-zinc-600">{desc}</span>
    </li>
  );
}

export default function ApiDocs({ baseUrl }: { baseUrl: string }) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-white p-5 md:p-6 shadow-md space-y-8">
      <div>
        <h2 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-2">📘 Hướng dẫn tích hợp API</h2>
        <p className="text-sm text-zinc-600">
          Dùng API key ở trên để lấy danh sách sản phẩm + giá đúng cấp đại lý của bạn, tự dựng website riêng.
          Giá trả về là giá đã lọc theo đúng nhóm giá của bạn — không cần (và không thể) xem giá nhóm khác.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-zinc-800">1. Xác thực</h3>
        <p className="text-sm text-zinc-600">Mọi request gửi kèm header:</p>
        <CodeBlock>{`Authorization: Bearer <api_key_cua_ban>`}</CodeBlock>
        <p className="text-sm text-zinc-600">Thiếu header hoặc key sai/đã bị thu hồi → trả lỗi <code className="font-mono">401</code>.</p>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-zinc-800">2. Danh sách sản phẩm</h3>
        <code className="inline-block rounded bg-zinc-100 px-2 py-1 text-xs font-mono text-zinc-700">GET /api/public/products</code>
        <p className="text-sm text-zinc-600 mt-2">Tham số (query string):</p>
        <ul className="space-y-1.5 ml-1">
          <Param name="page" desc="Trang (mặc định 1)" />
          <Param name="limit" desc="Số sản phẩm / trang, tối đa 50 (mặc định 20)" />
          <Param name="search" desc="Tìm theo tên sản phẩm (không bắt buộc)" />
          <Param name="sort" desc="price_asc | price_desc | group_asc | group_desc — sắp xếp theo giá đại lý thấp nhất của sản phẩm, hoặc theo nhóm/thương hiệu (group_asc/desc = A→Z / Z→A). Không truyền = giữ thứ tự mặc định." />
        </ul>

        <p className="text-sm text-zinc-600 mt-3">Ví dụ — lấy 10 sản phẩm rẻ nhất:</p>
        <CodeBlock>{`curl --location '${baseUrl}/api/public/products?limit=10&sort=price_asc' --header 'Authorization: Bearer <api_key_cua_ban>'`}</CodeBlock>

        <p className="text-sm text-zinc-600 mt-3">Ví dụ — sắp xếp theo nhóm/thương hiệu:</p>
        <CodeBlock>{`curl --location '${baseUrl}/api/public/products?sort=group_asc' --header 'Authorization: Bearer <api_key_cua_ban>'`}</CodeBlock>

        <p className="text-sm text-zinc-600 mt-3">Response mẫu:</p>
        <CodeBlock>{`{
  "data": [
    {
      "id": 8,
      "name": "Khung Bàn Nâng Hạ Manson SmartDesk",
      "vendor": "Manson",
      "description": "...",
      "images": [ { "id": 21, "url": "https://crm.themanson.vn/api/public/uploads/...", "alt": null } ],
      "dealerPriceMin": 1525000,
      "dealerPriceMax": 1950000,
      "variants": [
        {
          "id": 30,
          "sku": "NH-DEN-1416",
          "barcode": "Khung Nâng Hạ Đen 1.4m",
          "displayName": "1.4m-1.6m / Đen",
          "price": 2050000,
          "dealerPrice": 1525000,
          "active": true,
          "imageId": 21
        }
      ]
    }
  ],
  "meta": { "itemsPerPage": 10, "totalItems": 54, "currentPage": 1, "totalPages": 6 }
}`}</CodeBlock>
        <p className="text-sm text-zinc-600">
          <code className="font-mono">price</code> là giá lẻ niêm yết, <code className="font-mono">dealerPrice</code> là giá đại lý của bạn — dùng giá này để tính toán/hiển thị trên site của bạn.
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-zinc-800">3. Chi tiết 1 sản phẩm</h3>
        <code className="inline-block rounded bg-zinc-100 px-2 py-1 text-xs font-mono text-zinc-700">GET /api/public/products/:id</code>
        <CodeBlock>{`curl --location '${baseUrl}/api/public/products/8' --header 'Authorization: Bearer <api_key_cua_ban>'`}</CodeBlock>
      </div>

      <div className="space-y-2">
        <h3 className="font-bold text-zinc-800">4. Mã lỗi</h3>
        <ul className="space-y-1.5 ml-1">
          <Param name="401" desc="Thiếu Authorization header, hoặc API key sai/đã bị thu hồi" />
          <Param name="404" desc="Không tìm thấy sản phẩm (sai id, hoặc sản phẩm đã ngừng bán cho đại lý)" />
          <Param name="429" desc="Gọi quá nhiều request/phút — xem header Retry-After (giây) để biết khi nào gọi lại được" />
          <Param name="500" desc="Lỗi hệ thống — thử lại sau" />
        </ul>
      </div>

      <div className="rounded-xl bg-orange-50 border border-orange-100 p-4 text-sm text-orange-800">
        ⚠️ Giới hạn <strong>60 request/phút</strong> cho mỗi API key. Nếu website của bạn có nhiều khách truy cập, nên tự
        cache lại dữ liệu sản phẩm phía server của bạn (vd 5–10 phút) thay vì gọi API này trực tiếp mỗi lượt khách xem trang.
      </div>
    </div>
  );
}
