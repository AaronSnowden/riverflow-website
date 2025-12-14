<template>
    <div class="rich-text-editor">
        <!-- Toolbar -->
        <div
            v-if="editor"
            class="toolbar bg-neutral-50 border border-neutral-300 rounded-t-md p-2 flex flex-wrap gap-1"
        >
            <!-- Text Formatting -->
            <button
                @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }"
                class="toolbar-btn"
                type="button"
                title="Bold"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
                    />
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }"
                class="toolbar-btn"
                type="button"
                title="Italic"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M10 4h4m-4 16h4m-1-16l-2 16"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('underline') }"
                class="toolbar-btn"
                type="button"
                title="Underline"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 19c3.866 0 7-3.134 7-7V5M5 5v7c0 3.866 3.134 7 7 7zM5 22h14"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }"
                class="toolbar-btn"
                type="button"
                title="Strikethrough"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14M6 6h12M6 18h12"
                    />
                </svg>
            </button>

            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Headings -->
            <button
                @click="
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 1 }),
                }"
                class="toolbar-btn"
                type="button"
                title="Heading 1"
            >
                H1
            </button>

            <button
                @click="
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 2 }),
                }"
                class="toolbar-btn"
                type="button"
                title="Heading 2"
            >
                H2
            </button>

            <button
                @click="
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                "
                :class="{
                    'is-active': editor.isActive('heading', { level: 3 }),
                }"
                class="toolbar-btn"
                type="button"
                title="Heading 3"
            >
                H3
            </button>

            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Lists -->
            <button
                @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }"
                class="toolbar-btn"
                type="button"
                title="Bullet List"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                    <circle cx="4" cy="6" r="1" fill="currentColor" />
                    <circle cx="4" cy="12" r="1" fill="currentColor" />
                    <circle cx="4" cy="18" r="1" fill="currentColor" />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }"
                class="toolbar-btn"
                type="button"
                title="Numbered List"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01"
                    />
                </svg>
            </button>

            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Alignment -->
            <button
                @click="editor.chain().focus().setTextAlign('left').run()"
                :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
                class="toolbar-btn"
                type="button"
                title="Align Left"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h10M4 18h16"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().setTextAlign('center').run()"
                :class="{
                    'is-active': editor.isActive({ textAlign: 'center' }),
                }"
                class="toolbar-btn"
                type="button"
                title="Align Center"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M7 12h10M4 18h16"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().setTextAlign('right').run()"
                :class="{
                    'is-active': editor.isActive({ textAlign: 'right' }),
                }"
                class="toolbar-btn"
                type="button"
                title="Align Right"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M10 12h10M4 18h16"
                    />
                </svg>
            </button>

            <div class="w-px h-6 bg-neutral-300 mx-1"></div>

            <!-- Other -->
            <button
                @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }"
                class="toolbar-btn"
                type="button"
                title="Quote"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().setHorizontalRule().run()"
                class="toolbar-btn"
                type="button"
                title="Horizontal Rule"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 12h14"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().undo().run()"
                :disabled="!editor.can().undo()"
                class="toolbar-btn"
                type="button"
                title="Undo"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                </svg>
            </button>

            <button
                @click="editor.chain().focus().redo().run()"
                :disabled="!editor.can().redo()"
                class="toolbar-btn"
                type="button"
                title="Redo"
            >
                <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 10h-10a8 8 0 00-8 8v2m18-10l-6 6m6-6l-6-6"
                    />
                </svg>
            </button>
        </div>

        <!-- Editor Content -->
        <editor-content :editor="editor" class="editor-content" />
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { watch, onBeforeUnmount } from "vue";

const props = defineProps({
    modelValue: {
        type: String,
        default: "",
    },
});

const emit = defineEmits(["update:modelValue"]);

const editor = useEditor({
    content: props.modelValue,
    extensions: [
        StarterKit,
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
        Image,
    ],
    onUpdate: ({ editor }) => {
        emit("update:modelValue", editor.getHTML());
    },
    editorProps: {
        attributes: {
            class: "prose max-w-none focus:outline-none min-h-[200px] p-4 border border-t-0 border-neutral-300 rounded-b-md",
        },
    },
});

// Watch for external changes
watch(
    () => props.modelValue,
    (value) => {
        const isSame = editor.value.getHTML() === value;
        if (!isSame) {
            editor.value.commands.setContent(value, false);
        }
    }
);

// Cleanup the editor
onBeforeUnmount(() => {
    editor.value.destroy();
});
</script>

<style scoped>
@reference '../../../resources/css/app.css';

.toolbar-btn {
    @apply px-2 py-1 rounded hover:bg-neutral-200 transition-colors text-neutral-700 font-medium text-sm;
}

.toolbar-btn.is-active {
    @apply bg-primary text-white;
}

.toolbar-btn.is-active:hover {
    @apply bg-primary/90;
}

.toolbar-btn:disabled {
    @apply opacity-50 cursor-not-allowed;
}

:deep(.ProseMirror) {
    min-height: 200px;
}

:deep(.ProseMirror:focus) {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 2px rgba(var(--primary-rgb), 0.1);
}

:deep(.ProseMirror p) {
    margin: 0.5rem 0;
}

:deep(.ProseMirror h1) {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0;
}

:deep(.ProseMirror h2) {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.875rem 0;
}

:deep(.ProseMirror h3) {
    font-size: 1.25rem;
    font-weight: bold;
    margin: 0.75rem 0;
}

:deep(.ProseMirror ul),
:deep(.ProseMirror ol) {
    padding-left: 1.5rem;
    margin: 0.5rem 0;
}

:deep(.ProseMirror blockquote) {
    border-left: 4px solid #e5e7eb;
    padding-left: 1rem;
    margin: 1rem 0;
    color: #6b7280;
}

:deep(.ProseMirror hr) {
    border: none;
    border-top: 2px solid #e5e7eb;
    margin: 1.5rem 0;
}
</style>
