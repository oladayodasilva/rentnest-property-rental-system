import api from "./api";
import type { AuthResponse, LoginRequest } from "../types/auth";

export const loginAdmin = async (
  data: LoginRequest
): Promise<AuthResponse> => {
  const response = await api.post("/auth/login", data);
  return response.data;
};