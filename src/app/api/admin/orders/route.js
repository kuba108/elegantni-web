import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();
    return Response.json({ orders: [] });
  } catch (error) {
    console.error("Failed to fetch admin orders", error);
    if (error.message === "Unauthorized") {
      return Response.json({ error: "Nepřihlášený uživatel." }, { status: 401 });
    }
    if (error.message === "Forbidden") {
      return Response.json(
        { error: "Nemáte oprávnění k této akci." },
        { status: 403 }
      );
    }
    return Response.json(
      { error: "Nepodařilo se načíst objednávky." },
      { status: 500 }
    );
  }
}
