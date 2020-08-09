const URLS = require("../resources/Endpoints");

class ValorantClient {
  constructor(config) {
    this.Authorization = null;
    this.killedToken = false;
    this.Endpoints = URLS;
    this.config = config;
    this.account = null;
  }
}

module.exports = ValorantClient;
