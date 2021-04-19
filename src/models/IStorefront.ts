export interface IStorefront {
    FeaturedBundle: IFeaturedBundle
    SkinsPanelLayout: ISkinsPanelLayout
    BonusStore: IBonusStore
}

export interface IFeaturedBundle {
    Bundle: IBundle
    BundleRemainingDurationInSeconds: number
}

export interface IBundle {
    ID: string
    DataAssetID: string
    CurrencyID: string
    Items: IOffer[]
}

export interface IOffer {
    Item: IItem
    BasePrice: number
    CurrencyID: string
    DiscountPercent: number
    IsPromoItem: boolean
}

export interface IItem {
    ItemTypeID: string
    ItemID: string
    Amount: number
}

export interface ISkinsPanelLayout {
    SingleItemOffers: string[]
    SingleItemOffersRemainingDurationInSeconds: number
}

export interface IBonusStore {
    BonusStoreOffers: IBonusStoreEntry[]
    BonusStoreRemainingDurationInSeconds: number
}

export interface IBonusStoreEntry {
    BonusOfferID: string
    Offer: IBonusStoreOffer
    DiscountPercent: number
    DiscountCosts: any
    IsSeen: boolean
}

export interface IBonusStoreOffer {
    OfferID: string
    IsDirectPurchase: boolean
    StartDate: string
    Cost: any
    Rewards: IBonusStoreReward[]
}

export interface IBonusStoreReward {
    ItemTypeID: string
    ItemID: string
    Quantity: number
}

