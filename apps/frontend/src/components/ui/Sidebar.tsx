import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { Button, Icon, IconNames } from "ui";

export interface SidebarLink {
  label: string;
  icon: IconNames;
  href: string;
}

interface Props extends React.HTMLProps<HTMLDivElement> {
  links: SidebarLink[];
  extraLinks?: SidebarLink[];
  footerLinks?: SidebarLink[];
  cta?: SidebarLink;
}

interface SidebarLinkProps extends React.HTMLProps<HTMLLIElement> {
  link: SidebarLink;
  isLabelShowed: boolean;
  hideLabel?: boolean;
  isActive: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
  const { isLabelShowed, isActive, link, hideLabel, className, ...rest } =
    props;

  return (
    <li {...rest} className={twMerge(className)}>
      <Link legacyBehavior href={link.href}>
        <a
          className={twMerge(
            "flex items-center p-2 text-base font-normal text-gray-400 dark:text-gray-400 rounded-lg dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700",
            isActive && "dark:text-white bg-gray-100 dark:bg-gray-700"
          )}
        >
          <Icon name={link.icon} className="text-inherit" />
          <span
            className={twMerge(
              "ml-3",
              !isLabelShowed || hideLabel ? "sr-only" : ""
            )}
          >
            {link.label}
          </span>
        </a>
      </Link>
    </li>
  );
};

export const Sidebar: React.FC<Props> = (props) => {
  const { cta, links, extraLinks, footerLinks, className, ...rest } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const router = useRouter();

  const toggleOpen = () => setIsOpen((value) => !value);
  const toggleMobileOpen = () => setIsMobileOpen((value) => !value);

  return (
    <aside
      {...rest}
      className={twMerge(
        "sticky top-0 left-0  h-full max-md:fixed max-md:-translate-x-full max-md:z-10 transition-transform",
        isMobileOpen && "max-md:translate-x-0",
        className
      )}
      aria-label="Sidebar navigation"
    >
      <div
        className={twMerge(
          "relative w-full transition-[width] h-full max-md:w-64",
          !isOpen ? "" : "sm:w-64"
        )}
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            {links.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                isLabelShowed={isOpen || isMobileOpen}
                isActive={
                  link.href === router.pathname ||
                  router.pathname.startsWith(link.href)
                }
              />
            ))}
          </ul>
          {extraLinks && (
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              {extraLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={link}
                  isLabelShowed={isOpen || isMobileOpen}
                  isActive={link.href === router.pathname}
                />
              ))}
            </ul>
          )}

          {cta && (
            <Button
              text={isOpen || isMobileOpen ? cta.label : ""}
              href={cta.href}
              icon={cta.icon}
              size="xs"
              isFillWidth
              className="mt-10"
            />
          )}
        </div>
        {isOpen && footerLinks && (
          <ul className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
            {footerLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                isLabelShowed={isOpen || isMobileOpen}
                hideLabel
                isActive={link.href === router.pathname}
              />
            ))}
          </ul>
        )}
        <button
          className={twMerge(
            "absolute top-2 right-0 translate-x-1/2 rounded-full border bg-white border-gray-200 dark:bg-gray-800 max-md:hidden",
            !isOpen && "rotate-180"
          )}
          onClick={toggleOpen}
        >
          <Icon name="MdKeyboardArrowRight" size={16} />
          <span className="sr-only">
            {t(`ui:sidebar.${isOpen ? "close" : "open"}`)}
          </span>
        </button>
      </div>
      <button
        className={twMerge(
          "p-2 absolute bottom-5 -right-5 translate-x-full rounded-full border bg-white border-gray-200 dark:bg-gray-800 md:hidden",
          !isMobileOpen && "rotate-180"
        )}
        onClick={toggleMobileOpen}
      >
        <Icon name={isMobileOpen ? "MdClose" : "MdMenu"} size={24} />
        <span className="sr-only">
          {t(`ui:sidebar.${isMobileOpen ? "close" : "open"}`)}
        </span>
      </button>
    </aside>
  );
};
