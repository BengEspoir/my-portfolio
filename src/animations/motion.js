import { useEffect, useRef, useState } from "react";

export const revealUp = "motion-reveal-up";
export const revealFade = "motion-reveal-fade";
export const staggerContainer = "motion-stagger-container";
export const hoverLift = "motion-hover-lift";
export const magneticButton = "motion-magnetic-button";
export const smoothPageTransition = "motion-page-transition";

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getStaggerDelay(index, step = 80, base = 0) {
  return `${base + index * step}ms`;
}

export function useInViewOnce({ threshold = 0.28, rootMargin = "0px 0px -10% 0px" } = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(prefersReducedMotion());

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (prefersReducedMotion()) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  return [ref, isVisible];
}

export function initializeSectionReveal() {
  if (typeof window === "undefined" || typeof document === "undefined") return () => {};

  let observer;
  const rafId = window.requestAnimationFrame(() => {
    const targets = Array.from(new Set(document.querySelectorAll("main section, main [data-motion]")));
    if (targets.length === 0) return;

    targets.forEach((target) => {
      target.classList.add("motion-section-base");
      target.classList.add(target.dataset.motion || revealUp);

      if (target.classList.contains(staggerContainer)) {
        const staggerItems = Array.from(target.querySelectorAll(".motion-stagger-item"));
        staggerItems.forEach((item, index) => {
          if (!item.style.getPropertyValue("--stagger-index")) {
            item.style.setProperty("--stagger-index", String(index));
          }
        });
      }
    });

    if (prefersReducedMotion()) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      // Use threshold 0 so very tall sections (e.g., large project grids) are still revealed.
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
  });

  return () => {
    window.cancelAnimationFrame(rafId);
    if (observer) observer.disconnect();
  };
}

function clamp(value, limit) {
  return Math.max(-limit, Math.min(limit, value));
}

function resetMagnetic(target) {
  target.style.setProperty("--magnetic-x", "0px");
  target.style.setProperty("--magnetic-y", "0px");
  target.style.setProperty("--magnetic-press", "1");
}

export function createMagneticHandlers(enabled = true) {
  if (!enabled || prefersReducedMotion()) return {};

  return {
    onMouseEnter: (event) => {
      const target = event.currentTarget;
      target.__magneticRect = target.getBoundingClientRect();
    },
    onMouseMove: (event) => {
      const target = event.currentTarget;
      const rect = target.__magneticRect || target.getBoundingClientRect();
      const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.16;
      const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.2;

      target.style.setProperty("--magnetic-x", `${clamp(offsetX, 8)}px`);
      target.style.setProperty("--magnetic-y", `${clamp(offsetY, 6)}px`);
    },
    onMouseLeave: (event) => {
      const target = event.currentTarget;
      target.__magneticRect = null;
      resetMagnetic(target);
    },
    onMouseDown: (event) => {
      event.currentTarget.style.setProperty("--magnetic-press", "0.97");
    },
    onMouseUp: (event) => {
      event.currentTarget.style.setProperty("--magnetic-press", "1");
    },
    onBlur: (event) => {
      resetMagnetic(event.currentTarget);
    }
  };
}
