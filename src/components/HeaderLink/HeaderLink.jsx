import { NavLink } from "react-router";

import styles from "./HeaderLink.module.css";

function HeaderLink({ path, title }) {
  return (
    <li>
      <NavLink
        to={path}
        className={styles.headerLink}
        style={({ isActive }) => ({
          color: isActive && "lightblue",
        })}
      >
        {title}
      </NavLink>
    </li>
  );
}

export default HeaderLink;
