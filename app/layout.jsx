import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "NewsNova — Breaking News, Real Stories",
    template: "%s | NewsNova",
  },
  description:
    "NewsNova delivers fast, accurate news across technology, politics, sports, and culture.",
  openGraph: {
    siteName: "NewsNova",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              background: "#0f0e0d",
              color: "#faf8f5",
            },
          }}
        />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
