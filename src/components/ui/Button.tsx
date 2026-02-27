import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2"
      : "bg-white text-[var(--brand)] border border-[var(--brand)] hover:bg-[var(--surface-soft)] focus-visible:ring-2 focus-visible:ring-[var(--brand)] focus-visible:ring-offset-2";

  if (href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
