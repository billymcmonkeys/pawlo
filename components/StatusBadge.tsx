import { CheckCircle2, AlertTriangle, Heart } from "lucide-react";

type Status = "Active" | "Lost" | "Reunited" | "active" | "lost" | "reunited";

function normalize(status: Status): "Active" | "Lost" | "Reunited" {
  const map: Record<string, "Active" | "Lost" | "Reunited"> = {
    active: "Active",
    lost: "Lost",
    reunited: "Reunited",
    Active: "Active",
    Lost: "Lost",
    Reunited: "Reunited",
  };
  return map[status] ?? "Active";
}

export default function StatusBadge({ status }: { status: Status }) {
  const s = normalize(status);

  if (s === "Active") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-secondary-50 text-secondary-700 border border-secondary-200">
        <CheckCircle2 size={11} strokeWidth={2.5} />
        Active
      </span>
    );
  }

  if (s === "Lost") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-warning-100 to-warning-50 border border-warning-400" style={{ color: "#B45309" }}>
        <AlertTriangle size={11} strokeWidth={2.5} />
        Lost
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-gradient-to-r from-success-100 to-green-50 text-green-700 border border-success-400">
      <Heart size={11} strokeWidth={2.5} fill="currentColor" />
      Reunited
    </span>
  );
}
