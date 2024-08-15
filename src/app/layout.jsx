import "./globals.css";

import { Chivo } from "next/font/google";

const bungeeTint = Chivo({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

export const metadata = {
  title: "Ourmusic",
  description: "Spotify real time data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={[bungeeTint.className + " bg-slate-900 text-slate-100"]}>{children}</body>
    </html>
  );
}
