import UserRequests from "./UserRequests";

const Client = require("node-rest-client").Client;
const client = new Client();
const apiurl = "http://localhost:8081/";
const userClient = new UserRequests(client, apiurl);

export default userClient;
