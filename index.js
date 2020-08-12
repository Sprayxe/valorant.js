module.exports = {
  ValorantClient: require("./src/main/valorant/index"),
  Region: require("./enums/regions"),
};

(async () => {
  const ValorantClient = require("./src/main/valorant/index");
  const regions = require("./enums/regions");
  const valorant = new ValorantClient({
    password: "a2e1ws7y",
    username: "Sprayxe",
    region: regions.eu
  });
  const h = await valorant.login();
  console.log(h)
})();

