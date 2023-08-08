import Image from "next/image";
import {
  headerWrapper,
  navbar__brand,
  navbar__inner,
  navbar__item,
  navbar__items,
  navbar__itemsRight,
  navbar__logo,
  theme_toggle_body,
} from "./header.module.scss";
import logo from "./img/udemy-icon.png";
import clsx from "clsx";
import Link from "next/link";
import { ROUTERS_ALL } from "shared/config/routers";
// import { NAME_SERVICE } from "shared/config/constants";
import { LinkUI } from "shared/ui/Link";
import { ThemeSwitch } from "shared/ui/ThemeSwitch";

export const Header = () => {
  return (
    <header className={headerWrapper}>
      <div className={navbar__inner}>
        <div className={navbar__items}>
          <Link href={ROUTERS_ALL.HOME} className={navbar__brand}>
            <div className={navbar__logo}>
              <Image src={logo} alt="logo" width={40} height={40} />
            </div>
            {/* <b>{NAME_SERVICE}</b> */}
          </Link>

          <LinkUI to={ROUTERS_ALL.REDACTOR} className={clsx(navbar__item)}>
            Redactor
          </LinkUI>

          <LinkUI to={ROUTERS_ALL.PROFILE} className={clsx(navbar__item)}>
            Profile
          </LinkUI>
        </div>
        <div className={clsx(navbar__items, navbar__itemsRight)}>
          <div className={theme_toggle_body}>
            <ThemeSwitch />
          </div>
        </div>
      </div>

      {/* <Search /> */}
    </header>
  );
};
