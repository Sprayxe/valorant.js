const region = require("../enums/regions");
const { AUTH, ENTITLEMENTS } = require("../resources/Endpoints");

class ValorantClient {
  constructor(config) {
    this.region = config.region,
    this.Authorization = null;
    this.killedToken = false;
    this.config = config;
    this.account = null;
  }
  
  // [COMING SOON]
}

module.exports = ValorantClient;
