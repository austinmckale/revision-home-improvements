"use client";

import { useEffect, useRef, type RefObject } from "react";

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]';

export default function useModalFocus(
  open: boolean,
  dialogRef: RefObject<HTMLElement | null>,
  initialFocusRef: RefObject<HTMLElement | null>,
  onClose: () => void,
  returnFocusRef?: RefObject<HTMLElement | null>,
) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;

    const previouslyFocused =
      returnFocusRef?.current ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const backgroundElements = Array.from(document.body.children)
      .filter((element): element is HTMLElement => element instanceof HTMLElement && !element.contains(dialog))
      .map((element) => ({ element, wasInert: element.inert }));

    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.tabIndex >= 0 && element.getClientRects().length > 0 && !element.closest("[inert]"),
      );

    const focusFirst = () => {
      const target = initialFocusRef.current ?? getFocusableElements()[0] ?? dialog;
      target.focus({ preventScroll: true });
    };

    focusFirst();
    backgroundElements.forEach(({ element }) => {
      element.inert = true;
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;
      const elements = getFocusableElements();
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (!first || !last) {
        event.preventDefault();
        dialog.focus({ preventScroll: true });
      } else if (!dialog.contains(document.activeElement)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const handleFocus = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) focusFirst();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocus);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocus);
      backgroundElements.forEach(({ element, wasInert }) => {
        element.inert = wasInert;
      });

      if (
        previouslyFocused?.isConnected &&
        previouslyFocused.getClientRects().length > 0 &&
        !previouslyFocused.closest("[inert]")
      ) {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [open, dialogRef, initialFocusRef, returnFocusRef]);
}
