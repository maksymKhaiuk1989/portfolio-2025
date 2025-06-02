import "@/styles/globals.css";
import { metadata } from "@/constants/metadata";
import { FONT_ANONYMOUS } from "@/constants/fonts";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${FONT_ANONYMOUS.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
