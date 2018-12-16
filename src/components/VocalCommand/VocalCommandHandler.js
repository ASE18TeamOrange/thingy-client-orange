import client from "../../thingyapi/EnvironmentSensorClient";

class VocalCommandHandler {
  constructor() {
    this.client = client.environmentSensorClient;
    this.commandWords = ['test', 'get temperature',
      'last temperature',
      'log temperature',
      'delete log temperature',
      'get humidity',
      'last humidity',
      'log humidity',
      'delete log humidity',
      'get gas',
      'last gas',
      'log gas',
      'delete log gas',
      'get light',
      'last light',
      'log light',
      'delete log light'];
  }

  // @todo add promise
  handle(command, login, password, token, f) {
    this.execute(command, login, password, token, f);
  }

  execute(command, login, password, token, f) {
    console.log("execute: " + command);
    const someObject = String(command);
    const someString = someObject.toString();
    switch (someString) {
    case "test": this.client.getTemperature(login, password, token, f); break;
    case "get temperature": this.client.getTemperature(login, password, token, f); break;
    case "last temperature": this.client.getLastTemperature(login, password, token, f); break;
    case "log temperature": this.client.logTemperature(login, password, token, f); break;
    case "delete log temperature": this.client.deleteLogTemperature(login, password, token, f); break;
    case "get humidity": this.client.getHumidity(login, password, token, f); break;
    case "last humidity": this.client.getLastHumidity(login, password, token, f); break;
    case "log humidity": this.client.logHumidity(login, password, token, f); break;
    case "delete log humidity": this.client.deleteLogHumidity(login, password, token, f); break;
    case "get gas": this.client.getGas(login, password, token, f); break;
    case "last gas": this.client.getLastGas(login, password, token, f); break;
    case "log gas": this.client.getGas(login, password, token, f); break;
    case "delete log gas": this.client.deleteLogGas(login, password, token, f); break;
    case "get light": this.client.getLight(login, password, token, f); break;
    case "last light": this.client.getLastLight(login, password, token, f); break;
    case "log light": this.client.logLight(login, password, token, f); break;
    case "delete log light": this.client.deleteLogLight(login, password, token, f); break;
    default: console.log("got problem in switch"); break;
    }
  }

  valid(command) {
    if (command === null || command === "") return false;
    let index;
    for (index = 0; index < this.commandWords.length; index++) {
      if (this.commandWords[index] === command) return true;
    }
    console.log("error, command is: " + command);
    return false;
  }
}

export default VocalCommandHandler;
