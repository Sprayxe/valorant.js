class ItemParser {
  /**
  * Parses the valorant storefront item's
  * @param data {object} Data to parse
  * @returns {object} parsed data
  */
  constructor(data) {
    this.data = data;
  };

  parse() {
    if(this.data.includes("Characters")){
      const characters = this.data.Characters;
      const maps = this.data.Maps;
      const chromas = this.data.Chromas;
      const skins = this.data.Skins;
      const skinLevels = this.data.SkinLevels;
      const attachments = this.data.Attachments;
      const equips = this.data.Equips;
      const themes = this.data.Themes;
      const gameModes = this.data.GameModes;
      const sprays = this.data.Sprays;
      const sprayLevels = this.data.SprayLevels;
      const charms = this.data.Charms;
      const charmLevels = this.data.CharmLevels;
      const playerCards = this.data.PlayerCards;
      const playerTitles = this.data.PlayerTitles;
      const storefrontItems = this.data.StorefrontItems;

      const Characters = [];
      const Maps = [];
      const Chromas = [];
      const Skins = [];
      const SkinLevels = [];
      const Attachments = [];
      const Equips = [];
      const Themes = [];
      const GameModes = [];
      const Sprays = [];
      const SprayLevels = [];
      const Charms = [];
      const CharmLevels = [];
      const PlayerCards = [];
      const PlayerTitles = [];
      const StorefrontItems = [];

      characters.forEach(element => {
          Characters.push(element.Name)
      });
      maps.forEach(element => {
          Maps.push(element.Name)
      });
      chromas.forEach(element => {
          Chromas.push(element.Name)
      });
      skins.forEach(element => {
          Skins.push(element.Name)
      });
      skinLevels.forEach(element => {
          SkinLevels.push(element.Name)
      });
      attachments.forEach(element => {
          Attachments.push(element.Name)
      });
      equips.forEach(element => {
          Equips.push(element.Name)
      });
      themes.forEach(element => {
          Themes.push(element.Name)
      });
      gameModes.forEach(element => {
          GameModes.push(element.Name)
      });
      sprays.forEach(element => {
          Sprays.push(element.Name)
      });
      sprayLevels.forEach(element => {
          SprayLevels.push(element.Name)
      });
      charms.forEach(element => {
          Charms.push(element.Name)
      });
      charmLevels.forEach(element => {
          CharmLevels.push(element.Name)
      });
      playerCards.forEach(element => {
          PlayerCards.push(element.Name)
      });
      playerTitles.forEach(element => {
          PlayerTitles.push(element.Name)
      });
      storefrontItems.forEach(element => {
          StorefrontItems.push(element.Name)
      });

      const AllItems = {
          characters: Characters,
          maps: Maps,
          chromas: Chromas,
          skins: Skins,
          skinLevels: SkinLevels,
          attachments: Attachments,
          equips: Equips,
          themes: Themes,
          gamemodes: GameModes,
          sprays: Sprays,
          sprayLevels: SprayLevels,
          charms: Charms,
          charmLevels: CharmLevels,
          playerCards: PlayerCards,
          playerTitles: PlayerTitles,
          storefrontItems: StorefrontItems
      };

      return AllItems;
    };
  };

};
module.exports = ItemParser;
