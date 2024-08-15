import "./globals.css";

import { Chivo } from "next/font/google";

const bungeeTint = Chivo({
  subsets: ['latin'],
})

export const metadata = {
  title: "Real Time Spotify",
  description: "Spotify real time data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={[bungeeTint.className + " bg-slate-900 text-slate-100"]}>{children}</body>
    </html>
  );
}
