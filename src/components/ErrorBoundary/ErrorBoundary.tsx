"use client";

import { useState } from "react";
import styles from "./ErrorBoundary.module.css";

const ErrorBoundary = () => {
  const [error, setError] = useState(false);

  const errorButtonHandler = () => setError(true);

  if (error) throw new Error("Oops, something went wrong...");

  return (
    <button className={styles.errorButton} onClick={errorButtonHandler}>
      ERROR
    </button>
  );
};

export default ErrorBoundary;
