import { RiotApiClient } from "../index";
import { RequestBuilder } from "../Request";
import { Endpoints } from "../resources/Endpoints";
import querystring from "querystring";
import { IAccessToken } from "../models/IAccessToken";
import { IRsoToken } from "../models/IRsoToken";
import { IUserInfo } from "../models/IUserInfo";
import { ICurrency } from "../models/ICurrency";
import Currency from "../resources/Currency";
import { ItemParser } from "../helpers/ItemParser";
import { IStorefront } from "../models/IStorefront";
import { IStorefrontParsed } from "../models/IStorefrontParsed";
import { StoreParser } from "../helpers/StoreParser";

export class UserApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets information about the user's account
     */
    async getInfo(): Promise<IUserInfo> {
        const userReq = new RequestBuilder()
            .setMethod("POST")
            .setUrl(Endpoints.Auth + "/userinfo")
            .setBody({})
            .build();
        return (await this._client.http.sendRequest(userReq)).data;
    }

    /**
     * - Kills an access token
     * @param cookies Cookies of session
     */
    async killAccessToken(cookies: string) {
        /*const delReq = new RequestBuilder()
            .setMethod("DELETE")
            .setUrl(Endpoints.Auth + "/api/v1/authorization")
            .addHeader("cookie", cookies)
            .build();
        return (await this._client.http.sendRequest(delReq));*/
        throw new Error("Not implemented.")
    }

    /**
     * - Gets an access token
     * @param username Username of the account
     * @param password Password of the account
     */
    async getAccessToken(username: string, password: string): Promise<IAccessToken> {
        const cookieReq = new RequestBuilder()
            .setMethod("POST")
            .setUrl(Endpoints.Auth + "/api/v1/authorization")
            .addHeader("content-type", "application/json")
            .addHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36")
            .setBody({
                "client_id": "play-valorant-web-prod",
                "nonce": "1",
                "redirect_uri": "https://playvalorant.com/opt_in",
                "response_type": "token id_token"
            })
            .build();
        const cookieRes = await this._client.http.sendRequest(cookieReq);

        const cookies = [];
        const parsedCookies = (JSON.stringify(cookieRes.headers["set-cookie"])).split("=");
        parsedCookies.forEach(a => {
            const cookie = a.replace("[", "").replace(";", "").replace("expires", "").replace("Max-Age", "").replace(",", "").replace("Path", "").replace("\"", "").replace("Lax\"", "").trim();
            cookies.push(cookie)
        })
        const cookieAuth = `__cfduid=${cookies[1]}; did=${cookies[6]}; asid=${cookies[10]}; clid=${cookies[12]}`;

        const loginReq = new RequestBuilder()
            .setMethod("PUT")
            .setUrl(Endpoints.Auth + "/api/v1/authorization")
            .addHeader("cookie", cookieAuth)
            .addHeader("content-type", "application/json")
            .addHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36")
            .setBody({
                "type": "auth",
                "username": username,
                "password": password
            })
            .build();
        const loginRes = (await this._client.http.sendRequest(loginReq)).data;

        const bodyStr = loginRes.response.parameters.uri.split("#")[1];
        const bodyObj = querystring.parse(bodyStr) as unknown;
        bodyObj["cookies"] = cookieAuth;

        return bodyObj as IAccessToken;
    }

    /**
     * - Gets an entitlement token
     * @param auth Authorization header to use
     */
    async getRsoToken(auth: IAccessToken): Promise<IRsoToken> {
        const rsoReq = new RequestBuilder()
            .setMethod("POST")
            .setUrl(Endpoints.Entitlements + "/api/token/v1")
            .addHeader("Authorization", `${auth.token_type} ${auth.access_token}`)
            .addHeader("content-type", "application/json")
            .setBody({})
            .build();
        return (await this._client.http.sendRequest(rsoReq)).data;
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
            .addHeader("content-type", "application/json")
            .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
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
     * - Gets the players inventory
     * @param accountId Account to get the inventory for
     */
    async getInventory(accountId: string) {
        const itemReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(this._client.region.BaseUrl + "/personalization/v2/players/" + accountId + "/playerloadout")
            .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
            .build();
        const itemRes = (await this._client.http.sendRequest(itemReq)).data;
        const parser = new ItemParser(itemRes);
        return parser.parse();
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
            .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
            .build();
        const storeRes = (await this._client.http.sendRequest(storeReq)).data;
        if (!parse)
            return storeRes;

        const parser = new StoreParser(storeRes, await this._client.contentApi.getContent(false));
        return parser.parse();
    }
}