import { Link } from "react-router-dom";
import { PageMeta } from "@/components/seo/PageMeta/PageMeta";
import styles from "./NotFoundPage.module.css";

export function NotFoundPage() {
  return (
    <section className={styles.wrapper}>
      <PageMeta
        title="404 - Page Not Found - VIN Decoder"
        description="The page you requested does not exist."
      />

      <h1 className={styles.title}>404</h1>
      <p className={styles.text}>The page you requested does not exist.</p>
      <Link to="/" className={styles.link}>
        Go to Home
      </Link>
    </section>
  );
}
