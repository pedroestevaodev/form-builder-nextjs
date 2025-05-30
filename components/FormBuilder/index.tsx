'use client';

import { FormBuilderProps } from "@/types/components";
import { PreviewDialogBtn } from "../PreviewDialogBtn";
import { SaveFormBtn } from "../SaveFormBtn";
import { PublishFormBtn } from "../PublishFormBtn";
import { Designer } from "../Designer";
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { DragOverlayWrapper } from "../DragOverlayWrapper";
import { useDesigner } from "@/contexts/DesignerContext";
import { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "@/hooks/useToast";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Confetti from "react-confetti";

const FormBuilder = ({ form }: FormBuilderProps) => {
    const { setElements, setSelectedElement } = useDesigner();

    const [isReady, setIsReady] = useState<boolean>(false);

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 300,
            tolerance: 5,
        },
    });

    const sensors = useSensors(mouseSensor, touchSensor);

    useEffect(() => {
        if (isReady) return;

        const elements = JSON.parse(form.content);
        setElements(elements);
        setSelectedElement(null);
        setIsReady(true);
        const readyTimeout = setTimeout(() => setIsReady(true), 500);

        return () => clearTimeout(readyTimeout);
    }, [form, setElements, isReady, setSelectedElement]);

    if (!isReady) {
        return (
            <div className="flex flex-col items-center justify-center size-full">
                <ImSpinner2 className="animate-spin size-12" />
            </div>
        );
    }

    const shareUrl = `${window.location.origin}/submit/${form.shareUrl}`;

    if (form.published) {
        return (
            <>
                <Confetti 
                    width={window.innerWidth}
                    height={window.innerHeight}
                    recycle={false}
                    numberOfPieces={1000}
                />
                <div className="flex flex-col items-center justify-center size-full">
                    <div className="max-w-md text-center">
                        <h1 className="text-center text-4xl font-bold text-primary border-b pb-2 mb-10">
                            Form Published
                        </h1>
                        <h2 className="text-2xl">Share this form</h2>
                        <h3 className="text-xl text-muted-foreground border-b pb-10">
                            Anyone with the link can view and submit the form.
                        </h3>
                        <div className="my-4 flex flex-col gap-2 items-center w-full border-b pb-4">
                            <Input className="w-full" readOnly value={shareUrl} />
                            <Button
                                type="button"
                                className="mt-2 w-full"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl);
                                    toast({
                                        title: "Copied!",
                                        description: "Link copied to clipboard",
                                    });
                                }}
                            >
                                Copy link
                            </Button>
                        </div>
                        <div className="flex justify-between">
                            <Button
                                type="button"
                                variant={"link"}
                                asChild
                            >
                                <Link
                                    href={"/"}
                                    className="gap-2"
                                >
                                    <BsArrowLeft />
                                    Go back home
                                </Link>
                            </Button>
                            <Button
                                type="button"
                                variant={"link"}
                                asChild
                            >
                                <Link
                                    href={`/forms/${form.id}`}
                                    className="gap-2"
                                >
                                    Form details
                                    <BsArrowRight />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <DndContext sensors={sensors}>
            <main className="flex flex-col w-full">
                <nav className="flex items-center justify-between gap-3 border-b-2 p-4">
                    <h2 className="truncate font-medium">
                        <span className="text-muted-foreground mr-2">
                            Form:
                        </span>
                        {form.name}
                    </h2>
                    <div className="flex items-center gap-2">
                        <PreviewDialogBtn />
                        {!form.published && (
                            <>
                                <SaveFormBtn id={form.id} />
                                <PublishFormBtn id={form.id} />
                            </>
                        )}
                    </div>
                </nav>
                <div className="relative flex flex-grow items-center justify-center overflow-y-auto h-[200px] w-full bg-accent bg-[url('/paper.svg')] dark:bg-[url('/paper-dark.svg')]">
                    <Designer />
                </div>
            </main>
            <DragOverlayWrapper />
        </DndContext>
    );
};

export { FormBuilder };