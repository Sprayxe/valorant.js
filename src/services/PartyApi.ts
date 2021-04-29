import { RiotApiClient } from "../index";
import { RequestBuilder } from "../Request";

export class PartyApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets a party by id
     * @param partyId Party to get
     */
    async getPartyById(partyId: string) {
        const partyReq = new RequestBuilder()
            .setUrl(this._client.region.PartyUrl + `/parties/v1/parties/${partyId}`)
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(partyReq)).data
    }

    /**
     * - Gets a party by player id
     * @param playerId Player to get the party from
     */
    async getPartyByPlayer(playerId: string) {
        const partyReq = new RequestBuilder()
            .setUrl(this._client.region.PartyUrl + `/parties/v1/players/${playerId}`)
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(partyReq)).data
    }
}