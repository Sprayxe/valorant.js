const ItemParser = require("./item");
const Currency = require("../../enums/currency");
class StoreParser {
  /**
  * Parses the valorant storefront
  * @param data {object} Data to parse
  * @returns {object} parsed data
  */
  constructor(data, list) {
    this.data = data;
    this.list = list;
  };

  parse() {
    const shop = {
      Featured: [],
      Bundles: []
    };

    for(let itemStack in this.data.FeaturedTheme.Items) {
      if(this.data.FeaturedTheme.Items.length > 0) {
      const item = this.data.FeaturedTheme.Items[itemStack];
        shop.Featured.push(
          {
            id: item.Item.ItemID,
            typeId: item.Item.ItemTypeID,
            name: (this.getItem(item.Item.ItemID))?.name,
            amount: item.Item.Amount,
            cost: item.BasePrice,
            currency: Currency[item.CurrencyID],
            discount: item.DiscountPercent,
            promo: item.IsPromoItem
          }
        ); 
      }
         
    };

    for(let itemStack in this.data.FeaturedBundle.Bundle.Items) {
      if(this.data.FeaturedBundle.Bundle.Items.length > 0) {
      const item = this.data.FeaturedBundle.Bundle.Items[itemStack];
        shop.Bundles.push(
          {
            id: item.Item.ItemID,
            typeId: item.Item.ItemTypeID,
            name: (this.getItem(item.Item.ItemID))?.name,
            amount: item.Item.Amount,
            cost: item.BasePrice,
            currency: Currency[item.CurrencyID],
            discount: item.DiscountPercent,
            promo: item.IsPromoItem
          }
        );
      }    
    };

    return shop;
  };

  getItem(id) {
    const items = this.list;
    
    for(let storefrontStack in items) {
      const storefront = items[storefrontStack];

      const item = storefront.find(item => item?.id === id);
      if(item) {
        return item;
      }
    }
  };

};
module.exports = StoreParser;
