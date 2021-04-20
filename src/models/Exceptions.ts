import { AxiosError, AxiosResponse } from "axios";

export class ApiClientException {
    error: AxiosError
    response: AxiosResponse
    data: IRiotException
    constructor(error: AxiosError) {
        this.error = error;
        this.response = error.response;
        this.data = error.response.data;
    }
}

export interface IRiotException {
    httpStatus: number
    errorCode: string
    message: string
}

export class InvalidCredsException extends Error {
    username: string
    constructor(username: string, message?: string) {
        super(message);
        this.username = username;
    }
}