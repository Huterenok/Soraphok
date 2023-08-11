export enum tabVariants {
  UPLOAD = "UPLOAD",
  LINK = "LINK",
  UNPLASH = "UNPLASH",
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
};

export interface tabProps {
  changeValue: (file: string) => void;
}
