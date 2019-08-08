import React, { Component } from "react";
import axios from "axios";
import styles from "./Weather.module.css";
import Clock from "react-live-clock";

class Weather extends Component {
  state = {
    value: "",
    city: "",
    country: "",
    tempMin: "",
    tempMax: "",
    currentTemp: "",
    humidity: "",
    conditions: "",
    weather: null
  };

  getWeather() {
    const API_KEY = "e6fa7fb8ebd4360f3b425e454668c79b";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          this.state.value
        }&appid=${API_KEY}&units=imperial`
      )
      .then(res => {
        console.log(res);
        this.setState({
          city: res.data.name,
          country: res.data.sys.country,
          tempMin: res.data.main.temp_min,
          tempMax: res.data.main.temp_max,
          currentTemp: res.data.main.temp,
          humidity: res.data.main.humidity,
          conditions: res.data.weather[0].main
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount() {
    if (this.state.weather) {
      this.getWeather();
    }
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.getWeather();
  };
  render() {
    return (
      <div className={styles.weather}>
        <ul className={styles.info}>
          <li>
            Current time: <Clock format={"hh:mm:ss"} ticking={true} />
          </li>
          <li>City: &nbsp; {this.state.city}</li>
          <li>Country:&nbsp; {this.state.country}</li>
          <li>Conditions: &nbsp; {this.state.conditions}</li>
          <li>Humidity:&nbsp; {this.state.humidity}</li>
          <li>Current Temp: &nbsp; {this.state.currentTemp}</li>
          <li>Est High: &nbsp; {this.state.tempMax}</li>
          <li>Est Low: &nbsp; {this.state.tempMin}</li>
        </ul>
        <form className={styles.inputForm} onSubmit={this.handleSubmit}>
          <input
            className={styles.inputForm}
            type="text"
            value={this.state.value}
            placeholder="City"
            onChange={this.handleChange}
          />
          <input
            className={styles.inputForm}
            type="text"
            placeholder="Country"
          />
          <button className={styles.inputForm} type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Weather;
