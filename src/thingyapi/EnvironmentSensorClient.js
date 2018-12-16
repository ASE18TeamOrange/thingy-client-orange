import EnvironmentSensorRequests from "./EnvironmentSensorRequests";

const Client = require("node-rest-client").Client;
const client = new Client();
const apiurl = "http://localhost:8081/";
const environmentSensorClient = new EnvironmentSensorRequests(client, apiurl);

export default environmentSensorClient;
