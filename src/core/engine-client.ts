import { ClientConfigs } from './client-configs';
import { Authorization } from '../auth/authorization';
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { EngineError } from './engine-error';
import { v4 as uuidV4 } from 'uuid';

export type ApiOptions = {
  correlationId?: string;
  characterId?: string;
  executorUser?: string;
};

export type RequestConfigWithApiOptions = AxiosRequestConfig & ApiOptions;
export type RequestConfig = Omit<RequestConfigWithApiOptions, 'url' | 'method'>;

export class EngineClient {
  private axiosInstance: AxiosInstance;

  constructor(
    private configs: ClientConfigs,
    private authorization?: Authorization,
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.configs.apiUrl,
      timeout: this.configs.timeout ?? 10000,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          const data = error.response.data;
          return Promise.reject(
            new EngineError(data.key, data.message, data.params, status, {
              url: error.request.res.responseUrl,
            }),
          );
        }

        return Promise.reject(error);
      },
    );
  }

  public setAuthorization(authorization: Authorization) {
    this.authorization = authorization;
  }

  public changeLocale(locale: string) {
    this.configs = { ...this.configs, locale };
  }

  public request<T>(config: RequestConfigWithApiOptions): Promise<AxiosResponse<T>> {
    config.headers = this.getHeaders(config);
    return this.axiosInstance.request<T>(config);
  }

  public get<TResp>({
    url,
    query,
    options,
  }: {
    url: string;
    query?: Record<string, unknown>;
    options?: Omit<RequestConfig, 'url' | 'method'>;
  }): Promise<TResp> {
    const fullUrl = this.appendQuery(url, query);
    return this.request<TResp>({ ...options, method: 'GET', url: fullUrl }).then((p) => p.data);
  }

  public post<TReq, TResp>({
    url,
    data,
    query,
    options,
  }: {
    url: string;
    data?: TReq;
    query?: Record<string, unknown>;
    options?: Omit<RequestConfig, 'url' | 'method'>;
  }): Promise<TResp> {
    const fullUrl = this.appendQuery(url, query);
    return this.request<TResp>({ ...options, method: 'POST', url: fullUrl, data }).then(
      (p) => p.data,
    );
  }

  public put<TReq, TResp>({
    url,
    data,
    query,
    options,
  }: {
    url: string;
    data?: TReq;
    query?: Record<string, unknown>;
    options?: Omit<RequestConfig, 'url' | 'method'>;
  }): Promise<TResp> {
    const fullUrl = this.appendQuery(url, query);
    return this.request<TResp>({ ...options, method: 'PUT', url: fullUrl, data }).then(
      (p) => p.data,
    );
  }

  public patch<TReq, TResp>({
    url,
    data,
    query,
    options,
  }: {
    url: string;
    data?: TReq;
    query?: Record<string, unknown>;
    options?: Omit<RequestConfig, 'url' | 'method'>;
  }): Promise<TResp> {
    const fullUrl = this.appendQuery(url, query);
    return this.request<TResp>({ ...options, method: 'PATCH', url: fullUrl, data }).then(
      (p) => p.data,
    );
  }

  public delete<TResp>({
    url,
    query,
    options,
  }: {
    url: string;
    query?: Record<string, unknown>;
    options?: Omit<RequestConfig, 'url' | 'method'>;
  }): Promise<TResp> {
    const fullUrl = this.appendQuery(url, query);
    return this.request<TResp>({ ...options, method: 'DELETE', url: fullUrl }).then((p) => p.data);
  }

  private getHeaders(cfg: RequestConfigWithApiOptions): AxiosHeaders {
    const headers = new AxiosHeaders();
    if (cfg.headers) {
      const existing = cfg.headers as Record<string, unknown>;
      Object.entries(existing).forEach(([key, value]) => {
        if (value != null) {
          headers.set(key, String(value));
        }
      });
    }

    headers.set('Accept-Language', this.configs.locale);
    headers.set('x-agent-name', this.configs.applicationName);
    headers.set('x-server-id', this.configs.serverId);
    headers.set('x-correlationid', cfg.correlationId ?? uuidV4());

    if (this.authorization) {
      headers.set('Authorization', this.authorization.getAuthorizationToken());
    }

    if (cfg.characterId) {
      headers.set('x-character-id', cfg.characterId);
    }

    if (cfg.executorUser) {
      headers.set('x-executor-user', cfg.executorUser);
    }

    return headers;
  }

  private appendQuery(url: string, query?: Record<string, unknown>): string {
    if (!query) return url;

    const parts = Object.entries(query)
      .filter(([, v]) => v != null)
      .map(([k, v]) => {
        const str = Array.isArray(v) ? v.map((x) => String(x)).join(',') : String(v);
        return `${encodeURIComponent(k)}=${encodeURIComponent(str)}`;
      });

    return parts.length ? `${url}?${parts.join('&')}` : url;
  }
}
