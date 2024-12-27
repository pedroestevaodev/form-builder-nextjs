'use client';

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { useDesigner } from "@/contexts/DesignerContext";
import { cn } from "@/lib/utils";
import { dateFieldPropertiesSchema } from "@/schemas/fields";
import { ComponentProps, ElementsType, FormElement, FormElementInstance } from "@/types/components";
import { DateFieldPropertiesSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillCalendarDateFill } from "react-icons/bs";

const extraAttributes = {
    label: "Date field",
    helperText: "Pick a date",
    required: false,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

const DesignerComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const {
        label,
        helperText,
        required
    } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Button
                variant={"outline"}
                className="w-full justify-start text-left font-normal"
            >
                <CalendarIcon className="mr-2 size-4" />
                <span>Pick a date</span>
            </Button>
            {helperText && (
                <p className="text-sm text-muted-foreground">{helperText}</p>
            )}
        </div>
    );
};

const FormComponent = ({ elementInstance, submitValue, isInvalid, defaultValue }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const [date, setDate] = useState<Date | undefined>(defaultValue ? new Date(defaultValue) : undefined);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setError(isInvalid === true);
    }, [isInvalid]);

    const { helperText, label, required } = element.extraAttributes;

    return (
        <div className="flex flex-col gap-2 w-full">
            <Label className={cn(error && "text-red-500")}>
                {label}
                {required && <span className="text-red-500">*</span>}
            </Label>
            <Popover>
                <PopoverTrigger>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            error && "border-red-500",
                        )}
                    >
                        <CalendarIcon className="mr-2 size-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date);

                            if (!submitValue) return;
                            const value = date?.toUTCString() || "";
                            const valid = DateFieldFormElement.validate(element, value);
                            setError(!valid);
                            submitValue(element.id, value);
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            {helperText && (
                <p
                    className={cn(
                        "text-sm text-muted-foreground",
                        error && "text-red-500"
                    )}
                >
                    {helperText}
                </p>
            )}
        </div>
    );
};

const PropertiesComponent = ({ elementInstance }: ComponentProps) => {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();

    const form = useForm<DateFieldPropertiesSchema>({
        resolver: zodResolver(dateFieldPropertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    const applyChanges = (values: DateFieldPropertiesSchema) => {
        const { label, helperText, required } = values;

        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
            },
        });
    };

    return (
        <Form {...form}>
            <form
                onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3"
            >
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br />
                                It will be displayed above the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Helper Text</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") e.currentTarget.blur();
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                The helper text of the field.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                            <div className="space-y-0.5">
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                    Select if the field is required.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

const type: ElementsType = "DateField";

const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        icon: BsFillCalendarDateFill,
        label: "Date Field",
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
    validate: (formElement: FormElementInstance, currentValue: string): boolean => {
        const element = formElement as CustomInstance;
        if (element.extraAttributes.required) {
            return currentValue.trim().length > 0;
        }

        return true;
    },
};

export { DateFieldFormElement };