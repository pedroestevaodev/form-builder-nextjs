import { 
    checkboxFieldPropertiesSchema,
    dateFieldPropertiesSchema,
    numberFieldPropertiesSchema,
    paragraphFieldPropertiesSchema, 
    selectFieldPropertiesSchema, 
    spacerFieldPropertiesSchema, 
    subTitleFieldPropertiesSchema, 
    textAreaFieldPropertiesSchema, 
    textFieldPropertiesSchema, 
    titleFieldPropertiesSchema 
} from "@/schemas/fields";
import { formSchema } from "@/schemas/forms";
import * as z from "zod";

export type FormSchema = z.infer<typeof formSchema>;

export type TextFieldPropertiesSchema = z.infer<typeof textFieldPropertiesSchema>;

export type TitleFieldPropertiesSchema = z.infer<typeof titleFieldPropertiesSchema>;

export type SubTitleFieldPropertiesSchema = z.infer<typeof subTitleFieldPropertiesSchema>;

export type ParagraphFieldPropertiesSchema = z.infer<typeof paragraphFieldPropertiesSchema>;

export type SpacerFieldPropertiesSchema = z.infer<typeof spacerFieldPropertiesSchema>;

export type NumberFieldPropertiesSchema = z.infer<typeof numberFieldPropertiesSchema>;

export type TextAreaFieldPropertiesSchema = z.infer<typeof textAreaFieldPropertiesSchema>;

export type DateFieldPropertiesSchema = z.infer<typeof dateFieldPropertiesSchema>;

export type SelectFieldPropertiesSchema = z.infer<typeof selectFieldPropertiesSchema>;

export type CheckboxFieldPropertiesSchema = z.infer<typeof checkboxFieldPropertiesSchema>;