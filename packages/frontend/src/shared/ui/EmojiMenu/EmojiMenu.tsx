import { gemoji } from "gemoji";
import { menuEmoji, itemEmoji } from "./EmojiMenu.module.scss";

export const EmojiMenuUi = () => {
  return (
    <div className={menuEmoji}>
      {gemoji.slice(0, 20).map(({ emoji }) => (
        <span key={emoji} className={itemEmoji}>
          {emoji}
        </span>
      ))}
    </div>
  );
};
