"use client";
import { EditorContent } from "@tiptap/react";
import React, { useRef } from "react";
import { useBlockEditor } from "@/hooks/use-editor";
import "@/styles/index.css";

import { TableColumnMenu } from "@/editor/extentions/table/menus/table-colum/index";
import TableRowMenu from "@/editor/extentions/table/menus/table-row";
import ImageBlockMenu from "@/editor/extentions/image-block/components/block-menu";
import ColumnsMenu from "@/editor/extentions/multi-column/column-menu";
import { TextMenu } from "../menus/text-menu";
import LinkMenu from "../menus/link-menu";
import { ContentItemMenu } from "../menus/content-menu";

export const BlockEditor = () => {
  const menuContainerRef = useRef(null);

  const editor = useBlockEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full overflow-hidden">
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default BlockEditor;
