import { RiotApiClient } from "../index";
import { RequestBuilder } from "../Request";

export class HistoryApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets match history
     * @param accountId Account to get the history of
     * @param startIndex Index to start with
     * @param endIndex Index to end with
     */
    async getMatchHistory(accountId: string, startIndex = 0, endIndex = 10) {
        const matchReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/match-history/v1/history/" + accountId + `?startIndex${startIndex}&endIndex=${endIndex}`)
            .setMethod("GET")
            .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
            .build();
        return (await this._client.http.sendRequest(matchReq)).data;
    }

    /**
     * - Gets ranked history
     * @param accountId Account to get the history of
     * @param startIndex Index to start with
     * @param endIndex Index to end with
     */
    async getCompetitiveHistory(accountId: string, startIndex: number, endIndex: number) {
        const matchReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/mmr/v1/players/" + accountId + `/competitiveupdates?startIndex${startIndex}&endIndex=${endIndex}`)
            .setMethod("GET")
            .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
            .build();
        return (await this._client.http.sendRequest(matchReq)).data;
    }
}