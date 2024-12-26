'use client';

import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { DesignerSidebar } from "../DesignerSidebar";
import { cn } from "@/lib/utils";
import { useDesigner } from "@/contexts/DesignerContext";
import { FormElements } from "../FormElements";
import { DesignerElementWrapperProps, ElementsType } from "@/types/components";
import { idGenerator } from "@/lib/idGenerator";
import { useState } from "react";
import { Button } from "../ui/button";
import { BiSolidTrash } from "react-icons/bi";

const DesignerElementWrapper = ({ element }: DesignerElementWrapperProps) => {
    const { removeElement, setSelectedElement } = useDesigner();

    const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);

    const topHalf = useDroppable({
        id: element.id + "-top",
        data: {
            type: element.type,
            elementId: element.id,
            isTopHalfDesignerElement: true,
        },
    });

    const bottomHalf = useDroppable({
        id: element.id + "-bottom",
        data: {
            type: element.type,
            elementId: element.id,
            isBottomHalfDesignerElement: true,
        },
    });

    const draggable = useDraggable({
        id: element.id + "-drag-handler",
        data: {
            type: element.type,
            elementId: element.id,
            isDesignerElementDragHandler: true,
        },
    });

    if (draggable.isDragging) return null;

    const DesignerElement = FormElements[element.type].designerComponent;

    return (
        <div
            ref={draggable.setNodeRef}
            {...draggable.listeners}
            {...draggable.attributes}
            className="relative h-[120px] flex flex-col text-foreground hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
            onClick={(e) => {
                e.stopPropagation();
                setSelectedElement(element);
            }}
        >
            <div 
                ref={topHalf.setNodeRef}
                className="absolute w-full top-0 h-1/2 rounded-t-md" 
            />
            <div 
                ref={bottomHalf.setNodeRef}
                className="absolute w-full bottom-0 h-1/2 rounded-b-md" 
            />
            {mouseIsOver && (
                <>
                    <div className="absolute right-0 h-full">
                        <Button
                            type="button"
                            className="flex items-center justify-center h-full border rounded-md rounded-l-none bg-red-500"
                            variant={"outline"}
                            onClick={(e) => {
                                e.stopPropagation();
                                removeElement(element.id);
                            }}
                        >
                            <BiSolidTrash className="size-6" />
                        </Button>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse">
                        <p className="text-muted-foreground text-sm">
                            Click for properties or drag to move
                        </p>
                    </div>
                </>
            )}
            {topHalf.isOver && (
                <div className="absolute top-0 w-full h-[7px] rounded-md bg-primary rounded-b-none" />
            )}
            <div 
                className={cn(
                    "flex items-center w-full h-[120px] rounded-md bg-accent/40 px-4 py-2 pointer-events-none",
                    mouseIsOver && "opacity-30",
                )}
            >
                <DesignerElement elementInstance={element} />
            </div>
            {bottomHalf.isOver && (
                <div className="absolute bottom-0 w-full h-[7px] rounded-md bg-primary rounded-t-none" />
            )}
        </div>
    );
};

const Designer = () => {
    const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner();

    const droppable = useDroppable({
        id: "designer-drop-area",
        data: {
            isDesignerDropArea: true,
        },
    });

    useDndMonitor({
        onDragEnd: (event: DragEndEvent) => {
            const { active, over } = event;
            if (!active || !over) return;

            const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
            const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;
            const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

            if (droppingSidebarBtnOverDesignerDropArea) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(idGenerator());

                addElement(elements.length, newElement);

                return;
            }

            const isDroppingOverDesignerElementTopHalf = over.data?.current?.isTopHalfDesignerElement;
            const isDroppingOverDesignerElementBottomHalf = over.data?.current?.isBottomHalfDesignerElement;
            const isDroppingOverDesignerElement = isDroppingOverDesignerElementTopHalf || isDroppingOverDesignerElementBottomHalf;
            const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElement;

            if (droppingSidebarBtnOverDesignerElement) {
                const type = active.data?.current?.type;
                const newElement = FormElements[type as ElementsType].construct(idGenerator());

                const overElementIndex = elements.findIndex((element) => element.id === over.data?.current?.elementId);
                if (overElementIndex === -1) throw new Error("Element not found!");

                const indexForNewElement = isDroppingOverDesignerElementTopHalf ? overElementIndex : overElementIndex + 1;

                addElement(indexForNewElement, newElement);

                return;
            }

            const idDraggingDesignerElement = active.data?.current?.isDesignerElementDragHandler;
            const draggingDesignerElementOverAnotherDesignerElement = idDraggingDesignerElement && isDroppingOverDesignerElement;

            if (draggingDesignerElementOverAnotherDesignerElement) {
                const activeId = active.data?.current?.elementId;
                const overId = over.data?.current?.elementId;

                const activeElementIndex = elements.findIndex((element) => element.id === activeId);
                const overElementIndex = elements.findIndex((element) => element.id === overId);

                if (activeElementIndex === -1 || overElementIndex === -1) throw new Error("Element not found!");

                const activeElement = { ...elements[activeElementIndex] };
                removeElement(activeId);

                const indexForNewElement = isDroppingOverDesignerElementTopHalf ? overElementIndex : overElementIndex + 1;

                addElement(indexForNewElement, activeElement);

                return;
            }
        },
    });

    return (
        <div className="flex size-full">
            <div 
                className="w-full p-4"
                onClick={() => {
                    if (selectedElement) setSelectedElement(null);
                }}
            >
                <div
                    ref={droppable.setNodeRef}
                    className={cn(
                        "bg-background max-w-[920px] h-full m-auto rounded-xl flex flex-col flex-grow items-center justify-start flex-1 overflow-y-auto",
                        droppable.isOver && "ring-4 ring-primary ring-inset",
                    )}
                >
                    {!droppable.isOver && elements.length === 0 && (
                        <p className="text-3xl text-muted-foreground flex flex-grow items-center font-bold">
                            Drop here
                        </p>
                    )}
                    {droppable.isOver && elements.length === 0 && (
                        <div className="w-full p-4">
                            <div className="h-[120px] rounded-md bg-primary/20" />
                        </div>
                    )}
                    {elements.length > 0 && (
                        <div className="flex flex-col w-full gap-2 p-4">
                            {elements.map((element) => (
                                <DesignerElementWrapper key={element.id} element={element} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <DesignerSidebar />
        </div>
    );
};

export { DesignerElementWrapper, Designer };