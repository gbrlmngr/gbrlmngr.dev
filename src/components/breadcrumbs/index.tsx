import { FC, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { track, Events } from "@/lib/mixpanel/events";

export interface IBreadcrumbsProps {
  items: {
    label: string;
    url: string;
  }[];
}

export const Breadcrumbs: FC<IBreadcrumbsProps> = ({ items = [] }) => {
  const { asPath } = useRouter();

  return (
    <nav className="w-full mb-4 sm:mb-6 text-left space-x-2 text-neutral-500">
      {items.map(({ label, url }, index) => (
        <span
          key={`${url}_${label}`}
          className="inline-block max-w-xs truncate"
          title={label}
        >
          {index !== 0 && <span className="mr-2">/</span>}
          <Link
            href={url}
            className={`transition-colors duration-500 ${
              asPath === url ? "text-white" : ""
            } hover:text-white focus:text-white active:text-white`}
            onClick={() => {
              if (!window) return;

              track(Events.Breadcrumb, {
                "Next URL": `${window.location.origin}${url}`,
              });
            }}
          >
            {label}
          </Link>
        </span>
      ))}
    </nav>
  );
};
