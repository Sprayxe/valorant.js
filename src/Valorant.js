const region = require("../enums/regions");
const { AUTH, ENTITLEMENTS } = require("../resources/Endpoints");

class ValorantClient {
  /**
   * @param {*} config - Set up your account and region for the correct use
   * @param {string} config.email - Email of your account
   * @param {string} config.password - Password of your account
   * @param {Object} config.region - Region of your account, use region enums!
   */
  constructor(config) {
    this.config = config;
    this.Endpoints = config.region,
    this.Authorization = null;
    this.killedSession = false;
    this.account = null;
  }
  
  // [COMING SOON]
}

module.exports = ValorantClient;
