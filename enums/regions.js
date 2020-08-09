const Endpoints = require("../resources/Endpoints");

module.exports = Object.freeze({
  eu: {
    BASE: Endpoints.EUBASE,
    SHARED: Endpoints.EUSHARED
  },
  na: {
    BASE: Endpoints.NABASE,
    SHARED: Endpoints.NASHARED
  },
  ap: {
    BASE: Endpoints.APBASE,
    SHARED: Endpoints.APSHARED
  }
});
