import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";
import { Icon, IconNames } from "ui";

export interface SidebarLink {
  label: string;
  icon: IconNames;
  href: string;
}

interface Props extends React.HTMLProps<HTMLDivElement> {
  isOpen: boolean;
  links: SidebarLink[];
  extraLinks?: SidebarLink[];
  footerLinks?: SidebarLink[];
}

interface SidebarLinkProps extends React.HTMLProps<HTMLLIElement> {
  link: SidebarLink;
  isSidebarOpen: boolean;
  hideLabel?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = (props) => {
  const { isSidebarOpen, link, hideLabel, className, ...rest } = props;

  return (
    <li {...rest} className={twMerge(className)}>
      <Link legacyBehavior href={link.href}>
        <a
          href="#"
          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          <Icon
            name={link.icon}
            className="group-hover:text-gray-900 dark:group-hover:text-white"
          />
          <span
            className={twMerge(
              "ml-3",
              !isSidebarOpen || hideLabel ? "sr-only" : ""
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
  const { links, extraLinks, footerLinks, className, ...rest } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen((value) => !value);

  return (
    <aside
      {...rest}
      className={twMerge(
        "sticky top-0 left-0 w-64 h-full transition-[width]",
        className
      )}
      aria-label="Sidebar navigation"
    >
      <div className={twMerge("h-full", isOpen ? "" : "w-full max-sm:hidden")}>
        <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <ul className="space-y-2">
            {links.map((link) => (
              <SidebarLink key={link.href} link={link} isSidebarOpen={isOpen} />
            ))}
          </ul>
          {extraLinks && (
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              {extraLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  link={link}
                  isSidebarOpen={isOpen}
                />
              ))}
            </ul>
          )}
        </div>
        {isOpen && footerLinks && (
          <ul className="hidden absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full lg:flex bg-white dark:bg-gray-800 z-20">
            {footerLinks.map((link) => (
              <SidebarLink
                key={link.href}
                link={link}
                isSidebarOpen={isOpen}
                hideLabel
              />
            ))}
          </ul>
        )}
      </div>
      <button
        className={twMerge(
          "absolute top-2 right-0 translate-x-1/2 rounded-full border bg-white border-gray-200 dark:bg-gray-800",
          !isOpen && "rotate-180"
        )}
        onClick={toggleOpen}
      >
        <Icon name="MdKeyboardArrowRight" size={16} />
        <span className="sr-only">
          {t(`ui:sidebar.${isOpen ? "close" : "open"}`)}
        </span>
      </button>
    </aside>
  );
};
