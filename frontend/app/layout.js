import localFont from "next/font/local";
import "./globals.css";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = { 
  title: "Bereza Motors",
  description: "Качественные контрактные детали по доступной цене",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" type="image/x-icon" href="/icon.ico"></link>
      
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      
        {children}
      </body>
    </html>
  );
}
