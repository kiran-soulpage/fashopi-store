import axios, { AxiosPromise } from "axios";
import cookie from "js-cookie";

abstract class ApiService {
  getAxiosHeaders(): any {
    const token = cookie.get("accessToken");
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  }
  //set cookue
  setAccessToken(token: string): void {
    cookie.set("accessToken", token);
  }

  // Axios get method
  get(url: string): AxiosPromise<any> {
    return axios({ method: "GET", url, headers: this.getAxiosHeaders() });
  }

  // Axios post method
  post(url: string, data = {}, headers?: any): AxiosPromise<any> {
    return axios({
      method: "POST",
      url,
      data,
      headers: headers ? headers : this.getAxiosHeaders(),
    });
  }
  // Axios put method
  put(url: string, data = {}): AxiosPromise<any> {
    return axios({
      method: "PUT",
      url,
      data,
      headers: this.getAxiosHeaders(),
    });
  }
  // Axios delete method
  delete(url: string): AxiosPromise<any> {
    return axios({
      method: "DELETE",
      url,
      headers: this.getAxiosHeaders(),
    });
  }
}

export default ApiService;
