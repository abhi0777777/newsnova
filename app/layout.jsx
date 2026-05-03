import "./globals.css";
import Navbar from "@/components/Navbar";
import LoadingBar from "@/components/LoadingBar";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
export const metadata = {
  title: {
    default: "NewsNova — Breaking News, Real Stories",
    template: "%s | NewsNova",
  },
  description: "NewsNova delivers fast, accurate news across technology, politics, sports, and culture.",
  keywords: ["news", "breaking news", "india news", "technology", "politics"],
  authors: [{ name: "NewsNova" }],
  metadataBase: new URL("https://newsnova.online"),
  openGraph: { siteName: "NewsNova", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoadingBar />
        <Toaster position="top-right" toastOptions={{
          style: { fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", background: "#0f0e0d", color: "#faf8f5" },
        }} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
