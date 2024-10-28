
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.css'
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import BootstrapClient from "@/components/global/BootstrapClient";
import AuthProvider from "./context/AuthProvider";








const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>





        <script async
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
          crossOrigin="anonymous"></script>


        <script async src={`${process.env.NEXT_PUBLIC_BASE_URL}/js/misc.js`}></script>
        <script async src={`${process.env.NEXT_PUBLIC_BASE_URL}/js/settings.js`}></script>

        <script async src={`${process.env.NEXT_PUBLIC_BASE_URL}/js/off-canvas.js`}></script>

        <script async src={`${process.env.NEXT_PUBLIC_BASE_URL}/js/todolist.js`}></script>



      </head>

      <AuthProvider>
        <body className={inter.className}>

          {children}






          <BootstrapClient />

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"

          />

        </body>
      </AuthProvider>
    </html>
  );
}
