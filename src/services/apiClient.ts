import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export class ApiClient {
    private apiConfig: AxiosRequestConfig;
    private axiosInstance: AxiosInstance;
    constructor(apiConfig: AxiosRequestConfig, token?: string) {
        this.apiConfig = apiConfig;
        if (token) {
            apiConfig.headers = {
                ...apiConfig.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        this.axiosInstance = axios.create(apiConfig);
    }

    get(url: string) {
        return this.axiosInstance.get(url, this.apiConfig);
    }

    post(url: string, data: {}) {
        return this.axiosInstance.post(url, data, this.apiConfig);
    }

    patch(url: string, data: {}) {
        return this.axiosInstance.patch(url, data, this.apiConfig);
    }
}
