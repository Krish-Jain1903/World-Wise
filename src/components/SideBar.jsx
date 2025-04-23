import styles from "../Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <p>List of Cities</p>
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright 2025 by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}

export default SideBar;
