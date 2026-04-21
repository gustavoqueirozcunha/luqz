/**
 * Cliente HTTP para a API LUQZ.
 *
 * Responsabilidades:
 *  - Injetar JWT no header Authorization
 *  - Centralizar base URL
 *  - Tratar erros HTTP de forma padronizada
 *  - Timeout padrão
 */

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001";

function getToken(): string | null {
  return localStorage.getItem("luqz_token");
}

export function setToken(token: string): void {
  localStorage.setItem("luqz_token", token);
}

export function clearToken(): void {
  localStorage.removeItem("luqz_token");
}

export function hasToken(): boolean {
  return !!getToken();
}

interface ApiOptions {
  method?: string;
  body?: unknown;
  timeout?: number;
}

export async function api<T = unknown>(
  path: string,
  opts: ApiOptions = {}
): Promise<T> {
  const { method = "GET", body, timeout = 10_000 } = opts;

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    signal: AbortSignal.timeout(timeout),
  });

  if (res.status === 401) {
    clearToken();
    // Dispara evento para que o AuthGuard detecte logout
    window.dispatchEvent(new Event("luqz:logout"));
    throw new Error("Sessão expirada");
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
    throw new Error(err.error || err.detail || `HTTP ${res.status}`);
  }

  return res.json() as Promise<T>;
}
