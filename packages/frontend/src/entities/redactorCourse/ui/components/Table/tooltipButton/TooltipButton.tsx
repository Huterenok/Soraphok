import Image, { StaticImageData } from "next/image";
import { tooltipButton } from "./TooltipButton.module.scss";

interface TooltipButtonProps {
  onClick: () => void;
  icon: StaticImageData;
}

export const TooltipButton = ({ onClick, icon }: TooltipButtonProps) => {
  return (
    <button className={tooltipButton} onClick={onClick}>
      <Image src={icon} alt="icon" />
    </button>
  );
};
