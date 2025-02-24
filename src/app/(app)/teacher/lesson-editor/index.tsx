"use client";
import React, { useEffect, useState } from "react";
import { RichTextEditorDemo } from "../../../../components/tip-tap/rich-text-editor";

const LessonEditir = () => {
  const [client, setClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setClient(true);
    }
  }, []);
  return client ? <RichTextEditorDemo /> : null;
};

export default LessonEditir;
