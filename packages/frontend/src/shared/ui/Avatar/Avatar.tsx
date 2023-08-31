import Image from "next/image";

import {
  avatarBody,
  avatar,
  changeAvatarBody,
  changeAvatar as changeAvatarStyle,
  changeAvatarContent,
} from "./avatar.module.scss";
import camera from "./img/camera.svg";
import { AvatarProps } from "./avatar.type";

export const AvatarUI = ({
  avatarImg,
  hadleClick,
  onSelectFile,
  filePicker,
}: AvatarProps) => {
  return (
    <div className={avatarBody}>
      <div className={changeAvatarBody} onClick={hadleClick}>
        {avatarImg && (
          <div
            className={avatar}
            style={{
              backgroundImage: `url(${avatarImg})`,
            }}
          />
        )}

        <div
          className={changeAvatarStyle}
          style={{ opacity: +!Boolean(avatarImg) }}
        >
          <div className={changeAvatarContent}>
            <Image src={camera} alt="camera" />
            <input
              ref={filePicker}
              onChange={onSelectFile}
              type="file"
              accept="image/*,.png,.jpg,.gif,.web"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
