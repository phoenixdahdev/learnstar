import React from "react";
import Chat from ".";

const page = async ({
  params,
}: {
  params: Promise<{ type: "lesson-note" | "exam" | "marking" | "assessment" }>;
}) => {
  const { type } = await params;
  return <Chat type={type} />;
};

export default page;
