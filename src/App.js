import React from "react";
import styles from "./App.module.css";
import Weather from "./Components/Weather/Weather";

const App = () => {
  return (
    <div className={styles.app}>
      <Weather />
    </div>
  );
};

export default App;
