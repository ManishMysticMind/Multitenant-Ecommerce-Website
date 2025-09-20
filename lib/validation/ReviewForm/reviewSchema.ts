import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string().min(5, "Review must be at least 5 characters long"),
  image: z
  .instanceof(File)
  .nullable()
  .optional(),
});

export type ReviewSchema = z.infer<typeof reviewSchema>;
