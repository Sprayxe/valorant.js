import { RiotApiClient } from "../index";
import { RequestBuilder } from "../Request";
import { ItemParser } from "../helpers/ItemParser";
import axios from "axios";
import { IItemUpgrades } from "../models/IItemUpgrades";

export class ContentApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets the current story contract definitions
     */
    async getStoryContract() {
        const storyReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/contract-definitions/v2/definitions/story")
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(storyReq)).data;
    }

    /**
     * - Gets a player's contract
     */
    async getContractByPlayer(playerId: string) {
        const storyReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + `/contracts/v1/contracts/${playerId}`)
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(storyReq)).data;
    }

    /**
     * - Gets item upgrades
     */
    async getItemUpgrades(): Promise<IItemUpgrades> {
        const upgradeReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/contract-definitions/v3/item-upgrades")
            .setMethod("GET")
            .build();
        return (await this._client.http.sendRequest(upgradeReq)).data;
    }

    /**
     * - Gets all items
     */
    async getContent(): Promise<any> {
        const contentReq = new RequestBuilder()
            .setMethod("GET")
            .setUrl(this._client.region.SharedUrl + "/content-service/v2/content")
            .build();

        const contentRes = (await this._client.http.sendRequest(contentReq)).data;
        const parser = new ItemParser(contentRes);

        return parser.parse();
    }
}