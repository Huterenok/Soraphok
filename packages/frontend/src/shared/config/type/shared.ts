import { ReactNode } from "react";

export interface SharedProps {
  children: ReactNode;
  className?: string;
}

export interface LinkI {
	to:string,
	title:string,
}