// Parsers
const StoreParser = require("../../parsers/store");
const ItemParser = require("../../parsers/item");
const MMRParser = require("../../parsers/mmr");
const MatchParser = require("../../parsers/match");
const CompParser = require("../../parsers/match");

// Valorant Contructors
const ValorantDebugger = require("../debug/index");

// Enums
const region = require("../../../enums/regions");

// Resources
const { AUTH, ENTITLEMENTS } = require("../../../resources/endpoints");

// Messages
const e = require("../../errors/exceptions");
const m = require("../debug/messages");

// Modules
require("colors");
const axios = require("axios").default;

// Functions
const { checkParams } = require("../../managers/parameters");

// Typings
require("../../../typings/index.js");

class Client {
  /**
   * @param config {Config}
  */ 
  constructor(config) {
    checkParams(config, "client");
    this.config = config;
    this.debug = config.debug;
    this.debugger = new ValorantDebugger().debug()
    this.Endpoints = {
      BASE: config.region.BASE,
      SHARED: config.region.SHARED,
      AUTH: AUTH,
      ENTITLEMENTS: ENTITLEMENTS
    };
    this.Authorization = null;
    this.account = {
      id: "",
      displayName: "",
      tagLine: "",
      balance: {}
    };
  }

  // Oauth & Account 

    /**
     * - Logs into your valorant account using provided config
     * @returns {object} Returns account info if login was successful
     */
    async login() {
      try {
        console.log("[Valorant] Signing into Riot Services...".magenta);
        const h = await axios({
          method: 'post',
          url: this.Endpoints.AUTH + '/api/v1/authorization',
          headers: {
            "content-type":"application/json",
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36"
          },
          data: {
            "client_id":"play-valorant-web-prod",
            "nonce":"1",
            "redirect_uri":"https://beta.playvalorant.com/opt_in",
            "response_type":"token id_token"
          },
          withCredentials: true,
        });
        const cookies = [];
        const f = (JSON.stringify(h.headers["set-cookie"])).split("=");
        f.forEach(a => {
          const kek = a.replace("[", "").replace(";", "").replace("expires", "").replace("Max-Age", "").replace(",", "").replace("Path", "").replace("\"", "").replace("Lax\"", "").trim();
          cookies.push(kek)
        })
        this.Authorization = { cookies: `__cfduid=${cookies[1]}; did=${cookies[6]}; asid=${cookies[10]}; clid=${cookies[12]}` }

        const loginData = (await axios({
          method: 'put',
          url: this.Endpoints.AUTH + '/api/v1/authorization',
          headers: {
            "content-type":"application/json",
            "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36",
            "cookie":this.Authorization.cookies
          },
          data: {
            "type":"auth",
            "username":`${this.config.username}`,
            "password":`${this.config.password}`
          },
          withCredentials: true,
        })).data;


        let beginning = (JSON.stringify(loginData.response.parameters.uri)).indexOf("access_token=") + 13;
        let end = (JSON.stringify(loginData.response.parameters.uri)).indexOf("&");
        const accessToken = (JSON.stringify(loginData.response.parameters.uri)).substring(beginning, end);

        const entitlementsData = (await axios({
          method: 'post',
          url: this.Endpoints.ENTITLEMENTS + '/api/token/v1',
          headers: {
            "Authorization":`Bearer ${accessToken}`,
            "content-type":"application/json",
          },
          data: {}
        })).data;

        const entitlementsToken = entitlementsData["entitlements_token"]

        this.Authorization = {
          fullToken: `Bearer ${accessToken}`,
          RSOToken: entitlementsToken,
          access_token: accessToken,
          ...this.Authorization
        };
        console.log("[Valorant] Signed in succesfully!".magenta);
        const hhh = await this.refreshAccount();
        return hhh;

      } catch(err) {
        new ValorantError(err, "request")
      }
    }


