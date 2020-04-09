import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import {
  WiDaySunny,
  WiDayRain,
  WiDayCloudy,
  WiDayFog,
  WiDayThunderstorm,
  WiDaySnow,
  WiHumidity
} from "weather-icons-react";
import {
  WiNightAltSunny,
  WiNightAltRain,
  WiNightAltCloudy,
  WiNightAltFog,
  WiNightAltThunderstorm,
  WiNightAltSnow
} from "weather-icons-react";
import axios from "axios";
import styles from "./Weather.module.css";
// import styles from "./weathers.module.css";
import Clock from "react-live-clock";

class Weather extends Component {
  state = {
    visible: false,
    value: "",
    city: "",
    country: "",
    tempMin: "",
    tempMax: "",
    currentTemp: "",
    humidity: "",
    conditions: "",
    icons: "",
    weather: null
  };

  getWeather() {
    const API_KEY = "e6fa7fb8ebd4360f3b425e454668c79b";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${API_KEY}&units=imperial`
      )
      .then(res => {
        console.log(res);
        this.setState({
          visible: true,
          city: res.data.name,
          country: res.data.sys.country,
          tempMin: res.data.main.temp_min,
          tempMax: res.data.main.temp_max,
          currentTemp: res.data.main.temp,
          humidity: res.data.main.humidity,
          conditions: res.data.weather[0].main,
          icons: res.data.weather[0].id
        });
      })
      .catch(err => {
        console.error(err);
      });
  }
  componentDidMount() {
    if (this.state.weather) {
      this.getWeather();
      this.getIcon();
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
    let icons = this.state.icons;
    let icon;
    if (icons === 800) {
      icon = <WiDaySunny className={styles.icon} size={120} />;
    } else if (icons > 800 && icons <= 804) {
      icon = <WiDayCloudy size={120} />;
    } else if (icons >= 500 && icons <= 531) {
      icon = <WiDayRain size={120} />;
    } else if (icons >= 200 && icons <= 232) {
      icon = <WiDayThunderstorm size={120} />;
    } else if (icons >= 600 && icons <= 622) {
      icon = <WiDaySnow size={120} />;
    } else if (icons >= 701 || icons <= 741) {
      icon = <WiDayFog size={120} />;
    }

    return (
      <div className={styles.weatherWrap}>
        <div className={styles.clock}>
          <Clock format={"hh:mm"} ticking={true} />
        </div>
        {this.state.city ? (
          <div className={styles.infoWrap}>
            <ul className={styles.info}>
              <li className={styles.icon}>{icon}</li>
              <li>{this.state.city}</li>
              <li>{this.state.country}</li>
              <li>{this.state.conditions}</li>
              <li className={styles.humidity}>
                {this.state.humidity}
                <span>
                  <WiHumidity size={30} />
                </span>
              </li>
              <div className={styles.temp}>
                <li className={styles.left}>
                  {Math.round(this.state.tempMin)}
                  <span>&deg;</span>
                  <span className={styles.loHi}>Lo</span>
                </li>
                <li className={styles.center}>
                  {Math.round(this.state.currentTemp)}
                  <span>&deg;</span>
                </li>
                <li className={styles.right}>
                  {Math.round(this.state.tempMax)}
                  <span>&deg;</span>
                  <span className={styles.loHi}>Hi</span>
                </li>
              </div>
            </ul>
            <a href="index.html" className={styles.backArrow}>
              <FontAwesomeIcon icon={faChevronCircleLeft} />
            </a>
          </div>
        ) : null}
        {this.state.weather ? null : (
          <div className={styles.formWrap}>
            <form
              className={this.state.visible ? styles.clicked : styles.fadeForm}
              onSubmit={this.handleSubmit}
            >
              <input
                className={styles.formInput}
                type="text"
                value={this.state.value}
                placeholder="City"
                onChange={this.handleChange}
              />
              <input
                className={styles.formInput}
                type="text"
                placeholder="State/Country"
              />
              <button
                className={styles.button}
                onClick={this.makeFade}
                type="submit"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
