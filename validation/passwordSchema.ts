import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(5, "Password must contain at least 5 characters");
