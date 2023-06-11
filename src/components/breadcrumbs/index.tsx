import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import * as mixpanel from "@/lib/mixpanel/events";

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
              mixpanel.track(mixpanel.Events.Breadcrumb, {
                "Current URL": asPath,
                "Next URL": url,
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
