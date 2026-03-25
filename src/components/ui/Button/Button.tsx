import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

export function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button className={clsx(styles.button, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
