// Parsers
const StoreParser = require("../../parsers/store");
const ItemParser = require("../../parsers/item");
const MMRParser = require("../../parsers/mmr");
const MatchParser = require("../../parsers/match");
const CompParser = require("../../parsers/match");

// Valorant Contructors
const ValorantDebugger = require("../debug/index");

// Resources
const { AUTH, ENTITLEMENTS } = require("../../../resources/Endpoints");

// Messages
const e = require("../../errors/exceptions");
const m = require("../debug/messages");

// Modules
require("colors");
const axios = require("axios").default;

// Functions
const { checkParams } = require("../../helpers/parameters");

// Enums
const Currency = require("../../../enums/currency");

// Typings
require("../../../typings/index.js");

class Client {
  /**
   * @param config {Config}
  */ 
  constructor(config) {
    checkParams(config, "client");
    this.config = config;
    this.debug = config.debug || false;
    this.debugger = new ValorantDebugger();
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
        this.debugger.debug(m.CLIENT_SIGNIN_START, "client", this.debug);
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
        this.debugger.debug(m.CLIENT_SIGNIN_SUCCESS, "client", this.debug);
        const hhh = await this.refreshAccount();
        return hhh;

      } catch(err) {
        this.debugger.error(e.CLIENT_SIGNIN_FAIL, err);
      }
    }

    /**
     * - Logs out of valorant account
     * @returns {boolean} Returns true if it was successful
     */

    async logout() {
      // code here lol
    }


    /**
     * - Sets account information into an object
     * @returns {object} Updated account information in JSON format 
     */
    async refreshAccount() {
      try {
        checkParams(this, "request")
        this.debugger.debug(m.ACCOUNT_REFRESH_START, "client", this.debug);

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
          this.debugger.debug(m.ACCOUNT_REFRESH_SUCCESS, "client", this.debug);
          return this.account;
        }catch(err) {
          this.debugger.error(e.ACCOUNT_REFRESH_FAIL, err);
      }
         
        
    }



  // User API's

    /**
     * - Gets the account's balance
     * @returns {object} Valorant and Radianite points
     */
    async getWallet() {
      try { 
        
        this.debugger.debug(m.ACCOUNT_GETWALLET_START, "request", this.debug);
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
          ValorantPoints:DATA.Balances["85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741"],
          RadianitePoints:DATA.Balances["e59aa87c-4cbf-517a-5983-6e81511be9b7"]
        };
        this.debugger.debug(m.ACCOUNT_GETWALLET_SUCCESS, "request", this.debug);
        return this.account.balance;
      } catch(err) {
        this.debugger.error(e.ACCOUNT_GETWALLET_FAIL, err);
      }
    }

    /**
    * - Gets the users inventory
    * @returns {object} Parsed Inventory
    */
    async getPlayerInventory() {
      try {
        const items = (await axios({
          method: "GET",
          url: `${this.Endpoints.BASE}/personalization/v2/players/${this.account.id}/playerloadout`,
          headers: {
            "Authorization":`${this.Authorization.fullToken}`,
            "X-Riot-Entitlements-JWT":`${this.Authorization.RSOToken}`
          },
          json: true
        })).data;
        const parser = new ItemParser(items);
        const playerInventory = await parser.parse();
        return playerInventory;
      } catch(err) {
        this.debugger.error(e.GET_PLAYER_INVENTORY_FAIL, err);
      }
    }

    /**
     * - Gets the users store
     * @param {boolean} parse - Set this to false if you want the raw response
     * @returns {object} Storefront
     */
    async getStorefront(parse) {
      try {

        const store = (await axios({
          method: "GET",
          url: `${this.Endpoints.BASE}/store/v2/storefront/${this.account.id}`,
          headers: {
            "Authorization": this.Authorization.fullToken,
            "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
          },
        })).data;

        if(parse === false) return store;

        const parser = new StoreParser(store, await this.getAllItems());
        const storefront = parser.parse();
        return storefront;
        
      } catch(err) {
        console.log(err)
        //this.debugger.error(e.ACCOUNT_GETSTOREFRONT_FAIL, err);
      }
    }

    

  // Information API's
  
  /**
   * - Gets the current story contract
   * @returns {object} - contract data
  */
  async getStoryContract() {
    try {
      checkParams(this, "request");
      this.debugger.debug(m.INFO_GETCONTRACT_START, "request", this.debug);
    
      const res = (await axios({
        method: "GET",
        url: `${this.Endpoints.BASE}/contract-definitions/v2/definitions/story`,
        headers: {
        "Authorization":this.Authorization.fullToken,
        "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
        }
      })).data;
    
       this.debugger.debug(m.INFO_GETCONTRACT_SUCCESS, "request", this.debug);
       return res;
      
    } catch(err) {
      this.debugger.error(e.INFO_GETCONTACT_FAIL, err)
    }
  }


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

      this.debugger.debug(m.MATCH_MATCHHISTORY_START, "request", this.debug);

      if(this.account.id === "") {
        this.debugger.debug(e.CLIENT_ACCOUNT_NEW, "client", this.debug);
        return
      };

      const history = (await axios({
        method: "GET",
        url: `${this.Endpoints.BASE}/match-history/v1/history/${this.account.id}?startIndex=${start || 0}&endIndex=${end || 10}`,
        headers: {
         "Authorization":this.Authorization.fullToken,
         "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
        }
      })).data;

      this.debugger.debug(`${m.MATCH_MATCHHISTORY_SUCCESS} ${m.MATCH_MATCHHISTORY_PARSE}`, "request", this.debug);
      const res = await new MatchParser(this.debugger, this.debug).parse(history);
      return res;
    } catch(err) {
      this.debugger.error(e.MATCH_MATCHHISTORY_FAIL, err);
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
      this.debugger.debug(m.MATCH_COMPHISTORY_START, "request", this.debug);

      if(this.account.id === "") {
        this.debugger.debug(e.CLIENT_ACCOUNT_NEW, "client", this.debug);
        return
      };

      const history = (await axios({
        method: "GET",
        url: `${this.Endpoints.BASE}/mmr/v1/players/${this.account.id}/competitiveupdates?startIndex=${start || 0}&endIndex=${end || 10}`,
        headers: {
         "Authorization":this.Authorization.fullToken,
         "X-Riot-Entitlements-JWT":this.Authorization.RSOToken
        }
      })).data;

      this.debugger.debug(`${m.MATCH_COMPHISTORY_SUCCESS} ${m.MATCH_COMPHISTORY_PARSE}`, "request", this.debug);
      const res = await new MatchParser(this.debugger, this.debug).parse(history);
      this.debugger.debug(m.MATCH_COMPHISTORY_PARSESUCCESS, "request", this.debug);
      return res;

     } catch(err) {
      this.debugger.error(e.MATCH_COMPHISTORY_FAIL, err);
     }
   }

   /**
    * - Gets all items in the game
    * @returns {object} Parsed Game Items
    */
   async getAllItems(){
    try{
       const items = (await axios({
         method: "GET",
         url: `${this.Endpoints.SHARED}/content-service/v2/content`,
         headers: {
           "Authorization":`${this.Authorization.fullToken}`,
           "X-Riot-Entitlements-JWT":`${this.Authorization.RSOToken}`,
           "X-Riot-ClientVersion":"release-01.07-shipping-15-467525"
         },
         json: true
       })).data;
       const parser = new ItemParser(items);
       const allItems = await parser.parse();
       return allItems;
    } catch(err) {
      this.debugger.error(e.GET_ALL_ITEMS_FAIL, err);
    }
  }
  
}

module.exports = Client;