import { ICurrency } from "./ICurrency";

export interface IStorefrontParsed {
    featured: IOffer[]
    bonus: IBundleEntry[]
    skins: ISkin[]
}

export interface IOffer {
    id: string
    typeId: string
    name: string
    quantity: number
    cost: ICurrency
    discount: number
    isPromoItem: boolean
}

export interface IBundleEntry {
    alreadySeen: boolean
    discountPercent: number
    discountCost: ICurrency
    offerId: string
    offer: IBundleOffer
}

export interface IBundleOffer {
    cost: ICurrency
    isDirectPurchase: boolean
    offerId: string
    startDate: string
    rewards: IBundleOfferReward[]
}

export interface IBundleOfferReward {
    id: string
    typeId: string
    name: string
    amount: number
}

export interface ISkin {
    name: string
    id: string
    cost: ICurrency
}