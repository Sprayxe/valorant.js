import { Endpoints } from "./resources/Endpoints";

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