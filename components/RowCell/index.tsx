import { RowCellProps } from "@/types/components";
import { TableCell } from "../ui/table";
import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { Checkbox } from "../ui/checkbox";

const RowCell = ({ type, value }: RowCellProps) => {
    let node: ReactNode = value;

    switch (type) {
        case "DateField":
            if (!value) break;
            const date = new Date(value);
            node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>
            break;
        case "CheckboxField":
            const checked = value === "true";
            node = <Checkbox checked={checked} disabled />
            break;
        default:
            break;
    };

    return (
        <TableCell>
            {node}
        </TableCell>
    );
};

export { RowCell };