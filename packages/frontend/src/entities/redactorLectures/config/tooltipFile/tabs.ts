export enum tabVariants {
  UPLOAD = "UPLOAD",
  LINK = "LINK",
  UNPLASH = "UNPLASH",
  EMOJI = "EMOJI",
}

export interface tabElement {
  key: tabVariants;
  title: string;
}

export const tabs: Record<tabVariants, tabElement> = {
  UPLOAD: {
    key: tabVariants.UPLOAD,
    title: "Upload",
  },
  LINK: {
    key: tabVariants.LINK,
    title: "Link",
  },
  UNPLASH: {
    key: tabVariants.UNPLASH,
    title: "Unplash",
  },
  EMOJI: {
    key: tabVariants.EMOJI,
    title: "Emoji",
  },
};

export interface tabProps {
  changeValue: (file: string) => void;
}
