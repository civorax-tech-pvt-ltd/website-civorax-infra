import Image from "next/image";
import { MapPin, Calendar, TrendingUp } from "lucide-react";
import type { DashboardProject, ProjectStatus } from "@/features/dashboard/types/dashboard.types";

const statusConfig: Record<ProjectStatus, { label: string; classes: string }> = {
  planning: { label: "Planning", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  in_progress: { label: "In Progress", classes: "bg-[#e6f7f2] text-[#006c4e] border-[#b3e6d3]" },
  on_hold: { label: "On Hold", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  completed: { label: "Completed", classes: "bg-gray-50 text-gray-600 border-gray-200" },
};

function formatNPR(amount: number): string {
  return new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(amount);
}

type Props = {
  project: DashboardProject;
};

export default function ProjectCard({ project }: Props) {
  const status = statusConfig[project.status];
  const completedMilestones = project.milestones.filter((m) => m.completedAt !== null).length;

  return (
    <div className="bg-white rounded-2xl border border-[#e8f5f0] shadow-[0_2px_16px_rgba(0,63,44,0.06)] overflow-hidden hover:shadow-[0_4px_24px_rgba(0,63,44,0.10)] transition-shadow duration-200">
      {project.coverImageUrl ? (
        <div className="h-36 bg-[#f0faf5] overflow-hidden">
          <Image
            src={project.coverImageUrl}
            alt={project.title}
            width={400}
            height={225}
            sizes="(max-width: 768px) 100vw, 400px"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-36 bg-gradient-to-br from-[#e6f7f2] to-[#f0faf5] flex items-center justify-center">
          <TrendingUp className="w-8 h-8 text-[#20b486]/40" />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-[#1a1a1a] text-base leading-snug">{project.title}</h3>
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full border ${status.classes}`}>
            {status.label}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#6b7280] mb-4">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{project.location}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1.5">
            <span>Progress</span>
            <span className="font-medium text-[#374151]">{project.progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-[#f0faf5] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#20b486] rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercent}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-[#f9fafb] rounded-xl p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-0.5">Budget</p>
            <p className="text-sm font-semibold text-[#1a1a1a] truncate">{formatNPR(project.totalBudget)}</p>
          </div>
          <div className="bg-[#f9fafb] rounded-xl p-3">
            <p className="text-[10px] text-[#9ca3af] uppercase tracking-wide mb-0.5">Paid</p>
            <p className="text-sm font-semibold text-[#006c4e] truncate">{formatNPR(project.paidToDate)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#6b7280]">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Est. {project.estimatedCompletionDate}</span>
          </div>
          <span>
            {completedMilestones}/{project.milestones.length} milestones
          </span>
        </div>
      </div>
    </div>
  );
}
