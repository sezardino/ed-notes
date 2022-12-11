import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { AuthRoutes } from "shared";
import { twMerge } from "tailwind-merge";
import { Button } from "ui";

import Logo from "@/assets/logo.svg";

import { useAppContext } from "@/context/app";
import { useAuth } from "@/hooks/useAuth";

interface Props extends React.HTMLProps<HTMLDivElement> {
  isDashboard?: boolean;
}

export const Header: React.FC<Props> = (props) => {
  const { isDashboard, className, ...rest } = props;
  const { logout } = useAuth();
  const { t } = useTranslation();
  const { user } = useAppContext();

  const notAuthButtons = (
    <div className={twMerge("flex items-center gap-2", className)}>
      <Link legacyBehavior href={AuthRoutes.SingIn}>
        <Button text={t("ui:header.sign-in")} />
      </Link>
      <Link legacyBehavior href={AuthRoutes.SingUP}>
        <Button variant="alternative" text={t("ui:header.sign-up")} />
      </Link>
    </div>
  );

  const authButton = (
    <Link legacyBehavior href={AuthRoutes.SingUP}>
      <Button
        variant="alternative"
        text={t("ui:header.logout")}
        onClick={logout}
      />
    </Link>
  );

  return (
    <header
      {...rest}
      className={twMerge(
        "bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
      )}
    >
      <nav
        className={twMerge(
          "flex flex-wrap gap-2 justify-between items-center mx-auto",
          !isDashboard && "max-w-screen-xl"
        )}
      >
        <Link href={"/"} legacyBehavior>
          <a className="flex items-center">
            <Logo width="45" height="45" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              {t("ui:header.logo")}
            </span>
          </a>
        </Link>

        {user ? authButton : notAuthButtons}
      </nav>
    </header>
  );
};
