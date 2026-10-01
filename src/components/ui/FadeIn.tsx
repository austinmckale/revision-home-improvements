"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export default function FadeIn({ children, className = "", delay = 0, duration = 0.45, yOffset = 18 }: FadeInProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reducedMotion.matches || !("IntersectionObserver" in window) || !element.animate) return;

    // Keep server-rendered content visible. Only reveal sections that start below the viewport.
    if (element.getBoundingClientRect().top < window.innerHeight) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      if (reducedMotion.matches || element.contains(document.activeElement)) return;
      animation = element.animate(
        [
          { opacity: 0, transform: `translateY(${yOffset}px)` },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
    });

    const handleMotionPreference = () => {
      if (!reducedMotion.matches) return;
      observer.disconnect();
      animation?.cancel();
    };

    const handleFocus = () => animation?.cancel();

    observer.observe(element);
    element.addEventListener("focusin", handleFocus);
    reducedMotion.addEventListener("change", handleMotionPreference);

    return () => {
      observer.disconnect();
      animation?.cancel();
      element.removeEventListener("focusin", handleFocus);
      reducedMotion.removeEventListener("change", handleMotionPreference);
    };
  }, [delay, duration, yOffset]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
