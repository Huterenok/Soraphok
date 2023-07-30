
import type { FC } from 'react';

import { System } from './System';

export const DesktopNav: FC = () => (
  <nav className="flex h-full w-full flex-col items-center justify-between pt-11 pb-14">
    <System />
  </nav>
);
