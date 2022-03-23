import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link to="/">My todos</Link>
        </li>
        <li className={`${styles.navItem} ${styles.right}`}>
          <Link to="/sign-up">Sign up</Link>
        </li>
      </ul>
    </nav>
  );
}
