"use client";
import "./tiptap.css";
import { cn } from "@/utils";
import { ImageExtension } from "./extensions/image";
import { ImagePlaceholder } from "./extensions/image-placeholder";
import SearchAndReplace from "./extensions/search-and-replace";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { EditorContent, type Extension, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TipTapFloatingMenu } from "./extensions/floating-menu";
import { FloatingToolbar } from "./extensions/floating-toolbar";
import { EditorToolbar } from "./toolbars/editor-toolbar";
import Placeholder from "@tiptap/extension-placeholder";
import { useLessonStore } from "@/hooks/lesson-store";
import { useCallback, useEffect, useState } from "react";
import { MessageSquareIcon, X } from "lucide-react";

const extensions = [
  StarterKit.configure({
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal",
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc",
      },
    },
    heading: {
      levels: [1, 2, 3, 4],
    },
  }),
  Placeholder.configure({
    emptyNodeClass: "is-editor-empty",
    placeholder: ({ node }) => {
      switch (node.type.name) {
        case "heading":
          return `Heading ${node.attrs.level}`;
        case "detailsSummary":
          return "Section title";
        case "codeBlock":
          return "";
        default:
          return "Write, type '/' for commands";
      }
    },
    includeChildren: false,
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  TextStyle,
  Subscript,
  Superscript,
  Underline,
  Link,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  ImageExtension,
  ImagePlaceholder,
  SearchAndReplace,
  Typography,
];

export function RichTextEditorDemo({ className }: { className?: string }) {
  const { content, setContent } = useLessonStore();
  const [selectedText, setSelectedText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isAiPopupOpen, setIsAiPopupOpen] = useState(false);
  const [floatingPosition, setFloatingPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: extensions as Extension[],
    content,
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    const updateFloatingMenu = () => {
      if (!editor) return;

      const selection = editor.state.selection;
      const text = editor.state.doc.textBetween(selection.from, selection.to);

      if (text) {
        setSelectedText(text);
        const view = editor.view;
        const { from } = selection;
        const start = view.coordsAtPos(from);

        setFloatingPosition({
          x: start.left,
          y: start.top,
        });
      } else {
        setFloatingPosition(null);
      }
    };

    if (editor) {
      editor.on("selectionUpdate", updateFloatingMenu);
      return () => {
        editor.off("selectionUpdate", updateFloatingMenu);
      };
    }
  }, [editor]);

  const getMockAiResponse = () => {
    // Mock AI response based on user input
    const responses = {
      "Explain this code":
        "This code block configures an Nginx server to listen on port 80 and proxy requests to a local server running on port 3000. It also sets up error pages and forwards necessary headers.",
      "Optimize this configuration":
        "To optimize, consider adding caching headers, enabling gzip compression, and adjusting worker processes based on your server's CPU cores.",
      "Add SSL configuration":
        "To add SSL, you'll need to listen on port 443, specify SSL certificate and key files, and redirect HTTP traffic to HTTPS.",
    };
    return (
      responses[userInput as keyof typeof responses] ||
      "I'm not sure how to help with that specific request. Could you please try asking something else?"
    );
  };

  const getAiResponse = () => {
    const response = getMockAiResponse();
    setAiResponse(response);
  };
  const applyChange = useCallback(() => {
    if (editor && aiResponse) {
      editor.chain().focus().deleteSelection().insertContent(aiResponse).run();
      setIsAiPopupOpen(false);
      setSelectedText("");
      setAiResponse("");
      setUserInput("");
      setFloatingPosition(null);
    }
  }, [editor, aiResponse]);

  if (!editor) return null;

  return (
    <div
      className={cn(
        "relative max-h-[calc(100dvh-6rem)]  w-full overflow-hidden overflow-y-scroll border pb-[60px] sm:pb-0",
        className
      )}
    >
      <EditorToolbar editor={editor} />
      <FloatingToolbar editor={editor} />
      <TipTapFloatingMenu editor={editor} />
      <EditorContent
        editor={editor}
        className=" min-h-[600px] w-full min-w-full cursor-text sm:p-6"
      />
      {floatingPosition && (
        <div
          className="fixed z-50 shadow-lg"
          style={{
            left: `${floatingPosition.x}px`,
            top: `${floatingPosition.y - 40}px`,
          }}
        >
          <button
            onClick={() => setIsAiPopupOpen(!isAiPopupOpen)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <MessageSquareIcon className="h-3 w-3" />
            Ask AI
          </button>
        </div>
      )}
      {isAiPopupOpen && (
        <div className="fixed right-4 top-4 w-[400px] bg-zinc-800 rounded-lg shadow-xl border border-zinc-700 z-50">
          <div className="flex items-center justify-between p-3 border-b border-zinc-700">
            <h3 className="text-sm font-medium">AI Assistant</h3>
            <button
              onClick={() => {
                setIsAiPopupOpen(false);
                setAiResponse("");
                setUserInput("");
              }}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 space-y-3">
            <div className="bg-zinc-900/50 rounded p-2">
              <p className="text-xs text-zinc-400">Selected text:</p>
              <p className="mt-1 text-xs font-mono">{selectedText}</p>
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="What would you like to do with this text?"
                className="w-full px-2 py-1.5 text-sm bg-zinc-900/50 rounded border border-zinc-700 focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={getAiResponse}
                disabled={!userInput.trim()}
                className="w-full px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Get AI Response
              </button>
            </div>

            {aiResponse && (
              <>
                <div className="bg-zinc-900/50 rounded p-2">
                  <p className="text-xs text-zinc-400">AI Response:</p>
                  <p className="mt-1 text-xs font-mono whitespace-pre-wrap">
                    {aiResponse}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => {
                      setIsAiPopupOpen(false);
                      setAiResponse("");
                      setUserInput("");
                    }}
                    className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={applyChange}
                    className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Apply Change
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
