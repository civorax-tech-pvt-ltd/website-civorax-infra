import Image from "next/image";
import type { TeamMember as TeamMemberType } from "@/entities/team";

type TeamMemberCardProps = {
  member: TeamMemberType;
};

function initialsOf(name: string): string {
  const parts = name
    .replace(/Er\.|Ar\.|Dr\./g, "")
    .replace(/&/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "·";
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : "";
  return (first + last).toUpperCase().slice(0, 2);
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const initials = initialsOf(member.name);
  const hasImage = Boolean(member.image);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-20 w-20 overflow-hidden rounded-full bg-[#20b486]/10 shadow-[0_10px_24px_rgba(8,29,48,0.10)] sm:h-24 sm:w-24">
        {hasImage ? (
          <Image
            src={member.image!}
            alt={`${member.name} — ${member.role} at CivoraX Infra`}
            width={96}
            height={96}
            sizes="96px"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#006c4e] to-[#20b486]">
            <span className="font-sora text-xl font-semibold text-white sm:text-2xl">
              {initials}
            </span>
          </div>
        )}
      </div>

      <h3 className="font-sora mt-4 text-[13px] font-semibold leading-snug text-[#1c1c19] sm:text-sm">
        {member.name}
      </h3>

      <p className="mt-1 text-[12px] font-medium text-[#006c4e]">
        {member.role}
      </p>
    </div>
  );
}
