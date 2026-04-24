import { useMemo } from "react";
import type { ClientePerformance } from "@/types/cockpit";
import { StatusPill } from "@/components/StatusPill";
import { SkeletonCard } from "@/components/Skeleton";
import { EmptyState, ErrorState } from "@/components/EmptyState";
import { calculateKPIStatus } from "@/services/performanceService";

interface Props {
  data: ClientePerformance[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  onSelect: (c: ClientePerformance) => void;
}

export default function Dashboard({
  data,
  loading,
  error,
  onRetry,
  onSelect,
}: Props) {

  // 🔒 FILTRO SEGURO (origem dos dados)
  const clientesValidos = useMemo(
    () => (data || []).filter((d) => d.kpis?.principal),
    [data]
  );

  // loading
  if (loading) {
    return (
      <div className="grid gap-4">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // erro
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  // vazio
  if (!clientesValidos.length) {
    return <EmptyState message="Sem dados de performance disponíveis." />;
  }

  return (
    <div className="grid gap-4">
      {clientesValidos.map((d) => {
        const principal = d.kpis?.principal;

        const status = calculateKPIStatus({
          value:     principal?.valorAtual ?? 0,
          target:    principal?.meta ?? 0,
          direction: "lower_is_better",
        });

        return (
          <div
            key={d.id}
            onClick={() => onSelect(d)}
            className="p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 cursor-pointer transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {principal?.nome ?? "Sem dados"}
                </h3>
                <p className="text-sm text-zinc-400">
                  {principal?.valorAtual ?? 0} / {principal?.meta ?? 0}
                </p>
              </div>

              <StatusPill status={status.status} label={status.label} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
