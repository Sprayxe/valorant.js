const region = require("../../enums/regions");
const { AUTH, ENTITLEMENTS } = require("../../resources/Endpoints");
const { checkParams } = require("../Functions/checkParams");
const ValorantError = require("../Functions/Error");
const axios = require("axios").default;
require("colors");

/**
 * @typedef {object} Config
 * @property {string} email - Email of your account
 * @property {string} password - Password of your account
 * @property {object} region - Region of your account, use region enums!
 */

class ValorantClient {
  /**
   * @param config {Config}
  */ 
  constructor(config) {
    checkParams(config, "client");
    this.config = config;
    this.Endpoints = config.region,
    this.Authorization = null;
    this.killedSession = false;
    this.account = null;
  }

  // Oauth & Account 

    /**
     * - Logs into your valorant account using provided config
     * @returns {boolean} Return true if login was successful
     */
    async login() {
      try {
        return console.log("Oauth is being currently developed! Please be patient.".green)
      } catch(err) {

      }
    }


    /**
     * - Sets account information into an object
     * @returns {object} Updated account information in JSON format 
     */
    async setAccount() {
      try {

      } catch(err) {

      }
    }



  // User API's

    /**
     * - Gets the account's balance
     * @returns {object} Valorant and Radianite points
     */
    async getWallet() {
      try { 
        checkParams(this, "request")

        const DATA = (await axios({
          method: "GET",
          url: `${this.Endpoints.BASE}/store/v1/wallet/${this.account.id}`,
          auth: this.Authorization.fullToken,
          headers: {
            "content-type":"application/json",
            "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
          }
        })).data;
        const vlpoints = Object.keys("")
        const 
        return DATA;
      } catch(err) {

      }
    }

    

  // Information API's


  // Match Information API's
}

module.exports = ValorantClient;