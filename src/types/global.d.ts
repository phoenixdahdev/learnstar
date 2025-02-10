/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Editor as CoreEditor } from '@tiptap/core'
import { Editor } from '@tiptap/react'
import { EditorState } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'
import { Placement, Props } from 'tippy.js'

export interface TooltipProps {
    children?: string | React.ReactNode
    enabled?: boolean
    title?: string
    shortcut?: string[]
    tippyOptions?: Omit<Partial<Props>, 'content'>
    content?: React.ReactNode
}

export interface TippyProps {
    'data-placement': Placement
    'data-reference-hidden'?: string
    'data-escaped'?: string
}



export interface MenuProps {
    editor: Editor
    appendTo?: React.RefObject<any>
    shouldHide?: boolean
}

export interface ShouldShowProps {
    editor?: CoreEditor
    view: EditorView
    state?: EditorState
    oldState?: EditorState
    from?: number
    to?: number
}


export interface Group {
    name: string
    title: string
    commands: Command[]
}

export interface Command {
    name: string
    label: string
    description: string
    aliases?: string[]
    iconName: keyof typeof icons
    action: (editor: CoreEditor) => void
    shouldBeHidden?: (editor: CoreEditor) => boolean
}

export interface MenuListProps {
    editor: CoreEditor
    items: Group[]
    command: (command: Command) => void
}


interface ChatSession {
    id: number
    session_id: string
    topic: string
    messages: {
        id: number
        content: string
        role: "user" | "assistant"
    }[]
}
