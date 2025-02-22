import { MdErrorOutline } from "react-icons/md";

import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message }) {
  return (
    <div className={styles.errorMessage}>
      <MdErrorOutline color="white" size={32} />
      {message}
    </div>
  );
}

export default ErrorMessage;
