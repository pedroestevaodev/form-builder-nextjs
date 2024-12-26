import { propertiesSchema } from "@/schemas/fields";
import { formSchema } from "@/schemas/forms";
import * as z from "zod";

export type FormSchema = z.infer<typeof formSchema>;

export type PropertiesSchema = z.infer<typeof propertiesSchema>;