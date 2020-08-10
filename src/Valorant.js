const region = require("../enums/regions");
const { AUTH, ENTITLEMENTS } = require("../resources/Endpoints");

class ValorantClient {
  /**
   * @property {string} password Password of your account
   * @property {string} email Email of your account
   * @property {Object} region Region of your account. MUST BE AN OBJECT, therefore use the enums
   */
  constructor(config) {
    this.Endpoints = config.region,
    this.Authorization = null;
    this.killedToken = false;
    this.config = config;
    this.account = null;
  }
  
  // [COMING SOON]
}

module.exports = ValorantClient;
