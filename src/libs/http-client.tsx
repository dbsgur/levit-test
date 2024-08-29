import axios, { ResponseType } from "axios";

const API_ENDPOINT = "https://assignment-front.ilevit.com/";

export const httpClient = (() => {
  const instance = axios.create({
    baseURL: API_ENDPOINT,
  });

  instance.interceptors.response.use(
    (res: any) => res,
    (err: any) => {
      if (err.response && err.response.data instanceof ArrayBuffer) {
        try {
          const data = JSON.parse(new TextDecoder().decode(err.response.data));
          if (data.errorMessage) {
            err.message = data.errorMessage;
          }
        } catch (e) {
          err.message =
            "Something went wrong and we couldn't complete your request.";
        }
      } else if (err?.response?.data?.errorMessage) {
        err.message = err.response.data.errorMessage;
      }
      return Promise.reject(err);
    }
  );

  return {
    async getOtherContentType<T>(
      url: string,
      config?: {
        responseType?: ResponseType;
        params?: Record<string, any>;
        paramsSerializer?: (param: Record<string, any>) => any;
      }
    ): Promise<T> {
      const res = await instance.get<T>(url, config);
      return res?.data;
    },

    async get<T>(
      url: string,
      config?: {
        params?: any;
        paramsSerializer?: (param: Record<string, any>) => any;
      }
    ): Promise<T> {
      const res = await instance.get<T>(url, config);
      return res?.data;
    },

    async head<T>(url: string, config?: { params?: any }): Promise<T> {
      const res = await instance.head<T>(url, config);
      return res?.data;
    },

    async post<T>(
      url: string,
      data: Record<string, any>,
      config?: { headers?: { "content-type": string } }
    ): Promise<T> {
      const res = await instance.post<T>(url, data, config);
      return res?.data;
    },

    async patch<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await instance.patch<T>(url, data);

      return res?.data;
    },

    async put<T>(url: string, data: Record<string, any>): Promise<T> {
      const res = await instance.put<T>(url, data);
      return res?.data;
    },

    async delete<T>(url: string): Promise<T> {
      const res = await instance.delete<T>(url);
      return res?.data;
    },
  };
})();
