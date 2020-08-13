const { checkParams } = require("../../managers/parameters");
const e = require("../../errors/exceptions");
require("colors");

class ValorantDebugger {
  constructor(data, type) {
    const h = { data:  data, type: type };
    checkParams(h)
    this.data = data;
    this.type = type;
  }

  debug() {
    //code here lol
  }
}
module.exports = ValorantDebugger;
