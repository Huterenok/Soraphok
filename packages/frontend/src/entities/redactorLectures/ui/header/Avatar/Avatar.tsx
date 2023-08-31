
import { useSelectFile, changeAvatar, $avatarStore } from "../../../model";
import { useUnit } from "effector-react";
import { AvatarUI } from "shared/ui/Avatar";

export const Avatar = () => {
  const { hadleClick, onSelectFile, filePicker } = useSelectFile(changeAvatar);
  const avatarImg = useUnit($avatarStore);

  return (
    <AvatarUI
      hadleClick={hadleClick}
      onSelectFile={onSelectFile}
      filePicker={filePicker}
      avatarImg={avatarImg}
    />
  );
};
