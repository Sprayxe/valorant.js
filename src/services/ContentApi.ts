import { RiotApiClient } from "../index";
import { RequestBuilder } from "../Request";
import { ItemParser } from "../helpers/ItemParser";
import axios from "axios";

export class ContentApi {
    private _client: RiotApiClient
    constructor(client: RiotApiClient) {
        this._client = client;
    }

    /**
     * - Gets the current story contract
     */
    async getStoryContract() {
        const storyReq = new RequestBuilder()
            .setUrl(this._client.region.BaseUrl + "/contract-definitions/v2/definitions/story")
            .setMethod("GET")
            .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
            .build();
        return (await this._client.http.sendRequest(storyReq)).data;
    }

    /**
     * - Gets all items
     */
    async getContent(useRiot: boolean): Promise<any> {
        if (useRiot) {
            const contentReq = new RequestBuilder()
                .setMethod("GET")
                .setUrl(this._client.region.SharedUrl + "/content-service/v2/content")
                .addHeader("X-Riot-ClientVersion", this._client.clientVersion)
                .addHeader("X-Riot-ClientPlatform", RiotApiClient.XRiotClientPlatform)
                .build();

            const contentRes = (await this._client.http.sendRequest(contentReq)).data;
            const parser = new ItemParser(contentRes);

            return parser.parse();
        } else {
            const { data } = await axios.get("https://valorant-api.com/v1/weapons");
            return data.data;
        }
    }
}