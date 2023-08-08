"use client";

import { SharedProps } from "shared/config/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { navbar__link, navbar__linkActive } from "./link.module.scss";

interface LinkProps extends SharedProps {
  to: string;
}

export const LinkUI = ({ children, className, to }: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === to && navbar__linkActive;

  return (
    <Link href={to} className={clsx(navbar__link, isActive, className)}>
      {children}
    </Link>
  );
};
