import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.css";

type BackButtonProps = {
  children: ReactNode;
  fallbackTo: string;
  ariaLabel?: string;
};

export function BackButton({ children, fallbackTo, ariaLabel = "Go back" }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    const idx = window.history.state?.idx;
    const referrerIsSameOrigin =
      typeof document !== "undefined" &&
      typeof document.referrer === "string" &&
      document.referrer.startsWith(window.location.origin);

    if (typeof idx === "number" && idx > 0 && referrerIsSameOrigin) {
      navigate(-1);
      return;
    }

    navigate(fallbackTo);
  };

  return (
    <button type="button" className={styles.button} onClick={handleBack} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
