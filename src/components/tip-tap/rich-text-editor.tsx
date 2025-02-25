/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useChat } from "@ai-sdk/react";
import { marked } from "marked";
import parse from "html-react-parser";

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
  const [lastResponse, setLastResponse] = useState<string>("");
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

  const { messages, handleSubmit, setMessages, status, setInput } = useChat({
    api: "/api/protected/teacher/chat",
    onError: (error) => {
      console.error("Chat error:", error);
    },
    onFinish: (message) => {
      if (message.role === "assistant") {
        setLastResponse(message.content);
      }
    },
  });

  const handleGetResponse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    setInput(
      `Selected text: ${selectedText}\n\nUser request: ${userInput}\n\nPlease respond to the user's request regarding the selected text.`
    );
    handleSubmit(e);
  };
  const applyChange = useCallback(() => {
    const html = marked.parse(lastResponse);
    if (editor && lastResponse) {
      editor.chain().focus().deleteSelection().insertContent(html).run();
      setIsAiPopupOpen(false);
      setSelectedText("");
      setAiResponse("");
      setUserInput("");
      setFloatingPosition(null);
    }
  }, [editor, lastResponse]);

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
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#fdf6ec] text-gray-800 rounded-md hover:bg-[#f5e9d9] transition-colors"
          >
            <MessageSquareIcon className="h-3 w-3" />
            Ask AI
          </button>
        </div>
      )}
      {isAiPopupOpen && (
        <div className="fixed right-4 top-4 w-[400px] bg-[#fdf6ec] rounded-lg shadow-xl border border-[#e5d5bc] z-50">
          <div className="flex items-center justify-between p-3 border-b border-[#e5d5bc]">
            <h3 className="text-sm font-medium text-gray-800">LearnStar</h3>
            <button
              onClick={() => {
                setIsAiPopupOpen(false);
                setAiResponse("");
                setUserInput("");
                setMessages([]);
              }}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-3 space-y-3">
            <div className="bg-[#f5e9d9] rounded p-2">
              <p className="text-xs text-gray-600">Selected text:</p>
              <p className="mt-1 text-xs font-mono text-gray-800">
                {selectedText}
              </p>
            </div>

            <form onSubmit={handleGetResponse} className="space-y-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="What would you like to do with this text?"
                className="w-full px-2 py-1.5 text-sm bg-white rounded border border-[#e5d5bc] focus:outline-none focus:border-[#d4b894] text-gray-800 placeholder:text-gray-500"
              />

              <button
                type="submit"
                disabled={
                  !userInput.trim() ||
                  status === "streaming" ||
                  status === "submitted"
                }
                className="w-full px-3 py-1.5 text-sm bg-[#d4b894] text-gray-800 rounded hover:bg-[#c5a47c] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "streaming" || status === "submitted"
                  ? "Getting Response..."
                  : "Get AI Response"}
              </button>
            </form>

            {messages.length > 0 &&
              messages[messages.length - 1].role === "assistant" && (
                <div className="h-[400px] overflow-auto">
                  <div className="bg-[#f5e9d9] rounded p-2">
                    <p className="text-xs text-gray-600">AI Response:</p>
                    <p className="mt-1 text-xs font-mono whitespace-pre-wrap text-gray-800">
                      {messages[messages.length - 1].content}
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      onClick={() => {
                        setIsAiPopupOpen(false);
                        setAiResponse("");
                        setMessages([]);
                        setUserInput("");
                      }}
                      className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={applyChange}
                      className="px-3 py-1.5 text-xs bg-[#d4b894] text-gray-800 rounded hover:bg-[#c5a47c] transition-colors"
                    >
                      Apply Change
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
