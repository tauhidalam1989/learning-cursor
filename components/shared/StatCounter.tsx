'use client';

import { useCountUp } from '@/hooks/useCountUp';

interface StatCounterProps {
  count: number;
  suffix?: string;
  label: string;
  sub?: string;
  numClassName?: string;
  labelClassName?: string;
  subClassName?: string;
}

export default function StatCounter({
  count,
  suffix = '+',
  label,
  sub,
  numClassName,
  labelClassName,
  subClassName,
}: StatCounterProps) {
  const ref = useCountUp(count, suffix);
  return (
    <div className="text-center">
      <span
        ref={ref}
        className={
          numClassName ??
          'mb-2 block font-display text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-corematrix-green400'
        }
      >
        0{suffix}
      </span>
      <div className={labelClassName ?? 'text-sm text-corematrix-textMuted leading-snug'}>
        {label}
      </div>
      {sub && (
        <div className={subClassName ?? 'text-[0.68rem] text-corematrix-textDim mt-1'}>
          {sub}
        </div>
      )}
    </div>
  );
}
