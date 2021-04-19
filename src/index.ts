import { AccountApi } from "./services/AccountApi";
import { ContentApi } from "./services/ContentApi";
import { HistoryApi } from "./services/HistoryApi";
import { UserApi } from "./services/UserApi";
import { IAccount } from "./models/IAccount";
import { IConfig } from "./models/IConfig";
import { IAuthorization } from "./models/IAuthorization";
import { AbstractHttp } from "./Http";
import Axios, { AxiosResponse } from "axios";
import { Request, RequestBuilder } from "./Request";
import { Endpoints } from "./resources/Endpoints";

export class RiotApiClient {
    #config: IConfig
    auth: IAuthorization
    clientVersion: string
    region: Region
    http: Http
    accountApi: AccountApi
    contentApi: ContentApi
    historyApi: HistoryApi
    userApi: UserApi
    user: IAccount

    /**
     * - Client platform id
     */
    public static XRiotClientPlatform = "ew0KCSJwbGF0Zm9ybVR5cGUiOiAiUEMiLA0KCSJwbGF0Zm9ybU9TIjogIldpbmRvd3MiLA0KCSJwbGF0Zm9ybU9TVmVyc2lvbiI6ICIxMC4wLjE5MDQyLjEuMjU2LjY0Yml0IiwNCgkicGxhdGZvcm1DaGlwc2V0IjogIlVua25vd24iDQp9";

    /**
     * - Initiates the base client
     * @param config Config for the lib
     */
    constructor(config: IConfig) {
        this.http = new Http();
        this.#config = config;
        this.region = config.region;
        this.buildServices();
    }

    /**
     * - Logins into your account
     */
    async login(): Promise<RiotApiClient> {
        // login and setup some stuff
        (this.auth as any) = {};
        this.auth.accessToken = await this.userApi.getAccessToken(this.#config.username, this.#config.password);
        this.auth.rsoToken = await this.userApi.getRsoToken(this.auth.accessToken);
        this.buildServices();
        // get user
        const userInfo = await this.userApi.getInfo()
        if (userInfo.sub == "")
            throw new Error("Account ID was empty. Please start the game atleast once!");
        this.user = (await this.accountApi.getAccountById([userInfo.sub]))[0];
        // finish stuff
        this.clientVersion = await this.getClientVersion();
        this.buildServices();
        return this;
    }

    /**
     * - Gets the current client version
     */
    async getClientVersion(): Promise<string> {
        try {
            const data = (await Axios({
                method: "GET",
                url: "https://valorant-api.com/v1/version"
            })).data.data;

            const branch = data.branch;
            const build = data.buildVersion;
            const versionNum = data.version.split(".").pop();

            return branch + "-shipping-" + build + "-" + versionNum;
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * - Initiates services
     * @warning You probably shouldn't call this method
     */
    buildServices() {
        this.accountApi = new AccountApi(this);
        this.contentApi = new ContentApi(this);
        this.historyApi = new HistoryApi(this);
        this.userApi = new UserApi(this);
        this.http = new Http(this.auth);
    }
}

export class Http extends AbstractHttp {
    private readonly auth?: IAuthorization = null;
    constructor(authorization?: IAuthorization) {
        super();
        this.auth = authorization;
    }

    async sendRequest(request: Request): Promise<AxiosResponse> {
        try {
            if (this.auth != null && this.auth.accessToken != null) {
                const authReq = RequestBuilder.fromRequest(request)
                    .addHeader("Authorization", `${this.auth.accessToken.token_type} ${this.auth.accessToken.access_token}`);
                if (this.auth.rsoToken != null) authReq.addHeader("X-Riot-Entitlements-JWT", this.auth.rsoToken.entitlements_token)
                request = authReq.build();
            }
            return await Axios(request);
        } catch (e) {
            console.error(e.response ? e.response : e);
            throw e;
        }
    }
}

export class Region {
    BaseUrl: string
    SharedUrl: string

    constructor(baseUrl: string, sharedUrl: string) {
        this.BaseUrl = baseUrl;
        this.SharedUrl = sharedUrl;
    }

    static EU = new Region(Endpoints.EuBase, Endpoints.EuShared);
    static NA = new Region(Endpoints.NaBase, Endpoints.NaShared);
    static AP = new Region(Endpoints.ApBase, Endpoints.ApShared);
}