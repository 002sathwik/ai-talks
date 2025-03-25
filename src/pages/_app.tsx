import { type AppType } from "next/app";
import {Lobster} from "next/font/google";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

import "~/styles/globals.css";



const lo = Lobster({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lobster",
  display: "swap",
  style: "normal",
  fallback: ["cursive"],
})


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={lo.className}>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </div>
  );
};

export default api.withTRPC(MyApp);
