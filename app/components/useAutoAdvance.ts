"use client";

import { useEffect, useState, useSyncExternalStore, type FocusEvent, type PointerEvent } from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
function subscribeMotion(change: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
}
const readMotion = () => window.matchMedia(motionQuery).matches;
const serverMotion = () => true;

export default function useAutoAdvance(advance: () => void, delay = 6000) {
  const [held, setHeld] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [manualStop, setManualStop] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);
  const stopped = manualStop ?? reducedMotion;
  const paused = held || hovered || keyboardFocused || stopped;

  useEffect(() => {
    const release = () => setHeld(false);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    return () => {
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) advance();
    }, delay);
    return () => window.clearInterval(timer);
  }, [advance, delay, paused]);

  return {
    paused,
    stopped,
    toggle: () => setManualStop(!stopped),
    bindings: {
      onPointerEnter: (event: PointerEvent<HTMLElement>) => {
        if (event.pointerType === "mouse") setHovered(true);
      },
      onPointerLeave: () => setHovered(false),
      onPointerDown: () => setHeld(true),
      onFocusCapture: (event: FocusEvent<HTMLElement>) => {
        if (event.target.matches(":focus-visible")) setKeyboardFocused(true);
      },
      onBlurCapture: (event: FocusEvent<HTMLElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false);
      },
    },
  };
}
