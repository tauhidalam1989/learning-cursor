import type { TextareaHTMLAttributes } from 'react';

export interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
  name: string;
  placeholder?: string;
}

/**
 * Reusable Form Textarea component matching pixel-perfect design.
 *
 * Features:
 * - Dark background (#101A15)
 * - Subtle inner shadow/glow
 * - Rounded corners
 * - Light gray placeholder (#A0A0A0)
 * - Multi-line with proper height
 */
export function FormTextarea({
  label,
  id,
  name,
  placeholder,
  className = '',
  rows = 5,
  ...props
}: FormTextareaProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="mb-2 text-base font-medium text-white sm:text-lg"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        rows={rows}
        className={`rounded-lg bg-[#101A15] px-4 py-3 text-base text-white placeholder-[#A0A0A0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-[#149253]/30 focus:ring-offset-2 focus:ring-offset-[#142819] resize-none min-w-0 ${className}`}
        {...props}
      />
    </div>
  );
}
