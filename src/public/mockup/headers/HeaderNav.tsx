"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import type { NavLink } from "@/lib/types";

interface HeaderNavProps {
  navLinks: NavLink[];
  linkClassName?: string;
  chevronClassName?: string;
}

function DropdownMenu({ items, onClose }: { items: NavLink[]; onClose: () => void }) {
  return (
    <div className="absolute top-full left-0 mt-0.5 w-56 rounded-lg border border-gray-200 bg-white py-1.5 shadow-xl z-[60]">
      {items.map((child, i) => (
        <Link
          key={`${child.href}-${i}`}
          href={child.href}
          onClick={onClose}
          className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
        >
          {child.label}
        </Link>
      ))}
    </div>
  );
}

function MegaMenu({ link, onClose }: { link: NavLink; onClose: () => void }) {
  const columns = link.columns && link.columns.length > 0
    ? link.columns
    : link.children
      ? [{ title: link.label, links: link.children.map((c) => ({ label: c.label, href: c.href, description: undefined as string | undefined })) }]
      : [];

  if (columns.length === 0) return null;

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0.5 w-[600px] max-w-[90vw] rounded-xl border border-gray-200 bg-white p-6 shadow-2xl z-[60]">
      <div className={`grid gap-6 ${columns.length >= 3 ? "grid-cols-3" : columns.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
        {columns.map((col, ci) => (
          <div key={ci}>
            {col.title && (
              <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-gray-400">
                {col.title}
              </h4>
            )}
            <div className="space-y-1">
              {col.links.map((item, li) => (
                <Link
                  key={`${item.href}-${li}`}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-2.5 rounded-md px-2.5 py-2 transition-colors hover:bg-primary/5"
                >
                  {"image" in item && item.image && (item.image.startsWith("http") || item.image.startsWith("data:")) && (
                    <img src={item.image} alt="" className="h-8 w-8 rounded object-cover shrink-0 mt-0.5" />
                  )}
                  <div className="min-w-0">
                    <span className="text-sm font-medium text-gray-800">
                      {item.label}
                    </span>
                    {"description" in item && item.description && (
                      <span className="mt-0.5 block text-xs text-gray-500">{item.description}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function NavItem({
  link,
  linkClassName = "text-secondary font-semibold hover:text-primary transition-colors py-2 text-sm",
  chevronClassName = "text-gray-400",
}: {
  link: NavLink;
  linkClassName?: string;
  chevronClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const hasChildren = (link.children && link.children.length > 0) || (link.columns && link.columns.length > 0);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  if (!hasChildren) {
    return (
      <Link href={link.href} className={linkClassName}>
        {link.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={link.href}
        className={`${linkClassName} inline-flex items-center gap-1`}
      >
        {link.label}
        <ChevronDown size={14} className={`${chevronClassName} transition-transform ${open ? "rotate-180" : ""}`} />
      </Link>

      {open && (
        link.megaMenu
          ? <MegaMenu link={link} onClose={() => setOpen(false)} />
          : <DropdownMenu items={link.children || []} onClose={() => setOpen(false)} />
      )}
    </div>
  );
}

export function HeaderNav({ navLinks, linkClassName, chevronClassName }: HeaderNavProps) {
  return (
    <>
      {navLinks.map((link, i) => (
        <NavItem
          key={`${link.href}-${i}`}
          link={link}
          linkClassName={linkClassName}
          chevronClassName={chevronClassName}
        />
      ))}
    </>
  );
}
