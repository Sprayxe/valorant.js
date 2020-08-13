const { checkParams } = require("../../managers/parameters");

class ValorantDebugger {
  constructor(data, type) {
    const h = { data:  data, type: type };
    checkParams(h)
    this.data = data;
    this.type = type;
  }
}
module.exports = ValorantDebugger;