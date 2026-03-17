"use client";

import React, { useState, useCallback } from "react";
import { Home, Briefcase, Phone, Menu, X, ChevronRight, ChevronDown, Users } from "lucide-react";
import type { NavLink } from "@/lib/types";

interface MobileBottomNavProps {
  navLinks?: NavLink[];
  phone?: string;
  ctaText?: string;
  useMediaQuery?: boolean;
}

function pickIcon(label: string): React.ElementType {
  const lower = label.toLowerCase();
  if (lower.includes("service") || lower.includes("solution")) return Briefcase;
  if (lower.includes("about") || lower.includes("team") || lower.includes("client")) return Users;
  if (lower.includes("contact") || lower.includes("call")) return Phone;
  if (lower.includes("home")) return Home;
  return Briefcase;
}

function buildBottomItems(navLinks: NavLink[]) {
  const homeItem = { label: "Home", href: "/", icon: Home };

  const priorityLabels = ["service", "about", "contact"];
  const picked: { label: string; href: string; icon: React.ElementType }[] = [];

  for (const keyword of priorityLabels) {
    if (picked.length >= 3) break;
    const match = navLinks.find(
      (l) =>
        l.label.toLowerCase().includes(keyword) &&
        !picked.some((p) => p.href === l.href),
    );
    if (match) {
      picked.push({ ...match, icon: pickIcon(match.label) });
    }
  }

  if (picked.length < 3) {
    for (const link of navLinks) {
      if (picked.length >= 3) break;
      if (
        link.href !== "/" &&
        !picked.some((p) => p.href === link.href) &&
        !link.label.toLowerCase().includes("home")
      ) {
        picked.push({ ...link, icon: pickIcon(link.label) });
      }
    }
  }

  return [homeItem, ...picked];
}

function MobileNavItem({ link }: { link: NavLink }) {
  const [open, setOpen] = useState(false);
  const subItems = link.megaMenu && link.columns
    ? link.columns.flatMap((col) => col.links.map((l) => ({ label: l.label, href: l.href })))
    : link.children || [];

  if (subItems.length === 0) {
    return (
      <a
        href={link.href}
        className="flex items-center justify-between border-b border-gray-100 py-3 px-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
      >
        {link.label}
        <ChevronRight size={14} className="text-gray-300" />
      </a>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 px-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
      >
        {link.label}
        <ChevronDown size={14} className={`text-gray-300 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="pb-2 pl-4 space-y-0.5">
          <a
            href={link.href}
            className="block py-2 px-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-md transition-colors"
          >
            All {link.label}
          </a>
          {subItems.map((child, ci) => (
            <a
              key={ci}
              href={child.href}
              className="block py-2 px-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/5 rounded-md transition-colors"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export function MobileBottomNav({ navLinks = [], phone, ctaText, useMediaQuery }: MobileBottomNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const close = useCallback(() => setMenuOpen(false), []);
  const toggle = useCallback(() => setMenuOpen((v) => !v), []);

  if (navLinks.length === 0) return null;

  const bottomItems = buildBottomItems(navLinks);
  const hiddenClass = useMediaQuery ? "md:hidden" : "@min-[768px]:hidden";

  return (
    <nav className={`sticky bottom-0 left-0 right-0 z-[70] ${hiddenClass}`} style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
      {menuOpen && (
        <>
          <div className="absolute bottom-full inset-x-0 h-screen bg-black/50 z-[60]" onClick={close} />

          <div className="absolute bottom-full left-0 right-0 z-[65] bg-white rounded-t-2xl shadow-2xl max-h-[60vh] flex flex-col animate-slide-up-panel">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <h2 className="text-lg font-bold text-gray-900">Menu</h2>
              <button
                onClick={close}
                className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 px-4 py-2">
              {navLinks.map((link, i) => (
                <MobileNavItem key={i} link={link} />
              ))}

              {phone && (
                <a
                  href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-3 mt-4 p-4 bg-primary/5 rounded-xl text-primary font-semibold text-sm"
                >
                  <Phone size={16} />
                  Call {phone}
                </a>
              )}
            </div>
          </div>
        </>
      )}

      <div className="bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-16 px-1">
          {bottomItems.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg text-gray-500 hover:text-primary hover:bg-gray-50 transition-all"
            >
              <item.icon size={18} className="mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </a>
          ))}

          <button
            onClick={toggle}
            className={`flex flex-col items-center justify-center flex-1 py-2 px-1 rounded-lg transition-all ${
              menuOpen
                ? "text-primary bg-primary/10"
                : "text-gray-500 hover:text-primary hover:bg-gray-50"
            }`}
          >
            {menuOpen ? <X size={18} className="mb-1" /> : <Menu size={18} className="mb-1" />}
            <span className="text-[10px] font-medium">{menuOpen ? "Close" : "More"}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
