"use server";

import z from "zod";

const fileSchema = z.instanceof(File, { message: "required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  description: z.string().min(1),
  file: fileSchema.refine((file) => file.size > 0, "required"),
  Image: imageSchema.refine((file) => file.size > 0, "required"),
});

export async function addProduct(formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }
}
