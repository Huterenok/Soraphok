import "@milkdown/theme-nord/style.css";
import "../styles/index.scss";

import { SharedProps } from "shared/config/type/shared";
import { wrapperBody, mainApp } from "./AppWrapper.module.scss";
import { Inter } from "next/font/google";
import { Header } from "widgets/Header";
import { ProvidersApplication } from "app-flat/providers";
import { HtmlProvider } from "app-flat/providers";
import { Footer } from "widgets/Footer";

const inter = Inter({ subsets: ["latin"] });

export const AppWrapper = ({ children }: SharedProps) => {
  return (
    <HtmlProvider>
      <body className={inter.className}>
        <ProvidersApplication>
          <div className={wrapperBody}>
            <Header />

            <main className={mainApp}>{children}</main>

            <Footer />
          </div>
        </ProvidersApplication>
      </body>
    </HtmlProvider>
  );
};
