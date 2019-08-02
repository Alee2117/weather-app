import React, { Component } from "react";
import styles from "./App.module.css";
import Weather from "./Components/Weather/Weather";
import Forecast from "./Components/Forecast/Forecast";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <h1>Hello World</h1>
        <Weather />
        <Forecast />
      </div>
    );
  }
}

export default App;
