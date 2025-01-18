import * as z from "zod";

export const CategoryFormSchema = z.object({
  name: z
    .string({
      required_error: "Category name is required",
      invalid_type_error: "Category name must be a string",
    })
    .min(3, {
      message: "Category name must be at least 3 characters long",
    })
    .max(50, {
      message: "Category name must be at most 50 characters long",
    })
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: "Category name must contain only letters, numbers, and spaces",
    }),
  image: z
    .object({
      url: z.string().url({
        message: "Category image must be a valid URL",
      }),
    })
    .array()
    .length(1, {
      message: "Category must have at least one image",
    }),
  url: z.string().url({
    message: "Category url must be a valid URL",
  }),
  featured: z.boolean(),
});
