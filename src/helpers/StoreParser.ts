import { IStorefront } from "../models/IStorefront";
import { IStorefrontParsed } from "../models/IStorefrontParsed";
import Currency from "../resources/Currency";

export class StoreParser {
    data: IStorefront
    contentList: any[]

    constructor(data: IStorefront, contentList: any) {
        this.data = data;
        this.contentList = contentList;
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
                    name: it ? it.skin.displayName : "Unknown",
                    quantity: item.Item.Amount,
                    currency: { name: Currency[item.CurrencyID], id: item.CurrencyID, cost: item.BasePrice },
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
                        name: it ? it.skin.displayName : "Unknown",
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
                    name: it ? it.skin.displayName : "Unknown",
                    id: s,
                    cost: { id: "85ad13f7-3d1b-5128-9eb2-7cd8ee0b5741", name: "Valorant Points", amount: it.entry.shopData.cost }
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
        // TODO this code sucks lmao
        const items = this.contentList;
        for (const entryStack in items) {
            const entry = items[entryStack];
            const item = entry.skins.find(e => e.levels && e.levels.find(l => l && l.uuid === id));
            if (item) {
                const skin = item.levels.find(l => l && l.uuid === id)
                return {
                    entry,
                    skin
                }
            }
        }
        return null
    }
}