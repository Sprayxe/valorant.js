require("colors");

class ValorantError {
    /**
     * @param {string} error - The message of the error
     * @param {string} type - The type of the error
     */
    constructor(error, type) {
        // TypeError
        if(type === "type") throw new TypeError(`VALORANT.JS: ${error}`.red);

        // ReferrenceError
        else if(type === "reference") throw new ReferenceError(`VALORANT.JS: ${error}`.red);

        // SyntaxError
        else if(type === "syntax") throw new SyntaxError(`VALORANT.JS: ${error}`.red);

        // No ErrorType provided
        else throw new Error(`VALORANT.JS: ${error}`.red);
    }
}

module.exports = ValorantError;
