import { Inter } from "next/font/google";
// import "./globals.css";
import "../../public/bootstrap/css/bootstrap.min.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Header from  "./header.jsx"
import Footer from  "./footer"
import Providers from "@/redux/Provider";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shop Công Nghệ LPTSTORE",
  description: "Mua quần áo thời trang nam đẹp, trẻ trung, đồ trang phục công sở chất lượng, thiết kế mới, thoải mái từ thương hiệu UNIQLO với nhiều kiểu dáng cùng chất lượng ",
};

export default function RootLayout({ children }) {
  return (
    <html>
    <Providers>
      <body className={inter.className}>
      <Header/>
        {children}
      <Footer/>
      <script src="/bootstrap/js/bootstrap.bundle.min.js"></script>
      </body>
    </Providers>
    </html>
  );
}
