import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <NavLink>App Navigation</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
