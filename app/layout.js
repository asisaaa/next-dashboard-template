import { lusitana } from "./ui/fonts";
import '@/app/ui/global.css'
// /app/layout.jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${lusitana.className} antialiased`}>{children}</body>
    </html>
  );
}