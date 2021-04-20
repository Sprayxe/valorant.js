import { IStorefront } from "../models/IStorefront";
import { IStorefrontParsed } from "../models/IStorefrontParsed";
import Currency from "../resources/Currency";
import { IStoreOffer } from "../models/IStoreOffers";

export class StoreParser {
    data: IStorefront
    contentList: any[]
    offerList: IStoreOffer[]

    constructor(data: IStorefront, contentList: any, offerList: IStoreOffer[]) {
        this.data = data;
        this.contentList = contentList;
        this.offerList = offerList;
    }

    parse(): IStorefrontParsed {
        const featured = [];
        const bonus = [];
        const skins = [];

        const featuredBundle = this.data.FeaturedBundle;
        if (featuredBundle && featuredBundle.Bundle) {
            featuredBundle.Bundle.Items.forEach(item => {
                const it = this.getItem(item.Item.ItemID);
                featured.push({
                    id: item.Item.ItemID,
                    typeId: item.Item.ItemTypeID,
                    name: it ? it.item.name : "Unknown",
                    quantity: item.Item.Amount,
                    cost: { name: Currency[item.CurrencyID], id: item.CurrencyID, amount: item.BasePrice },
                    discount: item.DiscountPercent,
                    isPromoItem: item.IsPromoItem
                })
            });
        }

        const bonusStore = this.data.BonusStore;
        if (bonusStore && bonusStore.BonusStoreOffers) {
            bonusStore.BonusStoreOffers.forEach(v => {
                const rewards = v.Offer.Rewards.map(item => {
                    const it = this.getItem(item.ItemID);
                    return {
                        id: item.ItemID,
                        typeId: item.ItemTypeID,
                        name: it ? it.item.name : "Unknown",
                        amount: item.Quantity
                    }
                });

                const costKey = Object.keys(v.DiscountCosts)[0];
                const costKey2 = Object.keys(v.Offer.Cost)[0];

                bonus.push({
                    alreadySeen: v.IsSeen,
                    discountPercent: v.DiscountPercent,
                    discountCost: { id: costKey, cost: Currency[costKey], amount: v.DiscountCosts[costKey] },
                    offerId: v.BonusOfferID,
                    offer: {
                        cost: { id: costKey2, cost: Currency[costKey2], amount: v.DiscountCosts[costKey2] },
                        isDirectPurchase: v.Offer.IsDirectPurchase,
                        offerId: v.Offer.OfferID,
                        startDate: v.Offer.StartDate,
                        rewards: rewards
                    }
                })
            });
        }

        const skinPanel = this.data.SkinsPanelLayout;
        if (skinPanel && skinPanel.SingleItemOffers) {
            skinPanel.SingleItemOffers.forEach(s => {
                const it = this.getItem(s);
                skins.push({
                    name: it ? it.item.name : "Unknown",
                    id: s,
                    cost: it.offer.Cost
                })
            })
        }

        return {
            featured,
            bonus,
            skins
        }
    }

    private getItem(id: string) {
        const items = this.contentList;
        for (let storefrontStack in items) {
            const storefront = items[storefrontStack];
            const item = storefront.find(item => item && item.id === id);
            if (item) {
                const offer = this.offerList.find(o => o.Rewards.map(r => r.ItemID).includes(id))
                return {
                    item,
                    offer
                }
            }
        }
    }
}