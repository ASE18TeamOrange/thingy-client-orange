class UserRequests {
  constructor(client, apiurl) {
    this.client = client;
    this.apiurl = apiurl;
    this.route = this.apiurl + "{context}/";
    this.registerMethods();
  }

  registerMethods() {
    this.client.registerMethod("getUser", this.route, "GET");
    this.client.registerMethod("registerUser", this.route, "POST");
    this.client.registerMethod("deleteUser", this.route, "DELETE");
  }

  registerUser(username, password, f) {
    this.client.methods.registerUser( this.configurePostRequest(username, password), f);
  }

  deleteUser(username, password, f) {
    this.client.methods.deleteUser( this.configureDeleteRequest(username, password), f);
  }

  configureGetRequest() {
    const args = {
      path: {context: "user"},
      headers: {"Content-Type": "application/json"},
    };
    return args;
  }

  configurePostRequest(user, password) {
    const args = {
      path: {context: "user"},
      data: {username: user, password: password},
      headers: {"Content-Type": "application/json"},
    };
    return args;
  }

  configureDeleteRequest(user, password) {
    const args = {
      path: {context: "user"},
      data: {username: user, password: password},
      headers: {"Content-Type": "application/json"},
    };
    return args;
  }
}

export default UserRequests;


