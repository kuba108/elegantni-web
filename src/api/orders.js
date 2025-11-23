const EMPTY_RESPONSE = { orders: [] };

export async function fetchOrders() {
  try {
    const response = await fetch("/api/admin/orders", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Response not OK");
    }
    return response.json();
  } catch (error) {
    console.warn("Failed to fetch orders", error);
    return EMPTY_RESPONSE;
  }
}
