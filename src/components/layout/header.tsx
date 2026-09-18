"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/brand/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { mainNav, type NavItem } from "@/lib/nav";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, item: NavItem) {
  if (item.href === "/") return pathname === "/";
  if (pathname.startsWith(item.href)) return true;
  return item.children?.some((c) => pathname.startsWith(c.href)) ?? false;
}

/**
 * Magazine masthead: a tall title row that scrolls away, and a ruled
 * section-navigation row that sticks to the top (desktop). On smaller
 * screens the masthead row itself sticks.
 */
export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setStuck(y > 120);
    setHidden(y > 600 && y > prev && !menu);
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

  const active = mainNav.find((i) => i.label === menu);
  const navItems = mainNav.filter((i) => i.href !== "/");

  return (
    <>
      {/* Masthead row — sticky on mobile, scrolls away on desktop */}
      <motion.div
        className="sticky top-0 z-50 border-b border-line bg-bg xl:static"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div className="container-x grid h-[68px] grid-cols-[1fr_auto_1fr] items-center gap-4 xl:h-[108px]">
          <div className="hidden font-sans text-[0.62rem] leading-relaxed tracking-[0.22em] text-muted uppercase xl:block">
            <p>Sukhumvit Soi 10 · Bangkok</p>
            <p>Mon – Sat · 10:00 – 20:00</p>
          </div>
          <Link href="/" aria-label="Jesse & Son — home" className="col-start-1 justify-self-start xl:col-start-2 xl:justify-self-center">
            <span className="xl:hidden">
              <Wordmark compact />
            </span>
            <span className="hidden xl:block">
              <Wordmark size="text-[2.6rem]" />
            </span>
          </Link>
          <div className="col-start-3 flex items-center justify-end gap-3">
            <a
              href={`tel:${site.phone}`}
              className="hidden font-sans text-[0.62rem] tracking-[0.22em] text-muted uppercase hover:text-fg 2xl:inline"
            >
              {site.phoneDisplay}
            </a>
            <ThemeToggle />
            <Link
              href="/contact#appointment"
              className="btn-primary hidden h-10 items-center px-5 font-sans text-[0.66rem] font-medium tracking-[0.22em] uppercase transition-colors sm:inline-flex"
            >
              Book a fitting
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex size-10 flex-col items-center justify-center gap-[6px] border border-line xl:hidden"
            >
              <span className="h-px w-5 bg-current" />
              <span className="h-px w-5 bg-current" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Section navigation — sticky on desktop */}
      <motion.header
        className="sticky top-0 z-50 hidden xl:block"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
        onMouseLeave={() => setMenu(null)}
      >
        <div className={cn("relative border-b transition-colors duration-300", stuck ? "glass border-line" : "border-line bg-bg")}>
          <div className="container-x flex h-12 items-center justify-between gap-6">
            <Link
              href="/"
              aria-label="Jesse & Son — home"
              tabIndex={stuck ? 0 : -1}
              className={cn("w-40 transition-all duration-500", stuck ? "opacity-100" : "pointer-events-none -translate-y-1 opacity-0")}
            >
              <Wordmark compact />
            </Link>

            <nav aria-label="Main">
              <ul className="flex items-center">
                {navItems.map((item, i) => {
                  const on = isActive(pathname, item);
                  return (
                    <li key={item.label} className="flex items-center" onMouseEnter={() => setMenu(item.children ? item.label : null)}>
                      {i > 0 && <span className="mx-3 size-[3px] rounded-full bg-line 2xl:mx-4" aria-hidden />}
                      <Link
                        href={item.href}
                        aria-current={on ? "page" : undefined}
                        onFocus={() => setMenu(item.children ? item.label : null)}
                        className={cn(
                          "group relative py-3 font-sans text-[0.66rem] font-medium tracking-[0.2em] whitespace-nowrap uppercase transition-colors duration-300",
                          on ? "text-accent" : "text-fg hover:text-accent",
                        )}
                      >
                        {item.label}
                        <span
                          className={cn(
                            "absolute right-0 bottom-2 left-0 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-luxe)]",
                            on ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                          )}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link
              href="/contact#appointment"
              tabIndex={stuck ? 0 : -1}
              className={cn(
                "w-40 text-right font-sans text-[0.66rem] font-medium tracking-[0.2em] text-accent uppercase transition-all duration-500 hover:underline",
                stuck ? "opacity-100" : "pointer-events-none opacity-0",
              )}
            >
              Book a fitting →
            </Link>
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
                className="absolute inset-x-0 top-full overflow-hidden border-b border-line bg-bg"
              >
                <div className="container-x grid grid-cols-[1fr_3fr] gap-12 py-10">
                  <div className="border-r border-line pr-10">
                    <p className="eyebrow">{active.label}</p>
                    <p className="mt-4 font-serif text-3xl leading-tight">
                      {active.label === "Products" ? (
                        <>
                          Cut for <em className="text-accent">you</em> alone.
                        </>
                      ) : (
                        <>
                          From first visit to <em className="text-accent">final</em> fitting.
                        </>
                      )}
                    </p>
                    <Link href={active.href} className="mt-6 inline-block font-sans text-[0.66rem] tracking-[0.2em] uppercase underline-offset-4 hover:underline">
                      View all →
                    </Link>
                  </div>
                  <div className={cn("grid gap-6", active.children.length > 4 ? "grid-cols-5" : active.children.length > 2 ? "grid-cols-4" : "grid-cols-2")}>
                    {active.children.map((child, i) => (
                      <motion.div
                        key={child.href}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: EASE }}
                      >
                        <Link href={child.href} className="group block">
                          <div className="relative aspect-[4/3] overflow-hidden bg-bg-alt">
                            {child.image && (
                              <Image
                                src={child.image}
                                alt=""
                                fill
                                sizes="25vw"
                                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-105"
                              />
                            )}
                          </div>
                          <p className="mt-3 font-sans text-[0.6rem] tracking-[0.25em] text-accent uppercase">
                            No. {String(i + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-1 font-serif text-2xl group-hover:italic">{child.label}</p>
                          {child.description && <p className="mt-1 text-[0.95rem] text-muted">{child.description}</p>}
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
