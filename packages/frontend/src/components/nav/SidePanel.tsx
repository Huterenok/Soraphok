
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useEffect } from 'react';
import {
  ROOT,
  useHideSidePanel,
  useHoldSidePanel,
  useShowRootSidePanel,
  useSidePanelState
} from 'providers';

type SidePanelItem = {
  id: string;
  text: string;
  link?: string;
  onClick?: () => void;
  prefixIcon?: string;
  suffixIcon?: string;
};

type SidePanelGroupProps = {
  title?: string;
  items: Array<SidePanelItem>;
};

const SidePanelGroup: FC<SidePanelGroupProps> = ({ title, items }) => {
  const router = useRouter();
  const pageId = router.query.id;

  return (
    <div className="my-2 text-nord0">
      {title && <div className="p-4 text-lg font-medium">{title}</div>}
      <ul>
        {items.map((item, index) => {
          if (item.link) {
            return (
              <Link
                key={index.toString()}
                href={item.link}
              >
                {item.prefixIcon && item.prefixIcon === '$' ? (
                  <span className="w-6" />
                ) : (
                  <span className="material-symbols-outlined">
                    {item.prefixIcon}
                  </span>
                )}
                <span className="flex-1">{item.text}</span>
                {item.suffixIcon && (
                  <span className="material-symbols-outlined">
                    {item.suffixIcon}
                  </span>
                )}
              </Link>
            );
          }
          return (
            <div
              key={index.toString()}
              onClick={item.onClick}
            >
              {item.prefixIcon && item.prefixIcon === '$' ? (
                <span className="w-6" />
              ) : (
                <span className="material-symbols-outlined">
                  {item.prefixIcon}
                </span>
              )}
              <span className="flex-1">{item.text}</span>
              {item.suffixIcon && (
                <span className="material-symbols-outlined">
                  {item.suffixIcon}
                </span>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export const SidePanel: FC = () => {
  const holdSidePanel = useHoldSidePanel();
  const hideSidePanel = useHideSidePanel();
  const showRootSidePanel = useShowRootSidePanel();
  const { mode, activeId } = useSidePanelState();
  const isRoot = activeId === ROOT;
  const router = useRouter();
  const location = router.asPath;

  useEffect(() => {
    hideSidePanel(0);
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [hideSidePanel, location]);

  return (
    <div
      className="flex h-full w-full flex-col divide-y overflow-auto overscroll-none p-3"
      onMouseEnter={holdSidePanel}
      onMouseLeave={() => hideSidePanel(500)}
    >
      {mode === 'mobile' && !isRoot && (
        <SidePanelGroup
          items={[
            {
              id: ROOT,
              onClick: showRootSidePanel,
              text: 'Back',
              prefixIcon: 'arrow_back'
            }
          ]}
        />
      )}
    </div>
  );
};
