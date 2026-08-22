"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav, primaryActions, site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation. Adjusting state during render (rather
  // than in an effect) avoids a frame where the menu is still open on the new
  // page — see react.dev "adjusting state when a prop changes".
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setOpenGroup(null);
  }

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-gold-400 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-pitch-950"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || menuOpen
            ? "border-b border-cream/10 bg-pitch-950/92 backdrop-blur-xl"
            : "border-b border-transparent bg-linear-to-b from-pitch-950/80 to-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-3"
            aria-label={`${site.shortName} — home`}
          >
            <Image
              src="/logo.png"
              alt=""
              width={35}
              height={44}
              priority
              className="h-10 w-auto sm:h-11"
            />
            <span className="hidden leading-none sm:block">
              <span className="display block text-lg text-cream">Takeover FC</span>
              <span className="eyebrow mt-1 block text-[0.5625rem] text-gold-500/90">
                Football With Purpose
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setOpenGroup(item.label)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                      isActive(item.href)
                        ? "text-gold-300"
                        : "text-cream/75 hover:text-cream",
                    )}
                    aria-expanded={item.children ? openGroup === item.label : undefined}
                  >
                    {item.label}
                    {item.children ? (
                      <svg
                        aria-hidden
                        viewBox="0 0 10 6"
                        className={cn(
                          "h-1.5 w-2.5 transition-transform duration-300",
                          openGroup === item.label && "rotate-180",
                        )}
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    ) : null}
                  </Link>

                  {item.children && openGroup === item.label ? (
                    <div className="absolute left-0 top-full w-72 pt-3">
                      <div className="overflow-hidden rounded-xl border border-cream/12 bg-pitch-900/97 shadow-2xl backdrop-blur-xl">
                        <div aria-hidden className="takeover-line h-px w-full" />
                        <ul className="p-2">
                          {item.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-lg px-4 py-3 transition-colors hover:bg-emerald-500/12"
                              >
                                <span className="block text-sm font-semibold text-cream">
                                  {child.label}
                                </span>
                                {child.description ? (
                                  <span className="mt-1 block text-xs leading-relaxed text-cream/50">
                                    {child.description}
                                  </span>
                                ) : null}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href={primaryActions[0].href}
                className="whitespace-nowrap rounded-full border border-cream/25 px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-cream transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                {primaryActions[0].label}
              </Link>
              <Link
                href={primaryActions[1].href}
                className="whitespace-nowrap rounded-full bg-gold-400 px-4 py-2 text-[0.75rem] font-bold uppercase tracking-[0.12em] text-pitch-950 transition-colors hover:bg-gold-300"
              >
                {primaryActions[1].label}
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold-400 xl:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <svg aria-hidden viewBox="0 0 20 20" className="h-5 w-5">
                {menuOpen ? (
                  <path
                    d="M4 4l12 12M16 4L4 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M2.5 5.5h15M2.5 10h15M2.5 14.5h15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div aria-hidden className="takeover-line h-px w-full opacity-60" />
      </header>

      {/* Mobile menu — a designed panel, not a shrunken desktop nav (§48). */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 top-18 z-40 overflow-y-auto overscroll-contain bg-pitch-950 xl:hidden"
      >
        <nav aria-label="Mobile" className="px-5 pb-16 pt-8 sm:px-8">
          <ul className="space-y-1">
            {mainNav.map((item) => (
              <li key={item.href} className="border-b border-cream/8 pb-1">
                <Link
                  href={item.href}
                  className={cn(
                    "display block py-4 text-3xl transition-colors sm:text-4xl",
                    isActive(item.href) ? "text-gold-300" : "text-cream",
                  )}
                >
                  {item.label}
                </Link>
                {item.children ? (
                  <ul className="-mt-1 space-y-1 pb-4 pl-1">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="block py-1.5 text-sm text-cream/55 transition-colors hover:text-gold-300"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            <Link
              href={primaryActions[0].href}
              className="rounded-full border border-cream/25 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-cream"
            >
              {primaryActions[0].label}
            </Link>
            <Link
              href={primaryActions[1].href}
              className="rounded-full bg-gold-400 px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-pitch-950"
            >
              {primaryActions[1].label}
            </Link>
          </div>

          <p className="mt-10 text-xs uppercase tracking-[0.18em] text-cream/35">
            {site.location} · Founded {site.founded}
          </p>
        </nav>
      </div>
    </>
  );
}
