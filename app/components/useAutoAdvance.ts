"use client";

import { useEffect, useState, type FocusEvent } from "react";

export default function useAutoAdvance(advance: () => void, delay = 6000) {
  const [held, setHeld] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = held || keyboardFocused || stopped;

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
    toggle: () => setStopped((previous) => !previous),
    bindings: {
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
