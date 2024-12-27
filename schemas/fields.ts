import * as z from "zod";

export const textFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const titleFieldPropertiesSchema = z.object({
    title: z.string().min(2).max(50),
});

export const subTitleFieldPropertiesSchema = z.object({
    title: z.string().min(2).max(50),
});

export const paragraphFieldPropertiesSchema = z.object({
    text: z.string().min(2).max(500),
});

export const spacerFieldPropertiesSchema = z.object({
    height: z.number().min(5).max(200),
});

export const numberFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const textAreaFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    rows: z.number().min(1).max(10),
});

export const dateFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
});

export const selectFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    options: z.array(z.string()).default([]),
});

export const checkboxFieldPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
});