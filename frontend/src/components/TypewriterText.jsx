import { useEffect, useMemo, useRef, useState } from "react";

function getPrefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function TypewriterText({
  as: Element = "span",
  text,
  className = "",
  speed = 46,
  startDelay = 160,
  startOnView = true,
  cursor = true,
  rootMargin = "0px 0px -12% 0px"
}) {
  const characters = useMemo(() => Array.from(String(text || "")), [text]);
  const fullText = characters.join("");
  const nodeRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(getPrefersReducedMotion);
  const [hasStarted, setHasStarted] = useState(!startOnView);
  const [visibleCount, setVisibleCount] = useState(() => (getPrefersReducedMotion() ? characters.length : 0));

  useEffect(() => {
    const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) return undefined;

    const handleChange = () => {
      const shouldReduce = mediaQuery.matches;
      setIsReducedMotion(shouldReduce);
      if (shouldReduce) {
        setHasStarted(true);
        setVisibleCount(characters.length);
      }
    };

    handleChange();
    mediaQuery.addEventListener?.("change", handleChange);
    return () => mediaQuery.removeEventListener?.("change", handleChange);
  }, [characters.length]);

  useEffect(() => {
    setVisibleCount(isReducedMotion ? characters.length : 0);
    setHasStarted(isReducedMotion || !startOnView);
  }, [characters.length, isReducedMotion, startOnView]);

  useEffect(() => {
    if (isReducedMotion || hasStarted || !startOnView) return undefined;

    const currentNode = nodeRef.current;
    if (!currentNode || typeof IntersectionObserver === "undefined") {
      setHasStarted(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin }
    );

    observer.observe(currentNode);
    return () => observer.disconnect();
  }, [hasStarted, isReducedMotion, rootMargin, startOnView]);

  useEffect(() => {
    if (isReducedMotion || !hasStarted || visibleCount >= characters.length) return undefined;

    const timeoutId = window.setTimeout(() => {
      setVisibleCount((current) => Math.min(current + 1, characters.length));
    }, visibleCount === 0 ? startDelay : speed);

    return () => window.clearTimeout(timeoutId);
  }, [characters.length, hasStarted, isReducedMotion, speed, startDelay, visibleCount]);

  const visibleText = isReducedMotion ? fullText : characters.slice(0, visibleCount).join("");
  const isTyping = !isReducedMotion && visibleCount < characters.length;

  return (
    <Element
      ref={nodeRef}
      className={["typewriter-text", className].filter(Boolean).join(" ")}
      aria-label={fullText}
    >
      <span className="typewriter-text__sizer" aria-hidden="true">
        {fullText}
      </span>
      <span className="typewriter-text__visible" aria-hidden="true">
        {visibleText}
        {cursor ? (
          <span
            className={["typewriter-text__cursor", isTyping ? "is-typing" : ""].filter(Boolean).join(" ")}
          />
        ) : null}
      </span>
    </Element>
  );
}
