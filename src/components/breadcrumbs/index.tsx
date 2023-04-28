import { FC } from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  items: {
    label: string;
    url: string;
    isActive?: boolean;
  }[];
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items = [] }) => {
  return (
    <header className="w-full text-left space-x-2 mb-4 text-neutral-500">
      {items.map(({ label, url, isActive }, index) => (
        <span
          key={`${url}_${label}`}
          className="inline-block max-w-xs truncate"
          title="label"
        >
          {index !== 0 && <span className="mr-2">/</span>}
          <Link
            href={url}
            className={`transition-colors duration-500 ${
              isActive ? "text-white" : ""
            } hover:text-white focus:text-white active:text-white`}
          >
            {label}
          </Link>
        </span>
      ))}
    </header>
  );
};
