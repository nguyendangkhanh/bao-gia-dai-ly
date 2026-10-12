import { NextRequest, NextResponse } from "next/server";
import { authenticatePublicApiRequest } from "@/lib/public-api";
import { getDealerCatalog, parseDealerSort, sortDealerCatalog } from "@/lib/dealer-catalog";

export async function GET(req: NextRequest) {
  const auth = await authenticatePublicApiRequest(req);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(req.url);
  const page = Math.max(Number(searchParams.get("page")) || 1, 1);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 50);
  const search = searchParams.get("search") || "";
  const sort = parseDealerSort(searchParams.get("sort"));

  try {
    const catalog = await getDealerCatalog(search, auth.dealer.priceTier);
    const sorted = sortDealerCatalog(catalog, sort);

    const totalItems = sorted.length;
    const totalPages = Math.max(Math.ceil(totalItems / limit), 1);
    const start = (page - 1) * limit;
    const data = sorted.slice(start, start + limit);

    return NextResponse.json(
      {
        data,
        meta: { itemsPerPage: limit, totalItems, currentPage: page, totalPages },
      },
      {
        headers: {
          "Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
          "X-Accel-Buffering": "no",
        },
      }
    );
  } catch (error) {
    console.error("[public-api] Lỗi getDealerCatalog:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
