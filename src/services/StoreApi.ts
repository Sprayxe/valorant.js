import { ICurrency } from "../models/ICurrency";
import { RequestBuilder } from "../Request";
import { RiotApiClient } from "../index";
import Currency from "../resources/Currency";
import { IStorefront } from "../models/IStorefront";
import { IStorefrontParsed } from "../models/IStorefrontParsed";
import { StoreParser } from "../helpers/StoreParser";
import { IStoreOffers } from "../models/IStoreOffers";

export class StoreApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets the users wallet (valorant points etc.)
     * @param accountId Account to get the wallet for
     */
    async getWallet(accountId: string): Promise<ICurrency[]> {
        const currencies = [];

        const walletReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(this._client.region.BaseUrl + "/store/v1/wallet/" + accountId)
            .build();
        const walletRes = (await this._client.http.sendRequest(walletReq)).data;

        const walletMap = new Map<string, number>(Object.entries(walletRes.Balances));
        walletMap.forEach((v, k) => {
            currencies.push({
                id: k,
                name: Currency[k] || "Unknown. Please contact the library developer.",
                amount: v
            });
        })

        return currencies;
    }

    /**
     * - Gets the storefront
     * @param accountId Account to get storefront for
     * @param parse Wether to parse the shop or not
     */
    async getStorefront(accountId: string, parse: boolean): Promise<IStorefront | IStorefrontParsed> {
        const storeReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/store/v2/storefront/" + accountId)
            .setMethod("GET")
            .build();
        const storeRes = (await this._client.http.sendRequest(storeReq)).data;
        if (!parse)
            return storeRes;

        const content = await this._client.contentApi.getContent();
        const offers = await this.getStoreOffers();
        const parser = new StoreParser(storeRes, content, offers.Offers);
        return parser.parse();
    }

    /**
     * - Gets the store offers
     */
    async getStoreOffers(): Promise<IStoreOffers> {
        const storeReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/store/v1/offers")
            .setMethod("GET")
            .build();
        return new IStoreOffers((await this._client.http.sendRequest(storeReq)).data);
    }
}