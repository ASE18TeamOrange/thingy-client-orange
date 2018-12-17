import envClient from "../../thingyapi/EnvironmentSensorClient";

class VocalCommandHandler {
  constructor() {
    this.client = envClient;
    this.commandWords = ["test", "average temperature",
      "temperature on",
      "temperature off",
      "temperature of",
      "average humidity",
      "humidity off",
      "humidity of",
      "humidity on",
      "average gas",
      "gas off",
      "gas of",
      "gas on",
      "pressure on",
      "average pressure",
      "pressure off",
      "pressure of",
    ];
  }

  handle(command, login, password, token, callback) {
    this.execute(command, login, password, token, callback);
  }

  async execute(command, login, password, token, f) {
    const someObject = String(command);
    const someString = someObject.toString();
    switch (someString) {
    case "test": this.client.getTemperature("temperature", login, password, token, f.averageTemp.bind(f)); break;
    case "average temperature": this.client.getTemperature("temperature", login, password, token, f.averageTemp.bind(f)); break;
    case "temperature on": this.client.logTemperature("temperature", login, password, token, f.logTemperature.bind(f)); break;
    case "temperature off": f.tempOff(); break;
    case "temperature of": f.tempOff(); break;
    case "pressure off": f.pressureOff(); break;
    case "pressure of": f.pressureOff(); break;
    case "gas off": f.gasOff(); break;
    case "gas of": f.gasOff(); break;
    case "humidity off": f.humidityOff(); break;
    case "humidity of": f.humidityOff(); break;
    case "average humidity": this.client.getHumidity("humidity", login, password, token, f.averageHumidity.bind(f)); break;
    case "humidity on": this.client.logHumidity("humidity", login, password, token, f.logHumidity.bind(f)); break;
    case "average gas": this.client.getGas("gas", login, password, token, f.averageGas.bind(f)); break;
    case "gas on": this.client.logGas("gas", login, password, token, f.logGas.bind(f)); break;
    case "pressure on": this.client.logPressure("pressure", login, password, token, f.logPressure.bind(f)); break;
    case "average pressure": this.client.getPressure("pressure", login, password, token, f.averagePressure.bind(f)); break;
    default: console.log("did not got the command"); break;
    }
  }

  valid(command) {
    if (command === null || command === "") return false;
    let index;
    for (index = 0; index < this.commandWords.length; index++) {
      if (this.commandWords[index] === command) return true;
    }
    //console.log("error, command is: " + command);
    return false;
  }
}

export default VocalCommandHandler;
