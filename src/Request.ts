import { AxiosRequestConfig, Method } from "axios"
import { CookieJar } from "tough-cookie";

export class RequestBuilder {
    private _headers = {};
    private _body? = null;
    private _url = "";
    private _method: Method;
    private _jar: CookieJar;

    public static fromRequest(request: Request) {
        const objMap = new Map<string, string>(Object.entries(request.headers));
        let obj = new RequestBuilder()
            .setBody(request.data)
            .setMethod(request.method)
            .setUrl(request.url);
        objMap.forEach((v, k) => obj = obj.addHeader(k, v));
        return obj;
    }

    public setUrl(url: string): RequestBuilder {
        this._url = url;
        return this;
    }

    public setBody(body: any): RequestBuilder {
        this._body = body;
        return this;
    }

    public setMethod(method: Method): RequestBuilder {
        this._method = method;
        return this;
    }

    public addHeader(key: string, value: string): RequestBuilder {
        this._headers[key] = value;
        return this;
    }

    public setCookieJar(jar: CookieJar) {
        this._jar = jar;
        return this;
    }

    public build(): Request {
        return new Request(this._url, this._method, this._headers, this._body, this._jar);
    }
}

export class Request implements AxiosRequestConfig {
    url: string
    method: Method
    headers: any
    data?: any
    jar?: any
    withCredentials = true
    constructor(url: string, method: Method, headers: any, body?: any, jar?: any) {
        this.url = url;
        this.method = method;
        this.headers = headers;
        this.data = body;
        this.jar = jar;
    }
}