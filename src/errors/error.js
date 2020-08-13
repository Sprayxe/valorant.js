require("colors");

class ValorantError {
    /**
     * @param {string} error - The message of the error
     * @param {string} type - The type of the error
     */
    constructor(error, type) {
        // TypeError
        if(type === "type") throw new TypeError(`[Valorant - Error] ${error.type}: { message: ${error.message}, code: ${error.code} }`.red);

        // ReferrenceError
        else if(type === "reference") throw new ReferenceError(`[Valorant - Error] ${error.type}: { message: ${error.message}, code: ${error.code} }`.red);

        // SyntaxError
        else if(type === "syntax") throw new SyntaxError(`[Valorant - Error] ${error.type}: { message: ${error.message}, code: ${error.code} }`.red);

        // RequestError
        else if(type === "request") throw new Error(`[Valorant - Error] : ${error}`.red);
    }
}

module.exports = ValorantError;
