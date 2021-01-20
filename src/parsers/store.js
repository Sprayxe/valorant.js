const m = require("../main/debug/messages");
const e = require("../errors/exceptions");
const Currency = require("../../enums/currency");
class StoreParser {
  /**
  * Parses the valorant storefront
  * @param data {object} Data to parse
  * @returns {object} parsed data
  */
  constructor(data, list, debug, isEnabled) {
    this.data = data;
    this.list = list;
    this.debugger = debug;
    this.isEnabled = isEnabled;
  };

  parse() {
    try {
      if (!this.data) this.debugger.error(e.STORE_PARSER_NODATA.message, e.STORE_PARSER_NODATA);
      const shop = {
        Featured: [],
        Bundles: []
      };

      this.debugger.debug(m.ACCOUNT_STOREFRONT_PARSE, "request", this.isEnabled || false);
      for (let itemStack in this.data.FeaturedTheme.Items) {
        if (this.data.FeaturedTheme.Items.length > 0) {
          const item = this.data.FeaturedTheme.Items[itemStack];
          const it = this.getItem(item.Item.ItemID);
          shop.Featured.push(
            {
              id: item.Item.ItemID,
              typeId: item.Item.ItemTypeID,
              name: it ? it.name : "unknown",
              amount: item.Item.Amount,
              cost: item.BasePrice,
              currency: Currency[item.CurrencyID],
              discount: item.DiscountPercent,
              promo: item.IsPromoItem
            }
          );
        }

      };

      for (let itemStack in this.data.FeaturedBundle.Bundle.Items) {
        if (this.data.FeaturedBundle.Bundle.Items.length > 0) {
          const item = this.data.FeaturedBundle.Bundle.Items[itemStack];
          const it = this.getItem(item.Item.ItemID);
          shop.Bundles.push(
            {
              id: item.Item.ItemID,
              typeId: item.Item.ItemTypeID,
              name: it ? it.name : "unknown",
              amount: item.Item.Amount,
              cost: item.BasePrice,
              currency: Currency[item.CurrencyID],
              discount: item.DiscountPercent,
              promo: item.IsPromoItem
            }
          );
        }
      };

      this.debugger.debug(m.ACCOUNT_STOREFRONT_PARSESUCCESS, "request", this.isEnabled || false);
      return shop;
    } catch (err) {
      this.debugger.error(e.ACCOUNT_GETSTOREFRONT_FAIL, err);
    }
  };

  getItem(id) {
    const items = this.list;

    for (let storefrontStack in items) {
      const storefront = items[storefrontStack];

      const item = storefront.find(item => item?.id === id);
      if (item) {
        return item;
      }
    }
  };

};
module.exports = StoreParser;
