import React from "react";
import styles from "./App.module.css";
import Weather from "./Components/Weather/Weather";

const App = () => {
  return (
    <div className={styles.App}>
      <h1>Hello World</h1>
      <Weather />
    </div>
  );
};

export default App;
