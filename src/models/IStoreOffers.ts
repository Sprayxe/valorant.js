import { ICurrency } from "./ICurrency";
import Currency from "../resources/Currency"

export class IStoreOffers {
    Offers: IStoreOffer[]
    UpgradeCurrencyOffers: IStoreCurrencyOffer[]
    constructor(data) {
        this.Offers = data.Offers.map(o => new IStoreOffer(o));
        this.UpgradeCurrencyOffers = data.UpgradeCurrencyOffers;
    }
}

export class IStoreOffer {
    OfferID: string
    IsDirectPurchase: boolean
    StartDate: string
    Cost: ICurrency
    Rewards: IStoreOfferReward[]
    constructor(data: any) {
        this.OfferID = data.OfferID;
        this.IsDirectPurchase = data.IsDirectPurchase;
        this.StartDate = data.StartDate;
        const _ = Object.keys(data.Cost)[0];
        this.Cost = { id: _, amount: data.Cost[_], name: Currency[_] }
        this.Rewards = data.Rewards;
    }
}

export interface IStoreOfferReward {
    ItemTypeID: string
    ItemID: string
    Quantity: number
}

export interface IStoreCurrencyOffer {
    OfferID: string
    StorefrontItemID: string
}