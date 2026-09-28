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
      ? "bg-[var(--brand)] text-white hover:bg-[var(--brand-dark)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent)] hover:bg-[var(--surface-soft)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]";

  if (href.startsWith("tel:") || href.startsWith("#")) {
    return (
      <a
        href={href}
        className={`inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold transition-colors duration-300 ${styles} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold transition-colors duration-300 ${styles} ${className}`}
    >
      {children}
    </Link>
  );
}
