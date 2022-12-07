import { SIGNUP } from "lib/endpoints";
import ApiService from "./api.service";

class AuthService extends ApiService {
  //signup
  signup(data: any): Promise<any> {
    return this.post(`${SIGNUP}`, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw err.response.data;
      });
  }
}

export default AuthService;
