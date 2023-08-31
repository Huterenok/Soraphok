
import { ChangeEvent, RefObject } from "react";

export interface AvatarProps {
  avatarImg: string | null;
  hadleClick: () => void;
  onSelectFile: (event: ChangeEvent<HTMLInputElement>) => void;
  filePicker: RefObject<HTMLInputElement>;
}