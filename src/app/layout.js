// app/layout.js
import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Layout vs Template Demo",
  description: "Next.js App Router demo",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main >{children}</main>
      </body>
    </html>
  );
}