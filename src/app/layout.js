import "./globals.css";
import Inter from "next/font/local";

// const inter = Inter({ subsets: ["latin"] });
const inter = Inter({
  src: "./ui/vendor/fonts/Poppins/Poppins-Regular.ttf",
});
export const metadata = {
  title: "BPB-Business Permit ng Bayan",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dm1hejbuu/image/upload/v1691674279/endUser/SARIAYA-SEAL1_etumcp.jpg"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
