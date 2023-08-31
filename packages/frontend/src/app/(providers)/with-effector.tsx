import { EffectorNext } from "@effector/next";
import { SharedProps } from "shared/config/type";

export const EffectorProvider = ({ children }: SharedProps) => (
  <EffectorNext>{children}</EffectorNext>
);
