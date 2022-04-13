import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.scss";

export function Navbar() {
  const { user } = useAppSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(e: any) {
    e.preventDefault();
    dispatch(logout());
    navigate("/sign-in");
  }

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navItems}>
        {user && <li className={styles.navItem}>
          <Link to="/">My todos</Link>
        </li>}
        <li className={`${styles.navItem} ${styles.right}`}>
          {user ? (
            <p className={styles.navText}>
              {user.email}
              <Link to="/" onClick={handleClick}>
                Logout
              </Link>
            </p>
          ) : (
            <Link to="/sign-in">Sign in</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
