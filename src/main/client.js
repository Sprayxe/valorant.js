const region = require("../../enums/regions");
const { AUTH, ENTITLEMENTS } = require("../../resources/endpoints");
const { checkParams } = require("../managers/parameters");
const ValorantError = require("../errors/error");
const axios = require("axios").default;
require("colors");
require("../../typings/index");

class ValorantClient {
  /**
   * @param config {Config}
  */ 
  constructor(config) {
    checkParams(config, "client");
    this.config = config;
    this.debug = config.debug;
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
        /* 
        console.log("[Valorant] Signing into Riot Services...".magenta);
        [send requests here]
        console.log("[Valorant] Signing was successful!".magenta);
        return true;
        */
        return console.log("Oauth is being currently developed! Please be patient.".green)
      } catch(err) {
        new ValorantError(err);
      }
    }


    /**
     * - Sets account information into an object
     * @returns {object} Updated account information in JSON format 
     */
    async refreshAccount() {
      try {
         /* 
         console.log("[Valorant] Refreshing account data...".magenta); 
         checkParams(this, "request")
         [code here]
         console.log("[Valorant] Refreshed account data!".magenta);
         */
         return console.log("Oauth is being currently developed! Please be patient.".green)
      } catch(err) {
        new ValorantError(err);
      }
    }



  // User API's

    /**
     * - Gets the account's balance
     * @returns {object} Valorant and Radianite points
     */
    async getWallet() {
      try { 
        /*
        console.log("[Valorant] Getting account wallet...".magenta);
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
        
        this.account.balance = {
           "Valorant Points":DATA.Balances["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"],
           "Radianite Points":DATA.Balances["e59aa87c-4cbf-517a-5983-6e81511be9b7"]
        };
        console.log("[Valorant] Got account wallet!".magenta);
        return this.account.balance;*/
        return console.log("Oauth is being currently developed! Please be patient.".green)
      } catch(err) {
        new ValorantError(err);
      }
    }

    

  // Information API's


  // Match Information API's
}

module.exports = ValorantClient;
