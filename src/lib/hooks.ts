"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** True once rendering on the client (for portals and browser-only UI). */
export function useMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Live result of a CSS media query; false during SSR. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Current page URL on the client; empty string during SSR. */
export function useLocationHref() {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("popstate", onChange);
      return () => window.removeEventListener("popstate", onChange);
    },
    () => window.location.href,
    () => "",
  );
}
