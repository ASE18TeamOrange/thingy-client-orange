class EnvironmentService {
  constructor() {
    this.stopTemp = false;
    this.stopPressure = false;
    this.stopGas = false;
    this.stopHumidity = false;
  }
  setEnvironment(environment) {
    this.environment = environment;
  }
  setClient(envClient) {
    this.envClient = envClient;
  }

  setStopTemp(v) {
    this.stopTemp = v;
  }

  setStopPressure(v) {
    this.stopPressure = v;
  }

  setStopGas(v) {
    this.stopGas = v;
  }

  setStopHumidity(v) {
    this.stopHumidity = v;
  }

  readingRoutine(sensor) {
    if (sensor === "temperature") {
      this.readLastTemperatures();
    } else if (sensor === "pressure") {
      this.readLastPressures();
    } else if (sensor === "gas") {
      this.readLastGas();
    } else if (sensor === "humidity") {
      this.readLastHumidities();
    }
  }

  async readLastTemperatures() {
    while (true) {
      if (this.stopTemp) break;
      else {
        this.getLastTemperature();
      }
      await this.sleep(2000);
    }
  }

  async readLastPressures() {
    while (true) {
      if (this.stopPressure) break;
      else {
        this.getLastPressure();
      }
      await this.sleep(2000);
    }
  }

  async readLastHumidities() {
    while (true) {
      if (this.stopHumidity) break;
      else {
        this.getLastHumidity();
      }
      await this.sleep(2000);
    }
  }

  async readLastGas() {
    while (true) {
      if (this.stopGas) break;
      else {
        this.getLastGas();
      }
      await this.sleep(2000);
    }
  }

  sleep(ms) {
    return new Promise( (resolve) => {
      setTimeout(resolve, ms);
    });
  }

  updateTemperature(value) {
    this.environment.temperatureUpdate(value);
  }

  updatePressure(value) {
    this.environment.pressureUpdate(value);
  }

  updateGas(value) {
    this.environment.gasUpdate(value);
  }

  updateHumidity(value) {
    this.environment.humidityUpdate(value);
  }

  updateLight(value) {
    this.environment.lightUpdate(value);
  }

  getLastTemperature() {
    this.envClient.getLastTemperature("temperature", localStorage.getItem("user"), localStorage.getItem("password"), localStorage.getItem("token"), this.getLastTemperatureResult.bind(this));
  }

  getLastTemperatureResult(data, response) {
    if (response.statusCode >= 400) {
      this.setStopTemp(true);
    }
    this.updateTemperature(data.temperature);
  }

  getLastHumidity() {
    this.envClient.getLastHumidity("humidity", localStorage.getItem("user"), localStorage.getItem("password"), localStorage.getItem("token"), this.getLastHumidityResult.bind(this));
  }

  getLastHumidityResult(data, response) {
    if (response.statusCode >= 400) {
      this.setStopHumidity(true);
    }
    this.updateHumidity(data.humidity);
  }

  getLastGas() {
    this.envClient.getLastGas("gas", localStorage.getItem("user"), localStorage.getItem("password"), localStorage.getItem("token"), this.getLastGasResult.bind(this));
  }

  getLastGasResult(data, response) {
    if (response.statusCode >= 400) {
      this.setStopGas(true);
    }
    this.updateGas(data.gas.eco2);
  }

  getLastLight() {
    this.envClient.getLastLight("light", localStorage.getItem("user"), localStorage.getItem("password"), localStorage.getItem("token"), this.getLastLightResult.bind(this));
  }

  getLastLightResult(data, response) {
    this.updateLight(data.light);
  }

  getLastPressure() {
    this.envClient.getLastPressure("pressure", localStorage.getItem("user"), localStorage.getItem("password"), localStorage.getItem("token"), this.getLastPressureResult.bind(this));
  }

  getLastPressureResult(data, response) {
    if (response.statusCode >= 400) {
      this.setStopPressure(true);
    }
    this.updatePressure(data.pressure);
  }
}

export default EnvironmentService;
