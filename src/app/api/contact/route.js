import { Resend } from "resend";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone = "",
      service_interest = "",
      message = "",
    } = body ?? {};

    if (!name || !email || !message) {
      return Response.json(
        { error: "Jméno, email a zpráva jsou povinné." },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL;
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "web@elegantniai.cz";

    if (!resendApiKey || !toEmail) {
      const missing = !resendApiKey ? "RESEND_API_KEY" : "RESEND_TO_EMAIL";
      console.error(`Missing ${missing} environment variable.`);
      return Response.json(
        { error: "Emailová služba není správně nakonfigurována." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

    const textContent = [
      `Jméno: ${name}`,
      `Email: ${email}`,
      phone ? `Telefon: ${phone}` : null,
      service_interest ? `Služba: ${service_interest}` : null,
      "",
      "Zpráva:",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject: `Nová poptávka od ${name}`,
      text: textContent,
    });

    if (error) {
      throw new Error(`Resend failed: ${error.message}`);
    }

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return Response.json(
      { error: "Nepodařilo se odeslat zprávu. Zkuste to prosím později." },
      { status: 500 }
    );
  }
}
