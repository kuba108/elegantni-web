import "./globals.css";

export const metadata = {
  title: "Elegantní web",
  description:
    "Marketingová prezentace a portfolio pro elegantniweb.cz postavené na moderních technologiích.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="cs">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
