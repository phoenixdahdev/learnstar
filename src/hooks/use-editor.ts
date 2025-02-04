import { useEditor, } from '@tiptap/react'
import type { AnyExtension, Editor, EditorOptions } from '@tiptap/core'
import ExtensionKit from '@/editor/extentions'



declare global {
    interface Window {
        editor: Editor | null
    }
}


export const useBlockEditor = (options: Partial<Omit<EditorOptions, "extensions">> = {}) => {
    const editor = useEditor(
        {
            ...options,
            immediatelyRender: false,
            shouldRerenderOnTransaction: false,
            autofocus: true,
            extensions: [
                ...ExtensionKit(),
                // aiToken
                //     ? AiWriter.configure({
                //         authorId: userId,
                //         authorName: userName,
                //     })
                //     : undefined,
                // aiToken
                //     ? AiImage.configure({
                //         authorId: userId,
                //         authorName: userName,
                //     })
                //     : undefined,
                // aiToken ? Ai.configure({ token: aiToken }) : undefined,
            ].filter((e): e is AnyExtension => e !== undefined),
            editorProps: {
                attributes: {
                    autocomplete: 'off',
                    autocorrect: 'off',
                    autocapitalize: 'off',
                    class: 'min-h-full',
                },
            },
        },
        [],
    )

    return editor
}