    /**
     * - Sets account information into an object
     * @returns {object} Updated account information in JSON format 
     */
    async refreshAccount() {
      try {
        checkParams(this, "request")
        console.log("[Valorant] Refreshing account data...".magenta); 

        const userid = (await axios({
          method: "POST",
          url: `${this.Endpoints.AUTH}/userinfo`,
          headers: {
            "Authorization":this.Authorization.fullToken,
            "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
          },
          data: {}
        })).data;
        if(userid.sub === "") {
          console.log("[Valorant] Account data was empty. Please start valorant atleast once to use this library!".magenta);
          return null;
        }
        else {
          const userdata = (await axios({
            method: "PUT",
            url: `${this.Endpoints.BASE}/name-service/v2/players`,
            headers: {
              "Authorization":this.Authorization.fullToken,
              "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
            },
            data: [
              userid.sub
            ]
          })).data;

          this.account.id = userdata[0].Subject;
          this.account.displayName =  userdata[0].GameName;
          this.account.tagLine = userdata[0].TagLine;
            
          };
          console.log("[Valorant] Refreshed account data successfully!".magenta);
          return this.account;
        }catch(err) {
          new ValorantError(err, "request")
      }
         
        
    }



  // User API's

    /**
     * - Gets the account's balance
     * @returns {object} Valorant and Radianite points
     */
    async getWallet() {
      try { 
        
        console.log("[Valorant] Getting account wallet...".magenta);
        checkParams(this, "request");
        if(this.account.id === "") {
          new ValorantError(e.CLIENT_ACCOUNT_NEW, "reference");
          console.log("[Valorant] Could not get wallet!".magenta);
          return
        };

        const DATA = (await axios({
          method: "GET",
          url: `${this.Endpoints.BASE}/store/v1/wallet/${this.account.id}/`,
          headers: {
            "content-type":"application/json",
            "X-Riot-Entitlements-JWT":this.Authorization.RSOToken,
            "Authorization":this.Authorization.fullToken
          }
        })).data;
        
        this.account.balance = {
           "Valorant Points":DATA.Balances["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"],
           "Radianite Points":DATA.Balances["e59aa87c-4cbf-517a-5983-6e81511be9b7"]
        };
        console.log("[Valorant] Got account wallet!".magenta);
        return this.account.balance;
      } catch(err) {
        new ValorantError(err, "request")
      }
    }

    

  // Information API's


  // Match Information API's

    /**
    * - Gets the users last matches
    * @param start {number} start of the entries [optional]
    * @param end {number} end of the entries (max. 20) [optional]
    * @returns {object} Parsed History
    */
    async getMatchHistory(start, end) {
    try {
      checkParams(this, "request");

      console.log("[Valorant] Getting match history...".magenta);

      if(this.account.id === "") {
        new ValorantError(e.CLIENT_ACCOUNT_NEW, "reference");
        console.log("[Valorant] Could not get match history!".magenta);
        return
      };

      const history = (await axios({
        method: "GET",
        url: `${this.Endpoints.BASE}/match-history/v1/history/${this.account.id}?startIndex=${start || 0}&endIndex=${end || 10}`,
        headers: {
         "Authorization":this.Authorization.fullToken,
         "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
        },
        data: {},
      })).data;

      console.log("[Valorant] Got match history! Beginning to parse...".magenta);
      const parser = new MatchParser(history);
      const res = await parser.parse();
      return res;
    } catch(err) {
      new ValorantError(err, "request")
    }
   };

   /**
    * - Gets the users competitive history
    * @param start {number} start of the entries [optional]
    * @param end {number} end of the entries (max. 10) [optional]
    * @returns {object} Parsed History
    */
   async getCompetitiveHistory(start, end) {
     try {
      checkParams(this, "request");
      console.log("[Valorant] Getting competitive history...".magenta);

      if(this.account.id === "") {
        new ValorantError(e.CLIENT_ACCOUNT_NEW, "reference");
        console.log("[Valorant] Could not get competitive history!".magenta);
        return
      };

      const history = (await axios({
        method: "GET",
        url: `${this.Endpoints.BASE}/mmr/v1/players/${this.account.id}/competitiveupdates?startIndex=${start || 0}&endIndex=${end || 10}`,
        headers: {
         "Authorization":this.Authorization.fullToken,
         "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
        },
        data: {},
      })).data;

      console.log("[Valorant] Got competitive history! Beginning to parse...".magenta);
      const parser = new CompParser(history);
      const res = await parser.parse();
      return res;

     } catch(err) {
      new ValorantError(err, "request")
     }
   }
  
}

module.exports = Client;
