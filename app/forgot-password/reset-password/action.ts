"use server";

import { z } from "zod";

import { createClient } from "@/utils/supabase/server";

export const resetPasswordFunc = async ({
  password,
  passwordConfirm,
}: {
  password: string;
  passwordConfirm: string;
}) => {
  const newUserSchema = z.object({
    password: z.string().min(6),
    passwordConfirm: z.string().min(6),
  });

  const newUserValidation = newUserSchema.safeParse({
    password,
    passwordConfirm,
  });

  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.issues[0]?.message ?? "An error occured",
    };
  }

  // supabase authentication from here
  const supabase = createClient();

  const { data, error } = await supabase.auth.updateUser({
    password: password,
  });

  console.log("data : ", data);

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  // User successfully created
  return {
    success: true,
    message: "Password reset successful",
  };
};
