import type { CockpitAuth } from "@/types/cockpit";

export function readAuthFromUrl(): CockpitAuth {
  const params = new URLSearchParams(window.location.search);
  return {
    token:   params.get("token"),
    cliente: params.get("cliente"),
  };
}

export function isAuthenticated(_auth: CockpitAuth): boolean {
  return true;
}
