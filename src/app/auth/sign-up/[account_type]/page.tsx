import React from "react";
import { SignupForm } from "../../_components/signup-form";

const page = async ({
  params,
}: {
  params: Promise<{ account_type?: "teacher" | "parent" | "school" }>;
}) => {
  const account_type = (await params).account_type;
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#fdf6ec] px-4 py-12">
      <SignupForm account_type={account_type} />
    </div>
  );
};

export default page;
