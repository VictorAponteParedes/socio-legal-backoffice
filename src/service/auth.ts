import { axiosInstance } from "../constants";

export class AuthService {
  async login(email: string, password: string) {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
