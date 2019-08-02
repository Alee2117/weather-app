import React, { Component } from "react";
import axios from "axios";

class Weather extends Component {
  state = {
    value: "",
    city: "",
    country: "",
    tempMin: "",
    tempMax: "",
    currentTemp: "",
    humidity: "",
    conditions: ""
  };

  componentDidMount() {
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
    // this.btnHandler = this.btnHandler.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.componentDidMount();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            placeholder="City"
            onChange={this.handleChange}
          />
          <input type="text" placeholder="State" />
          <button type="submit">Submit</button>
        </form>
        <p>City: {this.state.city}</p>
        <p>Country: {this.state.country}</p>
        <p>Conditions: {this.state.conditions}</p>
        <p>Humidity: {this.state.humidity}</p>
        <p>Current Temp: {this.state.currentTemp}</p>
        <p>Est High: {this.state.tempMax}</p>
        <p>Est Low: {this.state.tempMin}</p>
      </div>
    );
  }
}

export default Weather;
