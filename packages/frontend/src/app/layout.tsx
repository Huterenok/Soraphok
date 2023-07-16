import { Providers } from "app-flat";

import { montserrat } from "app-flat/styles/fonts";
import "app-flat/styles/global.css";

export const metadata = {
  title: "Soraphok",
  description: "Bebra",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={montserrat.className}>{children}</body>
      </Providers>
    </html>
  );
}
