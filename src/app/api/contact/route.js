import { Resend } from "resend";

export async function POST(request) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL ?? "kontakt@elegantniweb.cz";

    if (!resendApiKey) {
      console.error("Missing RESEND_API_KEY environment variable.");
      return Response.json(
        { error: "Emailová služba není správně nakonfigurována." },
        { status: 500 }
      );
    }

    if (!contactEmail) {
      console.error("Missing CONTACT_EMAIL environment variable.");
      return Response.json(
        { error: "Konfigurace emailu není dokončena." },
        { status: 500 }
      );
    }

    const resend = new Resend(resendApiKey);

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

    // await resend.emails.send({
    //   from: fromEmail,
    //   to: [contactEmail],
    //   reply_to: email,
    //   subject: `Nová poptávka od ${name}`,
    //   text: textContent,
    // });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'kuba@elegantniweb.cz',
      subject: `Nová poptávka`,
      html: '<p>Ahoj, toto je testovací email z Resend.</p>',
    });

    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return Response.json(
      { error: "Nepodařilo se odeslat zprávu. Zkuste to prosím později." },
      { status: 500 }
    );
  }
}
