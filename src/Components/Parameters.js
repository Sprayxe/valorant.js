module.exports = {
    /** 
     * @param {object} config - The object to check for possible error
     * @param {string} type - Determines if its the Valorant Client constructor or a Request
     */
    checkParams: function(data, type) {
        const ValorantError = require("./Error");
        const Exception = require("../../resources/Exceptions");

        // Check for right Valorant Client config
        if(type === "client") {
            // ReferenceErrors
            if(!data.password) new ValorantError("Account password has not been provided!", "reference");
            if(!data.email) new ValorantError("Account email has not been provided!", "reference");
            if(!data.region) new ValorantError("Account region has not been provided!", "reference");

            // TypeErrors
            if(typeof data.password !== "string") new ValorantError("Account password is not a string!", "type");
            if(typeof data.email !== "string") new ValorantError("Account email is not a string!", "type");
            if(typeof data.region !== "object" || !data.region.BASE) new ValorantError("Account region is not an object! Use the Region enums.", "type");
        }
        
        // Check for auth & account before sending request
        if(type === "request") {
          if(data.Authorization === null || !data.Authorization.fullToken || !data.Authorization.RSOToken) new ValorantError("You are not properly authorized! Please login first.", "syntax");
          if(data.account === null || !data.account.id) new ValorantError("You are not properly authorized. Please login first.", "syntax");
        }
    }
};
