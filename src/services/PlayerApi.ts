import { RiotApiClient } from "../index";
import { IUserInfo } from "../models/IUserInfo";
import { RequestBuilder } from "../Request";
import { Endpoints } from "../resources/Endpoints";
import { IAccessToken } from "../models/IAccessToken";
import querystring from "querystring";
import { IRsoToken } from "../models/IRsoToken";
import { ItemParser } from "../helpers/ItemParser";
import { IAccount } from "../models/IAccount";
import { InvalidCredsException } from "../models/Exceptions";

export class PlayerApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets an account by id
     * @param accountIds Array of account ids to get
     */
    async getAccountById(accountIds: string[]): Promise<IAccount[]> {
        const accReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/name-service/v2/players")
            .setMethod("PUT")
            .setBody(accountIds)
            .build();
        return (await this._client.http.sendRequest(accReq)).data;
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
        await this._client.http.sendRequest(cookieReq);

        const loginReq = new RequestBuilder()
            .setMethod("PUT")
            .setUrl(Endpoints.Auth + "/api/v1/authorization")
            .addHeader("content-type", "application/json")
            .addHeader("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36")
            .setBody({
                "type": "auth",
                "username": username,
                "password": password
            })
            .build();

        const loginRes = (await this._client.http.sendRequest(loginReq)).data;
        if (!loginRes.response) {
            throw new InvalidCredsException(username, "Login failed: Invalid credentials!");
        }

        const bodyStr = loginRes.response.parameters.uri.split("#")[1];
        const bodyObj = querystring.parse(bodyStr) as unknown;

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
     * - Gets the players inventory
     * @param accountId Account to get the inventory for
     */
    async getInventory(accountId: string) {
        const itemReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(this._client.region.BaseUrl + "/personalization/v2/players/" + accountId + "/playerloadout")
            .build();
        const itemRes = (await this._client.http.sendRequest(itemReq)).data;
        const parser = new ItemParser(itemRes);
        return parser.parse();
    }
}