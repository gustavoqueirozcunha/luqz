import { useState, useEffect, useCallback, useRef } from "react";
import { getPerformanceData, invalidateCache } from "@/services/performanceService";
import type { CockpitAuth, PerformanceState } from "@/types/cockpit";

const DEBOUNCE_MS = 500;

export function usePerformance(auth?: CockpitAuth) {
  const [state, setState] = useState<PerformanceState>({
    loadState:   "idle",
    data:        [],
    totalGrupos: 0,
    error:       null,
    lastUpdated: null,
    fromCache:   false,
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(
    async (forceRefresh = false) => {
      setState((s) => ({ ...s, loadState: "loading", error: null }));
      try {
        const payload = await getPerformanceData({ forceRefresh, auth });
        setState({
          loadState:   "success",
          data:        payload.data,
          totalGrupos: payload.totalGrupos,
          error:       null,
          lastUpdated: new Date(),
          fromCache:   !forceRefresh,
        });
      } catch (err) {
        setState((s) => ({
          ...s,
          loadState: "error",
          error: err instanceof Error ? err.message : "Erro desconhecido",
        }));
      }
    },
    [auth]
  );

  const refresh = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      invalidateCache();
      load(true);
    }, DEBOUNCE_MS);
  }, [load]);

  useEffect(() => {
    load();
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [load]);

  return { ...state, refresh };
}
