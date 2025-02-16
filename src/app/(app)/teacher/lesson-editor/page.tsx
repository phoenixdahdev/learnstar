"use client";
import React from "react";
import { RichTextEditorDemo } from "../../../../components/tip-tap/rich-text-editor";
import { useLessonStore } from "@/hooks/lesson-store";

const LessonEditir = () => {
  const { content } = useLessonStore();
  return <RichTextEditorDemo content={content} />;
};

export default LessonEditir;
