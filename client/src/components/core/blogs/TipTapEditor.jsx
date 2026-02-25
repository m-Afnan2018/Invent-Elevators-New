'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import {
    RiBold,
    RiItalic,
    RiUnderline,
    RiStrikethrough,
    RiH1,
    RiH2,
    RiH3,
    RiListOrdered,
    RiListUnordered,
    RiDoubleQuotesL,
    RiCodeSSlashLine,
    RiSeparator,
    RiAlignLeft,
    RiAlignCenter,
    RiAlignRight,
    RiAlignJustify,
    RiLink,
    RiImageAddLine,
    RiArrowGoBackLine,
    RiArrowGoForwardLine,
} from 'react-icons/ri';
import styles from './TipTapEditor.module.css';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = () => {
        const url = window.prompt('Enter image URL:');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    };

    const setLink = () => {
        const url = window.prompt('Enter URL:');
        if (url) {
            editor.chain().focus().setLink({ href: url }).run();
        }
    };

    return (
        <div className={styles.menuBar}>
            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? styles.active : ''}
                    title="Bold"
                >
                    <RiBold />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? styles.active : ''}
                    title="Italic"
                >
                    <RiItalic />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? styles.active : ''}
                    title="Underline"
                >
                    <RiUnderline />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? styles.active : ''}
                    title="Strikethrough"
                >
                    <RiStrikethrough />
                </button>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? styles.active : ''}
                    title="Heading 1"
                >
                    <RiH1 />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? styles.active : ''}
                    title="Heading 2"
                >
                    <RiH2 />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? styles.active : ''}
                    title="Heading 3"
                >
                    <RiH3 />
                </button>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? styles.active : ''}
                    title="Bullet List"
                >
                    <RiListUnordered />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? styles.active : ''}
                    title="Ordered List"
                >
                    <RiListOrdered />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('blockquote') ? styles.active : ''}
                    title="Blockquote"
                >
                    <RiDoubleQuotesL />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? styles.active : ''}
                    title="Code Block"
                >
                    <RiCodeSSlashLine />
                </button>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({ textAlign: 'left' }) ? styles.active : ''}
                    title="Align Left"
                >
                    <RiAlignLeft />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({ textAlign: 'center' }) ? styles.active : ''}
                    title="Align Center"
                >
                    <RiAlignCenter />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({ textAlign: 'right' }) ? styles.active : ''}
                    title="Align Right"
                >
                    <RiAlignRight />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({ textAlign: 'justify' }) ? styles.active : ''}
                    title="Justify"
                >
                    <RiAlignJustify />
                </button>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.buttonGroup}>
                <button type="button" onClick={setLink} title="Add Link">
                    <RiLink />
                </button>
                <button type="button" onClick={addImage} title="Add Image">
                    <RiImageAddLine />
                </button>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    title="Horizontal Rule"
                >
                    <RiSeparator />
                </button>
            </div>

            <div className={styles.separator}></div>

            <div className={styles.buttonGroup}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <RiArrowGoBackLine />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <RiArrowGoForwardLine />
                </button>
            </div>
        </div>
    );
};

const TipTapEditor = ({ content, onChange }) => {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Underline,
            Image,
            Link.configure({
                openOnClick: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div className={styles.editorWrapper}>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className={styles.editorContent} />
        </div>
    );
};

export default TipTapEditor;
