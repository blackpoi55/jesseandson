"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNav, type NavItem } from "@/lib/nav";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
}

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > 480 && y > prev && !menu);
  });

  // Close menus on navigation (adjust state during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const solid = scrolled || menu !== null;
  const active = mainNav.find((i) => i.label === menu);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.5, ease: EASE }}
        onMouseLeave={() => setMenu(null)}
      >
        <div
          className={cn(
            "relative transition-[background-color,color,border-color] duration-500",
            solid ? "glass border-b border-line-soft text-fg" : "border-b border-ivory/10 text-ivory",
          )}
        >
          <div className="container-x flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
            <Link href="/" aria-label="Jesse & Son — home" className="shrink-0">
              <Wordmark compact />
            </Link>

            <nav aria-label="Main" className="hidden xl:block">
              <ul className="flex items-center gap-5 2xl:gap-8">
                {/* The wordmark links home, so "Home" is left to the mobile menu. */}
                {mainNav.filter((i) => i.href !== "/").map((item) => {
                  const on = isActive(pathname, item);
                  return (
                    <li
                      key={item.label}
                      onMouseEnter={() => setMenu(item.children ? item.label : null)}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        aria-current={on ? "page" : undefined}
                        onFocus={() => setMenu(item.children ? item.label : null)}
                        className={cn(
                          "group relative flex items-center gap-1 py-3 text-[0.68rem] font-medium tracking-[0.16em] whitespace-nowrap uppercase transition-colors duration-300",
                          on ? "text-gold" : "hover:text-gold",
                        )}
                      >
                        {item.label}
                        {item.children && (
                          <ChevronDown
                            className={cn("size-3 transition-transform duration-300", menu === item.label && "rotate-180")}
                            strokeWidth={1.5}
                          />
                        )}
                        <span
                          className={cn(
                            "absolute right-0 bottom-1 left-0 h-px origin-left bg-gold transition-transform duration-500 ease-[var(--ease-luxe)]",
                            on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link
                href="/contact#appointment"
                className="group hidden h-11 items-center gap-2.5 rounded-full border border-gold/70 pr-5 pl-4 font-serif text-[1.08rem] whitespace-nowrap italic transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink sm:inline-flex"
              >
                <PenLine className="size-4 text-gold transition-colors group-hover:text-ink" strokeWidth={1.4} />
                Design Your Own
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
                className="flex size-11 flex-col items-center justify-center gap-[6px] rounded-full border border-current/25 xl:hidden"
              >
                <span className="h-px w-5 bg-current" />
                <span className="h-px w-3.5 translate-x-[3px] bg-current" />
              </button>
            </div>
          </div>

          {/* Mega menu */}
          <AnimatePresence>
            {active?.children && (
              <motion.div
                key={active.label}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="hidden overflow-hidden border-t border-line-soft xl:block"
              >
                <div className="container-x grid grid-cols-[1fr_3fr] gap-12 py-10">
                  <div>
                    <p className="eyebrow">{active.label}</p>
                    <p className="mt-4 font-serif text-3xl leading-tight">
                      {active.label === "Products" ? "Cut for you alone." : "From first visit to final fitting."}
                    </p>
                    <Link href={active.href} className="mt-6 inline-block text-sm text-gold underline-offset-4 hover:underline">
                      Explore {active.label.toLowerCase()} →
                    </Link>
                  </div>
                  <div className={cn("grid gap-5", active.children.length > 2 ? "grid-cols-4" : "grid-cols-2")}>
                    {active.children.map((child, i) => (
                      <motion.div
                        key={child.href}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: EASE }}
                      >
                        <Link href={child.href} className="group block">
                          <div className="relative aspect-[4/3] overflow-hidden rounded-[3px] bg-bg-alt">
                            {child.image && (
                              <Image
                                src={child.image}
                                alt=""
                                fill
                                sizes="25vw"
                                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-110"
                              />
                            )}
                            <div className="absolute inset-0 bg-black/20 transition-opacity duration-500 group-hover:opacity-0" />
                          </div>
                          <p className="mt-4 font-serif text-2xl transition-colors group-hover:text-gold">{child.label}</p>
                          {child.description && <p className="mt-1 text-sm text-muted">{child.description}</p>}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}
