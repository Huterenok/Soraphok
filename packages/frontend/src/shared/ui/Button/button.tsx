import { SharedProps } from "shared/config/type";
import { buttonUI } from "./button.module.scss";
import Image from "next/image";
import clsx from "clsx";
import { MouseEventHandler } from "react";

export enum alignImageVariants {
  LEFT = "left",
  RIGHT = "rigth",
}

interface ButtonProps extends SharedProps {
  icon?: string;
  alignImage?: alignImageVariants;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({
  children,
  icon,
  className,
  alignImage = alignImageVariants.RIGHT,
  onClick,
  ...props
}: ButtonProps) => {
  const iconComponent = icon && <Image src={icon} alt="iconBtn" />;
  return (
    <button {...props} onClick={onClick} className={clsx(buttonUI, className)}>
      {alignImage === alignImageVariants.LEFT && iconComponent}

      {children}

      {alignImage === alignImageVariants.RIGHT && iconComponent}
    </button>
  );
};
