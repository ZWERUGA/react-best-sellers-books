import routes from "../../routes";

import styles from "./Header.module.css";
import HeaderLink from "../HeaderLink/HeaderLink";

function Header() {
  return (
    <nav className={styles.headerContainer}>
      <ul className={styles.headerList}>
        <HeaderLink path={routes.home} title={"Best Sellers Names"} />
      </ul>
    </nav>
  );
}

export default Header;
