'use client';

import { FormSubmitComponentProps } from "@/types/components";
import { FormElements } from "../FormElements";
import { Button } from "../ui/button";
import { HiCursorClick } from "react-icons/hi";
import { useCallback, useRef, useState, useTransition } from "react";
import { toast } from "@/hooks/useToast";
import { ImSpinner2 } from "react-icons/im";
import { SubmitForm } from "@/actions/form";

const FormSubmitComponent = ({ formUrl, content }: FormSubmitComponentProps) => {
    const formValues = useRef<{ [key: string]: string }>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});
    const [renderKey, setRenderKey] = useState(new Date().getTime());

    const [submitted, setSubmitted] = useState<boolean>(false);

    const [pending, startTransition] = useTransition();

    const validateForm: () => boolean = useCallback(() => {
        for (const field of content) {
            const actualValue = formValues.current[field.id] || "";
            const valid = FormElements[field.type].validate(field, actualValue);

            if (!valid) {
                formErrors.current[field.id] = true;
            }
        }

        if (Object.keys(formErrors.current).length > 0) {
            return false;
        }

        return true;
    }, [content]);

    const submitValue = useCallback((key: string, value: string) => {
        formValues.current[key] = value;
    }, []);

    const submitForm = async () => {
        formErrors.current = {};
        const validForm = validateForm();

        if (!validForm) {
            setRenderKey(new Date().getTime());
            toast({
                title: "Error",
                description: "Please check the form for errors",
                variant: "destructive",
            });

            return;
        }

        try {
            const jsonContent = JSON.stringify(formValues.current);
            await SubmitForm(formUrl, jsonContent);
            setSubmitted(true);
        } catch (error) {
            console.log("Error submitting form", error);
            toast({
                title: "Error",
                description: "Something went wrong",
                variant: "destructive",
            });
        }
    };

    if (submitted) {
        return (
            <div className="flex items-center justify-center size-full p-8">
                <div className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                    <h1 className="text-2xl font-bold">Form submitted</h1>
                    <p className="text-muted-foreground">
                        Thank you for submitting the form, you can close this page now.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center size-full p-8">
            <div key={renderKey} className="max-w-[620px] flex flex-col flex-grow gap-4 bg-background w-full p-8 overflow-y-auto border shadow-xl shadow-blue-700 rounded">
                {content.map((element, index) => {
                    const FormElement = FormElements[element.type].formComponent;
                    return (
                        <FormElement 
                            key={`${element.id}-${index}`} 
                            elementInstance={element} 
                            submitValue={submitValue}
                            isInvalid={formErrors.current[element.id]}
                            defaultValue={formValues.current[element.id]}
                        />
                    );
                })}
                <Button
                    type="button"
                    className="mt-8"
                    onClick={() => {
                        startTransition(submitForm);
                    }}
                    disabled={pending}
                >
                    {!pending && (
                        <>
                            <HiCursorClick className="mr-2" />
                            Submit
                        </>
                    )}
                    {pending && <ImSpinner2 className="animate-spin" />}
                </Button>
            </div>
        </div>
    );
};

export { FormSubmitComponent };