module.exports = {
    /** 
     * @param {object} config - The object to check for possible error
     * @param {string} type - Determines if its the Valorant Client constructor or a Request
     */
    checkParams: function(config, type) {
        const ValorantError = require("./Error");

        // Check for right Valorant Client config
        if(type === "client") {
            // Not provided Errors
            if(!config.password) new ValorantError("Account password has not been provided!", "reference");
            if(!config.email) new ValorantError("Account email has not been provided!", "reference");
            if(!config.region) new ValorantError("Account region has not been provided!", "reference");

            // TypeErrors
            if(typeof config.password !== "string") new ValorantError("Account password is not a string!", "type");
            if(typeof config.email !== "string") new ValorantError("Account email is not a string!", "type");
            if(typeof config.region !== "object") new ValorantError("Account region is not an object! Use the Region enums.", "type");
        }
        
        // Check for auth & account before sending request
        if(type === "request") {
          // code
        }
    }
};