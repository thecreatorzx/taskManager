import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.code}>404</h1>
      <h2 style={styles.title}>Page Not Found</h2>
      <p style={styles.text}>
        The page you're looking for doesn’t exist or the URL is incorrect.
      </p>

      <button style={styles.button} onClick={() => navigate("/")}>
        Go Back Home
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#e2e8f0",
    textAlign: "center",
  },
  code: {
    fontSize: "6rem",
    margin: 0,
    color: "#38bdf8",
  },
  title: {
    fontSize: "2rem",
    margin: "10px 0",
    color: "#333",
    fontWeight: 400
  },
  text: {
    fontSize: "1rem",
    marginBottom: "20px",
    color: "#94a3b8",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: 500,
    backgroundColor: "#38bdf8",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#0f172a",
  },
};

export default Error;