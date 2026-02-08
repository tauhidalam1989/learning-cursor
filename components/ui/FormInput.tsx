import type { InputHTMLAttributes } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
}

/**
 * Reusable Form Input component matching pixel-perfect design.
 *
 * Features:
 * - Dark input background (#101A15)
 * - Subtle inner shadow/glow for definition
 * - Rounded corners
 * - Light gray placeholder (#A0A0A0)
 * - Focus glow effect
 */
export function FormInput({
  label,
  id,
  name,
  placeholder,
  className = '',
  ...props
}: FormInputProps) {
  // allow merging passed style and add specific minHeight for telephone inputs
  const propStyle = (props as any).style as React.CSSProperties | undefined;
  const inputType = (props as any).type as string | undefined;
  const mergedStyle: React.CSSProperties = {
    ...(propStyle || {}),
    ...(inputType === 'tel' ? { minHeight: 48 } : {}),
  };
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 text-base font-medium text-white sm:text-lg"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        placeholder={placeholder}
        className={`h-12 rounded-lg bg-[#101A15] px-4 text-base text-white placeholder-[#A0A0A0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-[#149253]/30 focus:ring-offset-2 focus:ring-offset-[#142819] min-w-0 ${className}`}
        style={mergedStyle}
        {...props}
      />
    </div>
  );
}
