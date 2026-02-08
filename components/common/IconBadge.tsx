import Image from 'next/image';

export function IconBadge({ src, size = 48 }: { src: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full bg-white"
      style={{
        height: size,
        width: size,
        boxShadow: '0 6px 18px rgba(0,0,0,0.35)',
      }}
    >
      <Image src={src} alt="" width={Math.round(size * 0.66)} height={Math.round(size * 0.66)} className="object-contain" />
    </div>
  );
}

