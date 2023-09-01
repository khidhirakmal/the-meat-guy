// Root Layout
import GlobalState from "@/GlobalContext";
import "./globals.css";
import { Roboto } from "next/font/google";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "The Meat Guy - Online Butchery",
  description: "Your one-stop meat supplier",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <GlobalState>
          <Navbar />
          <main className="bg-white flex min-h-screen flex-col mt-[120.5px]">
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  );
}
