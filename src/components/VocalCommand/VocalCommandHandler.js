import VocalCommand from "./VocalCommand";
import humidityClient from "../../thingyapi/EnvironmentSensorClient";
import temperatureClient from "../../thingyapi/EnvironmentSensorClient";

class VocalCommandHandler {

  constructor(client) {
    this.commandWords = ["temperature", "humidity"];
  }

  //@todo add promise
  handle(command, resultFunction) {
    if (this.valid(command)) {
      this.execute(command, resultFunction);
    }
    return null;
  }

   execute(command) {

  }

  valid(command) {
    if (this.commandWords.includes(command.toLocaleLowerCase())) {
      return true;
    } else {
      console.log("error, said: " + command.toLocaleString())
      return false;
    }
  }
}

export default VocalCommandHandler;
