import { requireAdmin } from "@/lib/auth";
import {
  ContactForm,
  ensureContactFormReady,
} from "@/models/ContactForm";
import { mapContactFormToDTO } from "@/lib/contact-forms";

export async function GET() {
  try {
    await requireAdmin();
    await ensureContactFormReady();
    const items = await ContactForm.findAll({
      order: [
        ["processed", "ASC"],
        ["createdAt", "DESC"],
      ],
    });
    return Response.json({
      inquiries: items.map(mapContactFormToDTO),
    });
  } catch (error) {
    console.error("Failed to fetch contact forms", error);
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
      { error: "Nepodařilo se načíst dotazy." },
      { status: 500 }
    );
  }
}
