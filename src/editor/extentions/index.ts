'use client'

import { ImageApi } from '@/utils/upload-image'
import { StarterKit } from '@tiptap/starter-kit'
import { Highlight } from '@tiptap/extension-highlight'
import { CharacterCount } from '@tiptap/extension-character-count'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Emoji, } from '@tiptap-pro/extension-emoji'
import { TextAlign } from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { Typography } from '@tiptap/extension-typography'
import { Color } from '@tiptap/extension-color'
import { FocusClasses as Focus } from '@tiptap/extension-focus'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import { Subscript } from '@tiptap/extension-subscript'
import { TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import { Superscript } from '@tiptap/extension-superscript'
import { TaskItem } from '@tiptap/extension-task-item'
import { TaskList } from '@tiptap/extension-task-list'
import { FileHandler } from '@tiptap-pro/extension-file-handler'
import { Details } from '@tiptap-pro/extension-details'
import { DetailsContent } from '@tiptap-pro/extension-details-content'
import { DetailsSummary } from '@tiptap-pro/extension-details-summary'
import { ImageUpload } from './image-upload'
import UniqueID from '@tiptap-pro/extension-unique-id'
import Columns from './multi-column/columns'
import Column from './multi-column/column'
import Heading from './heading'
import HorizontalRule from './horizontal-rule'
import { CodeBlock } from './code-block'
import FontSize from './font-size'
import { TrailingNode } from './tralling-node'
import Link from './link'
import ImageBlock from './image-block'
import emojiSuggestion from './suggestion'
import SlashCommand from './slash-command'
import Figcaption from './fig-caption'
import BlockquoteFigure from './block-quote'
import Table from './table/table'
import { TableCell } from './table/cell'
import TableHeader from './table/header'
import TableRow from './table/row'


export const ExtensionKit = () => [
    Document,
    Columns,
    TaskList,
    TaskItem.configure({
        nested: true,
    }),
    Column,
    Selection,
    Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
    }),
    HorizontalRule,
    UniqueID.configure({
        types: ['paragraph', 'heading', 'blockquote', 'codeBlock', 'table'],
    }),
    StarterKit.configure({
        document: false,
        dropcursor: false,
        heading: false,
        horizontalRule: false,
        blockquote: false,
        history: false,
        codeBlock: false,
    }),
    Details.configure({
        persist: true,
        HTMLAttributes: {
            class: 'details',
        },
    }),
    DetailsContent,
    DetailsSummary,
    CodeBlock,
    TextStyle,
    FontSize,
    FontFamily,
    Color,
    TrailingNode,
    Link.configure({
        openOnClick: false,
    }),
    Highlight.configure({ multicolor: true }),
    Underline,
    CharacterCount.configure({ limit: 50000 }),
    TableOfContents,
    // TableOfContentsNode,
    // ImageUpload.configure({
    //     clientId: provider?.document?.clientID,
    // }),
    ImageUpload,
    ImageBlock,
    FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, pos) => {
            files.forEach(async file => {
                const url = await ImageApi.uploadImage(file)

                currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
            })
        },
        onPaste: (currentEditor, files) => {
            files.forEach(async file => {
                const url = await ImageApi.uploadImage(file)

                return currentEditor
                    .chain()
                    .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
                    .focus()
                    .run()
            })
        },
    }),
    Emoji.configure({
        enableEmoticons: true,
        suggestion: emojiSuggestion,
    }),
    TextAlign.extend({
        addKeyboardShortcuts() {
            return {}
        },
    }).configure({
        types: ['heading', 'paragraph'],
    }),
    Subscript,
    Superscript,
    Table,
    TableCell,
    TableHeader,
    TableRow,
    Typography,
    Placeholder.configure({
        includeChildren: true,
        showOnlyCurrent: false,
        placeholder: () => '',
    }),
    SlashCommand,
    Focus,
    Figcaption,
    BlockquoteFigure,
    Dropcursor.configure({
        width: 2,
        class: 'ProseMirror-dropcursor border-black',
    }),
]

export default ExtensionKit