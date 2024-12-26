import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import { SidebarBtnElementDragOverlay } from "../SidebarBtnElement";
import { FormElements } from "../FormElements";
import { ElementsType } from "@/types/components";
import { useDesigner } from "@/contexts/DesignerContext";

const DragOverlayWrapper = () => {
    const { elements } = useDesigner();

    const [draggedItem, setDraggedItem] = useState<Active | null>(null);

    useDndMonitor({
        onDragStart: (event) => {
            setDraggedItem(event.active);
        },
        onDragCancel: () => {
            setDraggedItem(null);
        },
        onDragEnd: () => {
            setDraggedItem(null);
        },
    });

    if (!draggedItem) return null;

    let node = <div>No drag overlay</div>;
    const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

    if (isSidebarBtnElement) {
        const type = draggedItem.data?.current?.type as ElementsType;
        node = <SidebarBtnElementDragOverlay formElement={FormElements[type]} />;
    }

    const isDesignerElementDragHandler = draggedItem.data?.current?.isDesignerElementDragHandler;

    if (isDesignerElementDragHandler) {
        const elementId = draggedItem.data?.current?.elementId;
        const element = elements.find((element) => element.id === elementId);

        if (!element) {
            node = <div>Element not found!</div>;
        } else {
            const DesignerComponent = FormElements[element.type].designerComponent;
            node = (
                <div className="flex bg-accent border rounded-md h-[120px] w-full px-4 py-2 opacity-60 pointer-events-none">
                    <DesignerComponent elementInstance={element} />
                </div>
            );
        }
    }

    return (
        <DragOverlay>
            {node}
        </DragOverlay>
    );
};

export { DragOverlayWrapper };