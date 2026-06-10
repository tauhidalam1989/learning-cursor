import Link from 'next/link';
import type { OpenRole } from '@/types/careers';

type RoleCardProps = {
  role: OpenRole;
};

export function RoleCard({ role }: RoleCardProps) {
  const badgeClass =
    role.badge === 'hot'
      ? 'rounded-full border border-red-500/20 bg-red-900/20 px-2 py-0.5 text-[0.62rem] font-bold text-red-400'
      : role.badge === 'new'
        ? 'rounded-full border border-corematrix-green400/20 bg-corematrix-green900/20 px-2 py-0.5 text-[0.62rem] font-bold text-corematrix-green400'
        : '';

  const employmentClass =
    role.employmentType === 'contract'
      ? 'rounded-full border border-blue-500/20 bg-blue-900/10 px-2 py-0.5 text-[0.62rem] font-semibold text-blue-400'
      : 'rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-2 py-0.5 text-[0.62rem] font-semibold text-corematrix-green700';

  return (
    <Link
      href={`/careers/${role.id}`}
      className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-corematrix-border bg-corematrix-card p-5 transition-all hover:translate-x-1 hover:border-corematrix-border2 hover:bg-corematrix-card2"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-lg text-corematrix-green400">
          <i className={role.icon} />
        </div>
        <div>
          <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
            {role.title}
          </h3>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-corematrix-textDim">
            <span>{role.location}</span>
            <span aria-hidden>·</span>
            <span>{role.salaryRange}</span>
            <span aria-hidden>·</span>
            <span>{role.employmentType.replace('-', ' ')}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 !text-white">
        {role.badge && <span className={badgeClass}>{role.badge}</span>}
        <span className={employmentClass}>
          {role.employmentType.replace('-', ' ')}
        </span>
        <span className="text-corematrix-green400">→</span>
      </div>
    </Link>
  );
}
