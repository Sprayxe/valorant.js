module.exports = {
    /** 
     * @param {object} config - The object to check for possible error
     * @param {string} type - Determines if its the Valorant Client constructor or a Request
     */
    checkParams: function(data, type) {
        const ValorantError = require("../errors/error");
        const e = require("../errors/exceptions");

        // Check for right Valorant Client config
        if(type === "client") {
            // ReferenceErrors
            if(!data.password) new ValorantError(e.ACCOUNT_PASSWORD_MISSING, "reference");
            if(!data.username) new ValorantError(e.ACCOUNT_USERNAME_MISSING, "reference");
            if(!data.region) new ValorantError(e.ACCOUNT_REGION_MISSING, "reference");

            // TypeErrors
            if(typeof data.password !== "string") new ValorantError(e.ACCOUNT_PASSWORD_TYPE, "type");
            if(typeof data.username !== "string") new ValorantError(e.ACCOUNT_USERNAME_TYPE, "type");
            if(typeof data.region !== "object" || !data.region.BASE) new ValorantError(e.ACCOUNT_REGION_TYPE, "type");
        }
        
        // Check for auth & account before sending request
        if(type === "request") {
         // Auth missing
          if(data.Authorization === null) new ValorantError(e.CLIENT_AUTHORIZATION_MISSING, "reference")
          if(!data.Authorization.RSOToken) new ValorantError(e.CLIENT_RSOTOKEN_MISSING, "reference")
          if(!data.Authorization.fullToken) new ValorantError(e.CLIENT_BEARER_MISSING, "reference");

         // Account missing
         // if(data.account === null) new ValorantError(e.CLIENT_ACCOUNT_NULL, "reference");
          //if(!data.account.id) new ValorantError(e.CLIENT_ACCOUNTID_MISSING, "reference")
        }

        // Check if debugging is enabled or just forced
        if(type === "debug") {
            // ReferenceErrors
            if(!data.data) new ValorantError(e.DEBUG_DATA_MISSING, "reference");
            if(!data.type) new ValorantError(e.DEBUG_TYPE_MISSING, "reference");

            // TypeErrors
            if(typeof data.data !== "string") new ValorantError(e.DEBUG_DATA_TYPE, "type");
            if(typeof data.type !== "string") new ValorantError(e.DEBUG_TYPE_TYPE, "type");

            // SyntaxErrors
            if(data.type.toLowerCase() !== "request" && data.type.toLowerCase() !== "client") new ValorantError(e.DEBUG_TYPE_INVALID, "syntax");

            
        }
    }
};
