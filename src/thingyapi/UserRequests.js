class UserRequests {
  constructor(client, apiurl) {
    this.client = client;
    this.apiurl = apiurl;
    this.route = this.apiurl + "${context}/";
    this.registerMethods();
  }

  registerMethods() {
    this.client.registerMethod("loginUser", this.route, "POST");
    this.client.registerMethod("logoutUser", this.route, "POST");
    this.client.registerMethod("getUserProfile", this.route+"${login}", "GET");
    this.client.registerMethod("setThingy", this.route, "POST");
    this.client.registerMethod("getUser", this.route, "GET");
    this.client.registerMethod("registerUser", this.route, "POST");
    this.client.registerMethod("deleteUser", this.route, "DELETE");
  }

  loginUser(login, password, f) {
    this.client.methods.loginUser(
      {
        path: {context: "login"},
        data: {login: login, password: password},
        headers: {"Content-Type": "application/json"},
      }, f);
  }

  logoutUser(login, password, f, token) {
    this.client.methods.logoutUser(
      {
        path: {context: "logout"},
        data: {login: login, password: password},
        headers: {"Content-Type": "application/json", authorization: token},
      }, f);
  }

  getUserProfile(login, f, token) {
    this.client.methods.getUserProfile(
      {
        path: {context: "user", login: login},
        headers: {"Content-Type": "application/json", authorization: token},
      }, f);
  }

  setThingy(login, thingy, f, token) {
    this.client.methods.setThingy(
      {
        path: {context: "connect"},
        data: {login: login, thingy_id: thingy},
        headers: {"Content-Type": "application/json", authorization: token},
      }
      , f);
  }

  registerUser(login, password, f) {
    this.client.methods.registerUser( this.configurePostRequest(login, password), f);
  }

  deleteUser(login, password, f, token) {
    this.client.methods.deleteUser( this.configureDeleteRequest(login, password, token), f);
  }

  configureGetRequest(token = null) {
    const args = {
      path: {context: "user"},
      headers: {"Content-Type": "application/json", authorization: token},
    };
    return args;
  }

  configurePostRequest(login, password, token = null) {
    const args = {
      path: {context: "user"},
      data: {login: login, password: password},
      headers: {"Content-Type": "application/json", authorization: token},
    };
    return args;
  }

  configureDeleteRequest(login, password, token) {
    const args = {
      path: {context: "user"},
      data: {login: login, password: password},
      headers: {"Content-Type": "application/json", authorization: token},
    };
    return args;
  }
}

export default UserRequests;


