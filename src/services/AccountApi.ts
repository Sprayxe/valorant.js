import { RiotApiClient } from "../index";
import { IAccount } from "../models/IAccount";
import { RequestBuilder } from "../Request";

export class AccountApi {
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
}