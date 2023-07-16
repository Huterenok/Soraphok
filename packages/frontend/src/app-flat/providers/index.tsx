"use client";
import { ReactNode } from "react";

import { Apollo } from "./apollo";

export const Providers = ({ children }: { children: ReactNode }) => {
  return <Apollo>{children}</Apollo>;
};
