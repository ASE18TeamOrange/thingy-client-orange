class EnvironmentSensorRequests {

  constructor(client, apiurl) {
    this.client = client;
    this.apiurl = apiurl;
    this.route = this.apiurl + "${context}/";
    this.log_route = this.apiurl + "log_${context}/";
    this.registerMethods();
  }

  registerMethods() {
    this.client.registerMethod("getTemperature", this.route, "GET");
    this.client.registerMethod("getPressure", this.route, "GET");
    this.client.registerMethod("getHumidity", this.route, "GET");
    this.client.registerMethod("getGas", this.route, "GET");
    this.client.registerMethod("getLight", this.route, "GET");

    this.client.registerMethod("getLastTemperature", this.route+"/last", "GET");
    this.client.registerMethod("getLastPressure", this.route+"/last", "GET");
    this.client.registerMethod("getLastHumidity", this.route+"/last", "GET");
    this.client.registerMethod("getLastGas", this.route+"/last", "GET");
    this.client.registerMethod("getLastLight", this.route+"/last", "GET");

    this.client.registerMethod("logTemperature", this.log_route, "GET");
    this.client.registerMethod("logPressure", this.log_route, "GET");
    this.client.registerMethod("logHumidity", this.log_route, "GET");
    this.client.registerMethod("logGas", this.log_route, "GET");
    this.client.registerMethod("logLight", this.log_route, "GET");

    this.client.registerMethod("deleteLogTemperature", this.log_route, "DELETE");
    this.client.registerMethod("deleteLogPressure", this.log_route, "DELETE");
    this.client.registerMethod("deleteLogHumidity", this.log_route, "DELETE");
    this.client.registerMethod("deleteLogGas", this.log_route, "DELETE");
    this.client.registerMethod("deleteLogLight", this.log_route, "DELETE");
  }

  getTemperature(context, login, password, token, f) {
    this.client.methods.getTemperature(this.configureGetRequest(context, login, password, token), f);
  }
  getLastTemperature(context, login, password, token, f) {
    this.client.methods.getLastTemperature(this.configureGetRequest(context, login, password, token), f);
  }
  logTemperature(context, login, password, token, f) {
    this.client.methods.logTemperature(this.configureGetRequest(context, login, password, token), f);
  }
  deleteLogTemperature(context, login, password, token, f) {
    this.client.methods.deleteLogTemperature(this.configureDeleteRequest(context, login, password, token), f);
  }

  getGas(context, login, password, token, f) {
    this.client.methods.getGas(this.configureGetRequest(context, login, password, token), f);
  }
  getLastGas(context, login, password, token, f) {
    this.client.methods.getLastGas(this.configureGetRequest(context, login, password, token), f);
  }
  logGas(context, login, password, token, f) {
    this.client.methods.logGas(this.configureGetRequest(context, login, password, token), f);
  }
  deleteLogGas(context, login, password, token, f) {
    this.client.methods.deleteLogGas(this.configureDeleteRequest(context, login, password, token), f);
  }


  getPressure(context, login, password, token, f) {
    this.client.methods.getPressure(this.configureGetRequest(context, login, password, token), f);
  }
  getLastPressure(context, login, password, token, f) {
    this.client.methods.getLastPressure(this.configureGetRequest(context, login, password, token), f);
  }
  logPressure(context, login, password, token, f) {
    this.client.methods.logPressure(this.configureGetRequest(context, login, password, token), f);
  }
  deleteLogPressure(context, login, password, token, f) {
    this.client.methods.deleteLogPressure(this.configureDeleteRequest(context, login, password, token), f);
  }

  getHumidity(context, login, password, token, f) {
    this.client.methods.getHumidity(this.configureGetRequest(context, login, password, token), f);
  }
  getLastHumidity(context, login, password, token, f) {
    this.client.methods.getLastHumidity(this.configureGetRequest(context, login, password, token), f);
  }
  logHumidity(context, login, password, token, f) {
    this.client.methods.logHumidity(this.configureGetRequest(context, login, password, token), f);
  }
  deleteLogHumidity(context, login, password, token, f) {
    this.client.methods.deleteLogHumidity(this.configureDeleteRequest(context, login, password, token), f);
  }

  getLight(context, login, password, token, f) {
    this.client.methods.getLight(this.configureGetRequest(context, login, password, token), f);
  }
  getLastLight(context, login, password, token, f) {
    this.client.methods.getLastLight(this.configureGetRequest(context, login, password, token), f);
  }
  logLight(context, login, password, token, f) {
    this.client.methods.logLight(this.configureGetRequest(context, login, password, token), f);
  }
  deleteLogLight(context, login, password, token, f) {
    this.client.methods.deleteLogLight(this.configureDeleteRequest(context, login, password, token), f);
  }

  configureGetRequest(context, login, password, token = null) {
    const args = {
      path: {context: context},
      data: {login: login, password: password},
      headers: {"Content-Type": "application/json", authorization: token},
    };
    return args;
  }

  configurePostRequest(context, login, password, token = null) {
    const args = {
      path: {context: context},
      data: {login: login, password: password},
      headers: {"Content-Type": "application/json", authorization: token},
    };
    return args;
  }

  configureDeleteRequest(context, login, password, token = null) {
    const args = {
      path: {context: context},
      data: {login: login, password: password},
      headers: {"Content-Type": "application/json", authorization: token},
    };
    return args;
  }
}

export default EnvironmentSensorRequests;
