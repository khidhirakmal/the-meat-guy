// Root Layout
import GlobalState from "@/context";
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
          <main>{children}</main>
        </GlobalState>
      </body>
    </html>
  );
}
