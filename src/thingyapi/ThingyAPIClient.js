import UserRequests from "./UserRequests";
import TemperatureRequests from "./TemperatureRequests";
import HumidityRequests from "./HumidityRequests";


class ThingyAPIClient {
  constructor() {
    const Client = require("node-rest-client").Client;
    this.client = new Client();
    this.apiurl = "localhost:8081/";
    this.userClient = new UserRequests(this.client, this.apiurl);
    this.temperatureClient = new TemperatureRequests(this.client, this.apiurl);
    this.humidityClient = new HumidityRequests(this.client, this.apiurl);
  }

  getUserClient() {
    return this.userClient;
  }

  getTemperatureClient() {
    return this.temperatureClient;
  }

  getHumidtyClient() {
    return this.humidityClient;
  }
}

export default ThingyAPIClient;
