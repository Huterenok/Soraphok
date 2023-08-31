import { ProvidersContext } from "app/(providers)";
import { AppWrapper } from "app/(ui)";
import type { Metadata } from "next";
import { SharedProps } from "shared/config/type/shared";

export const metadata: Metadata = {
  title: "ReBraind",
  description: "Platform for rebraind",
};

const RootLayout = ({ children }: SharedProps) => (
  <ProvidersContext>
    <AppWrapper>{children}</AppWrapper>
  </ProvidersContext>
);

export default RootLayout;
