import { api, setToken, clearToken, hasToken } from "@/services/api";
import type { LoginResponse, MeResponse } from "@/types/cockpit";

export function isAuthenticated(): boolean {
  return hasToken();
}

export async function login(email: string, password: string): Promise<LoginResponse> {
  const result = await api<LoginResponse>("/auth/login", {
    method: "POST",
    body: { email, password },
  });
  setToken(result.token);
  return result;
}

export async function verifySession(): Promise<MeResponse | null> {
  try {
    return await api<MeResponse>("/auth/me");
  } catch {
    clearToken();
    return null;
  }
}

export function logout(): void {
  clearToken();
}
