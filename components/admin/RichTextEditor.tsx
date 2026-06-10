'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import { useEffect, useRef, useCallback } from 'react';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  dir?: 'ltr' | 'rtl';
  label?: string;
}

const FONT_COLORS = [
  '#ffffff', '#e2e8f0', '#94a3b8', '#64748b',
  '#f87171', '#fb923c', '#fbbf24', '#a3e635',
  '#34d399', '#22d3ee', '#60a5fa', '#a78bfa',
  '#000000', '#1e293b', '#0f172a', '#166534',
];

const HIGHLIGHT_COLORS = [
  { color: '#fef08a', label: 'Yellow' },
  { color: '#bbf7d0', label: 'Green' },
  { color: '#bfdbfe', label: 'Blue' },
  { color: '#fecaca', label: 'Red' },
  { color: '#e9d5ff', label: 'Purple' },
  { color: '#fed7aa', label: 'Orange' },
];

const btnBase =
  'flex h-7 w-7 items-center justify-center rounded text-xs transition hover:bg-white/10 disabled:opacity-40';
const btnActive = 'bg-corematrix-green700/60 text-corematrix-green400';

export function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content here...',
  dir = 'ltr',
  label,
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Underline,
      Image.configure({ inline: false, allowBase64: true }),
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-invert max-w-none min-h-[220px] p-4 outline-none text-corematrix-textPrimary',
        dir,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (e.g. when editing an existing post)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [value, editor]);

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !editor) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result as string }).run();
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    },
    [editor]
  );

  const setImageUrl = useCallback(() => {
    const url = window.prompt('Enter image URL:');
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const url = window.prompt('Enter URL:', editor?.getAttributes('link').href ?? '');
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="mb-1 block text-xs font-semibold text-corematrix-textMuted uppercase tracking-wider">
          {label}
        </label>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 rounded-t-xl border border-corematrix-border bg-[#0d1f14] px-2 py-1.5">
        {/* Headings */}
        <select
          className="h-7 rounded bg-transparent px-1.5 text-xs text-corematrix-textSecondary focus:outline-none hover:bg-white/10 cursor-pointer"
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'p') editor.chain().focus().setParagraph().run();
            else editor.chain().focus().toggleHeading({ level: parseInt(val) as 1 | 2 | 3 }).run();
          }}
          value={
            editor.isActive('heading', { level: 1 }) ? '1'
            : editor.isActive('heading', { level: 2 }) ? '2'
            : editor.isActive('heading', { level: 3 }) ? '3'
            : 'p'
          }
        >
          <option value="p">Paragraph</option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>

        <div className="mx-1 h-5 w-px bg-corematrix-border" />

        {/* Bold / Italic / Underline / Strike */}
        <button type="button" title="Bold" onClick={() => editor.chain().focus().toggleBold().run()} className={`${btnBase} ${editor.isActive('bold') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <b>B</b>
        </button>
        <button type="button" title="Italic" onClick={() => editor.chain().focus().toggleItalic().run()} className={`${btnBase} ${editor.isActive('italic') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <i>I</i>
        </button>
        <button type="button" title="Underline" onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${btnBase} ${editor.isActive('underline') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <u className="text-xs">U</u>
        </button>
        <button type="button" title="Strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={`${btnBase} ${editor.isActive('strike') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <s className="text-xs">S</s>
        </button>

        <div className="mx-1 h-5 w-px bg-corematrix-border" />

        {/* Text Color */}
        <div className="relative group">
          <button type="button" title="Text Color" className={`${btnBase} text-corematrix-textSecondary flex-col gap-0`}>
            <span className="text-[10px] font-bold leading-none">A</span>
            <span
              className="mt-0.5 h-1 w-5 rounded-sm"
              style={{ background: editor.getAttributes('textStyle').color ?? '#34d399' }}
            />
          </button>
          <div className="absolute top-full left-0 z-50 mt-1 hidden group-hover:flex flex-wrap w-36 gap-1 rounded-xl border border-corematrix-border bg-corematrix-card2 p-2 shadow-2xl">
            {FONT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                title={c}
                onClick={() => editor.chain().focus().setColor(c).run()}
                className="h-5 w-5 rounded border border-white/10 hover:scale-110 transition"
                style={{ background: c }}
              />
            ))}
          </div>
        </div>

        {/* Highlight / BG Color */}
        <div className="relative group">
          <button type="button" title="Highlight" className={`${btnBase} text-corematrix-textSecondary`}>
            <span className="text-[10px] font-bold leading-none px-0.5 rounded" style={{ background: '#fef08a', color: '#000' }}>
              H
            </span>
          </button>
          <div className="absolute top-full left-0 z-50 mt-1 hidden group-hover:flex flex-wrap w-36 gap-1 rounded-xl border border-corematrix-border bg-corematrix-card2 p-2 shadow-2xl">
            <button type="button" title="Remove highlight" onClick={() => editor.chain().focus().unsetHighlight().run()} className="w-full text-left text-[10px] text-corematrix-textDim hover:text-red-400">
              ✕ Remove
            </button>
            {HIGHLIGHT_COLORS.map(({ color, label: l }) => (
              <button
                key={color}
                type="button"
                title={l}
                onClick={() => editor.chain().focus().setHighlight({ color }).run()}
                className="h-5 w-5 rounded border border-white/10 hover:scale-110 transition"
                style={{ background: color }}
              />
            ))}
          </div>
        </div>

        <div className="mx-1 h-5 w-px bg-corematrix-border" />

        {/* Lists */}
        <button type="button" title="Bullet List" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${btnBase} ${editor.isActive('bulletList') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">≡</span>
        </button>
        <button type="button" title="Ordered List" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${btnBase} ${editor.isActive('orderedList') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">1.</span>
        </button>
        <button type="button" title="Blockquote" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`${btnBase} ${editor.isActive('blockquote') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">"</span>
        </button>
        <button type="button" title="Code Block" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`${btnBase} ${editor.isActive('codeBlock') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="font-mono text-[10px]">{'{}'}</span>
        </button>

        <div className="mx-1 h-5 w-px bg-corematrix-border" />

        {/* Alignment */}
        <button type="button" title="Align Left" onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`${btnBase} ${editor.isActive({ textAlign: 'left' }) ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">⬅</span>
        </button>
        <button type="button" title="Align Center" onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`${btnBase} ${editor.isActive({ textAlign: 'center' }) ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">☰</span>
        </button>
        <button type="button" title="Align Right" onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`${btnBase} ${editor.isActive({ textAlign: 'right' }) ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">➡</span>
        </button>

        <div className="mx-1 h-5 w-px bg-corematrix-border" />

        {/* Link */}
        <button type="button" title="Insert Link" onClick={setLink} className={`${btnBase} ${editor.isActive('link') ? btnActive : 'text-corematrix-textSecondary'}`}>
          <span className="text-[11px]">🔗</span>
        </button>

        {/* Image from URL */}
        <button type="button" title="Insert Image URL" onClick={setImageUrl} className={`${btnBase} text-corematrix-textSecondary`}>
          <span className="text-[11px]">🖼</span>
        </button>

        {/* Image upload */}
        <button
          type="button"
          title="Upload Image"
          onClick={() => fileInputRef.current?.click()}
          className={`${btnBase} text-corematrix-textSecondary`}
        >
          <span className="text-[11px]">📁</span>
        </button>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

        <div className="mx-1 h-5 w-px bg-corematrix-border" />

        {/* Undo / Redo */}
        <button type="button" title="Undo" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className={`${btnBase} text-corematrix-textSecondary`}>
          ↩
        </button>
        <button type="button" title="Redo" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className={`${btnBase} text-corematrix-textSecondary`}>
          ↪
        </button>
      </div>

      {/* Editor Body */}
      <div className="rounded-b-xl border border-t-0 border-corematrix-border bg-corematrix-card2 focus-within:border-corematrix-green700 transition">
        <EditorContent editor={editor} />
        {!editor.getText() && (
          <p className="pointer-events-none absolute mt-[-2.5rem] px-4 text-sm text-corematrix-textDim">
            {placeholder}
          </p>
        )}
      </div>
    </div>
  );
}

export default RichTextEditor;
