import { useState, useEffect, useCallback, useRef } from "react";
import {
  getPerformanceData,
  invalidateCache,
} from "@/services/performanceService";
import type { PerformanceState } from "@/types/cockpit";

const DEBOUNCE_MS = 500;

/**
 * Hook de performance — consome a API Fastify (não mais o n8n).
 * O JWT é injetado automaticamente pelo api.ts.
 */
export function usePerformance() {
  const [state, setState] = useState<PerformanceState>({
    loadState:   "idle",
    data:        [],
    totalGrupos: 0,
    error:       null,
    lastUpdated: null,
    fromCache:   false,
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const load = useCallback(async (forceRefresh = false) => {
    setState((s) => ({ ...s, loadState: "loading", error: null }));
    try {
      const payload = await getPerformanceData({ forceRefresh });
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
  }, []);

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
