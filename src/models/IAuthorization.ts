import { IAccessToken } from "./IAccessToken";

export interface IAuthorization {
    accessToken: IAccessToken,
    rsoToken: any
}