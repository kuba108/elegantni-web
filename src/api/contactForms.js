const EMPTY_RESPONSE = { inquiries: [] };

export async function fetchContactForms() {
  try {
    const response = await fetch("/api/admin/contact-forms", {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Response not OK");
    }
    return response.json();
  } catch (error) {
    console.warn("Failed to fetch contact forms", error);
    return EMPTY_RESPONSE;
  }
}
