const { checkParams } = require("../../helpers/parameters");
require("colors");
//require("../../../typings/index");

class ValorantDebugger {
  constructor(){

  };

  /**
   * @param data {Debugger}
   * @param type {Debugger}
   * @param isEnabled {Debugger}
   */
  debug(data, type, isEnabled) {
    const h = { data:  data, type: type };
    checkParams(h, "debug")

    if(type === "client") console.log(`[Valorant] ${data}`.magenta);

    if(type === "request" && isEnabled === true) console.log(`[Valorant - Debug] ${data}`.magenta)

  };

  /**
   * @param data {Debugger}
   * @param error {Debugger}
   * @returns Error
   */
  error(data="[Valorant] An Error occured!", error) {
    const h = { data: data, error: error };
    checkParams(h, "error");
   
    throw new Error(`{ data: ${JSON.stringify(data)}, error: ${error} }`.red);
  }
}
module.exports = ValorantDebugger;
