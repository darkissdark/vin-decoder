import { Outlet, ScrollRestoration } from "react-router-dom";
import { Container } from "../Container/Container";
import { Header } from "../Header/Header";
import styles from "./Layout.module.css";

export function Layout() {
  return (
    <div className={styles.appWrapper}>
      <Header />

      <main className={styles.main}>
        <Container>
          <Outlet />
        </Container>
      </main>

      <ScrollRestoration />
    </div>
  );
}
