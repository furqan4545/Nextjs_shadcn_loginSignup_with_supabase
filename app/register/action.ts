"use server";

import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { z } from "zod";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

// export const registerUser = async ({
//   email,
//   password,
//   passwordConfirm,
// }: {
//   email: string;
//   password: string;
//   passwordConfirm: string;
// }) => {
//   const newUserSchema = z
//     .object({
//       email: z.string().email(),
//     })
//     .and(passwordMatchSchema);

//   const newUserValidation = newUserSchema.safeParse({
//     email,
//     password,
//     passwordConfirm,
//   });

//   if (!newUserValidation.success) {
//     return {
//       error: true,
//       message: newUserValidation.error.issues[0]?.message ?? "An error occured",
//     };
//   }
// };

export const registerUser = async ({
  email,
  password,
  passwordConfirm,
}: {
  email: string;
  password: string;
  passwordConfirm: string;
}) => {
  const newUserSchema = z
    .object({
      email: z.string().email(),
    })
    .and(passwordMatchSchema);

  const newUserValidation = newUserSchema.safeParse({
    email,
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

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: true,
      message: error.message,
    };
  }

  if (data.user && data.user.identities && data.user.identities.length === 0) {
    return {
      error: true,
      message: "Email already in use",
    };
  }

  // User successfully created
  return {
    success: true,
    message: "Check your email for the confirmation link",
  };
};
