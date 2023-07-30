
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import {
  useHideSidePanel,
  useShowRootSidePanel,
  useSidePanelVisible
} from 'providers';
import { System } from './System';

export const MobileNav = () => {
  const visible = useSidePanelVisible();
  const hideSidePanel = useHideSidePanel();
  const showRoot = useShowRootSidePanel();

  return (
    <nav className="flex h-full items-center px-1">
      <button
        className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-gray-300"
        onClick={visible ? () => hideSidePanel(0) : showRoot}
      >
        <span className="material-symbols-outlined">menu</span>
      </button>
      <Link
        href="/"
        className={clsx(
          'flex h-12 items-center justify-center gap-2 rounded-3xl px-4'
        )}
      >
        <Image
          alt="milkdown logo"
          width={28}
          height={28}
          className="inline-block h-7 w-7"
          src="/milkdown-logo.svg"
        />
        <span>Milkdown</span>
      </Link>

      <System />
    </nav>
  );
};
