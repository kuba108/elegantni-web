import { requireAdmin } from "@/lib/auth";
import {
  ContactForm,
  ensureContactFormReady,
} from "@/models/ContactForm";
import { mapContactFormToDTO } from "@/lib/contact-forms";

function notFound() {
  return Response.json({ error: "Dotaz nenalezen." }, { status: 404 });
}

function handleAuthError(error) {
  if (error.message === "Unauthorized") {
    return Response.json({ error: "Nepřihlášený uživatel." }, { status: 401 });
  }
  if (error.message === "Forbidden") {
    return Response.json(
      { error: "Nemáte oprávnění k této akci." },
      { status: 403 }
    );
  }
  return null;
}

export async function GET(_request, { params }) {
  try {
    await requireAdmin();
    await ensureContactFormReady();
    const inquiry = await ContactForm.findByPk(params?.id);
    if (!inquiry) return notFound();
    return Response.json({ inquiry: mapContactFormToDTO(inquiry) });
  } catch (error) {
    console.error("Failed to fetch contact form", error);
    const authResponse = handleAuthError(error);
    if (authResponse) return authResponse;
    return Response.json(
      { error: "Nepodařilo se načíst dotaz." },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const admin = await requireAdmin();
    await ensureContactFormReady();
    const inquiry = await ContactForm.findByPk(params?.id);
    if (!inquiry) return notFound();

    const payload = await request.json();
    if (typeof payload.processed !== "boolean") {
      return Response.json(
        { error: "Pole processed musí být boolean." },
        { status: 400 }
      );
    }

    inquiry.processed = payload.processed;
    inquiry.processed_at = payload.processed ? new Date() : null;
    inquiry.processed_by = payload.processed ? admin.id : null;
    await inquiry.save();

    return Response.json({ inquiry: mapContactFormToDTO(inquiry) });
  } catch (error) {
    console.error("Failed to update contact form", error);
    const authResponse = handleAuthError(error);
    if (authResponse) return authResponse;
    return Response.json(
      { error: "Nepodařilo se upravit dotaz." },
      { status: 500 }
    );
  }
}
