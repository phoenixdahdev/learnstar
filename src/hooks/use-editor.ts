/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import type { AnyExtension, Editor, EditorOptions } from '@tiptap/core'



declare global {
    interface Window {
        editor: Editor | null
    }
}


export const useBlockEditor = ({
    aiToken,
    ...editorOptions
}: {
    aiToken?: string
} & Partial<Omit<EditorOptions, 'extensions'>>) => {

}