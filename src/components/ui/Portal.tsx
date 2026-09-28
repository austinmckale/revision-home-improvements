"use client";

import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export default function Portal({ children }: PortalProps) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return mounted ? createPortal(children, document.body) : null;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;
