class TemperatureRequests {

  constructor(client, apiurl) {
    this.client = client;
    this.apiurl = apiurl;
    this.route = this.apiurl + "{context}/";
    this.registerMethods();
  }

  registerMethods() {
    this.client.registerMethod("getCurrentTemperature", this.route, "GET");
  }

  configureGetRequest() {
    return {
      path: {context: "temperature"},
    };
  }
}

export default TemperatureRequests;
