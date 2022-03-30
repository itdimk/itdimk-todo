import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { user } = useAppSelector((state) => state.authReducer);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>
          <Link to="/">My todos</Link>
        </li>
        <li className={`${styles.navItem} ${styles.right}`}>
          {user ? (
            <Link to="/">You are: {user.email} </Link>
          ) : (
            <Link to="/sign-up">Sign up</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
