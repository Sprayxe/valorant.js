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
    if(JSON.stringify(this.data).includes("Characters")){
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
          if(element)
            Characters.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      maps.forEach(element => {
        if(element)
          Maps.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      chromas.forEach(element => {
        if(element)
          Chromas.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      skins.forEach(element => {
        if(element)
          Skins.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      skinLevels.forEach(element => {
        if(element)
          SkinLevels.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      attachments.forEach(element => {
        if(element)
          Attachments.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      equips.forEach(element => {
        if(element)
          Equips.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      themes.forEach(element => {
        if(element)
          Themes.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      gameModes.forEach(element => {
        if(element)
          GameModes.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      sprays.forEach(element => {
        if(element)
          Sprays.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      sprayLevels.forEach(element => {
        if(element)
          SprayLevels.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      charms.forEach(element => {
        if(element)
          Charms.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      charmLevels.forEach(element => {
        if(element)
          CharmLevels.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      playerCards.forEach(element => {
        if(element)
          PlayerCards.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      playerTitles.forEach(element => {
        if(element)
          PlayerTitles.push({ name: element.Name, id: element.ID.toLowerCase() });
      });
      storefrontItems.forEach(element => {
        if(element)
          StorefrontItems.push({ name: element.Name, id: element.ID.toLowerCase() });
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
    } 
    else if(JSON.stringify(this.data).includes("Subject")) {
        const Subject = this.data.Subject;
        const Version = this.data.Version;
        const guns = this.data.Guns;
        const sprays = this.data.Sprays;
        const playerCard = this.data.PlayerCard;
        const playerTitle = this.data.PlayerTitle;
        const GunSkins = {
            Odin: guns.substr(guns.indexOf('63e6c2b6-4a8e-869c-3d4c-e38355226584')+48, 36),
            Ares: guns.substr(guns.indexOf('55d8a0f4-4274-ca67-fe2c-06ab45efdf58')+48, 36),
            Vandal: guns.substr(guns.indexOf('9c82e19d-4575-0200-1a81-3eacf00cf872')+48, 36),
            Bulldog: guns.substr(guns.indexOf('ae3de142-4d85-2547-dd26-4e90bed35cf7')+48, 36),
            Phantom: guns.substr(guns.indexOf('ee8e8d15-496b-07ac-e5f6-8fae5d4c7b1a')+48, 36),
            Judge: guns.substr(guns.indexOf('ec845bf4-4f79-ddda-a3da-0db3774b2794')+48, 36),
            Bucky: guns.substr(guns.indexOf('910be174-449b-c412-ab22-d0873436b21b')+48, 36),
            Frenzy: guns.substr(guns.indexOf('44d4e95c-4157-0037-81b2-17841bf2e8e3')+48, 36),
            Classic: guns.substr(guns.indexOf('29a0cfab-485b-f5d5-779a-b59f85e204a8')+48, 36),
            Ghost: guns.substr(guns.indexOf('1baa85b4-4c70-1284-64bb-6481dfc3bb4e')+48, 36),
            Sheriff: guns.substr(guns.indexOf('e336c6b8-418d-9340-d77f-7a9e4cfe0702')+48, 36),
            Shorty: guns.substr(guns.indexOf('42da8ccc-40d5-affc-beec-15aa47b42eda')+48, 36),
            Operator: guns.substr(guns.indexOf('a03b24d3-4319-996d-0f8c-94bbfba1dfc7')+48, 36),
            Guardian: guns.substr(guns.indexOf('4ade7faa-4cf1-8376-95ef-39884480959b')+48, 36),
            Marshal: guns.substr(guns.indexOf('c4883e50-4494-202c-3ec3-6b8a9284f00b')+48, 36),
            Spectre: guns.substr(guns.indexOf('462080d1-4035-2937-7c09-27aa2a5c27a7')+48, 36),
            Stinger: guns.substr(guns.indexOf('f7e1b454-4ad4-1063-ec0a-159e56b58941')+48, 36),
            Melee: guns.substr(guns.indexOf('2F59173C-4BED-B6C3-2191-DEA9B58BE9C7')+48, 36),
        };
        const PlayerInventory = {
            Subject: Subject,
            Version: Version,
            GunSkins: GunSkins,
            PlayerCard: playerCard["ID"],
            PlayerTitle: playerTitle["ID"]
        }
        return PlayerInventory;
    }
  };

};
module.exports = ItemParser;
