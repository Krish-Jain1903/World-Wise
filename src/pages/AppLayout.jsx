import AppNav from "../components/AppNav";
import Map from "../components/Map";
import SideBar from "../components/SideBar";
import User from "../User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <SideBar />
      <User />
      <Map />
    </div>
  );
}

export default AppLayout;
