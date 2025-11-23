import { clearAdminSession } from "@/lib/auth";

export async function POST() {
  try {
    await clearAdminSession();
    return Response.json({ success: true });
  } catch (error) {
    console.error("Admin logout failed", error);
    return Response.json(
      { error: "Odhlášení se nezdařilo." },
      { status: 500 }
    );
  }
}
