import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";

export function Navigation() {
  return (
    <nav aria-label="Main navigation">
      <ul className={styles.navList}>
        <li>
          <NavLink to="/" className={styles.link} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/variables" className={styles.link}>
            Variables
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
