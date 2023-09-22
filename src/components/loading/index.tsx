
import React from "react";
import styles from "./styles.module.scss";

function Loading() {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.loading}></div>
    </div>
  );
}

export { Loading };