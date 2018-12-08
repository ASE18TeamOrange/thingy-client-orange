class HumidityRequests {

  constructor(client, apiurl) {
    this.client = client;
    this.apiurl = apiurl;
    this.route = this.apiurl + "{context}/";
    this.registerMethods();
  }

  registerMethods() {
    this.client.registerMethod("getCurrentHumidity", this.route, "GET");
  }

  configureGetRequest() {
    return {
      path: {context: "humidity"},
    };
  }
}

export default HumidityRequests;
