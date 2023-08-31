import { AvatarUI } from "shared/ui/Avatar";
import { sidebar, profileMain } from "./SidebarAccount.module.scss";

export const SidebarAccount = () => {
  return (
    <div className={sidebar}>
      <div className={profileMain}>
        <AvatarUI
          hadleClick={hadleClick}
          onSelectFile={onSelectFile}
          filePicker={filePicker}
          avatarImg={avatarImg}
        />
      </div>
    </div>
  );
};
