import { GetFormWithSubmissions } from "@/actions/form";
import { BtnFormProps, ElementsType, FormElementInstance, RowType } from "@/types/components";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { formatDistance } from "date-fns";
import { RowCell } from "../RowCell";

const SubmissionsTable = async ({ id }: BtnFormProps) => {
    const form = await GetFormWithSubmissions(id);

    if (!form) throw new Error('Form not found');

    const formElements = JSON.parse(form.content) as FormElementInstance[];
    const columns: {
        id: string;
        label: string;
        required: boolean;
        type: ElementsType;
    }[] = [];

    formElements.forEach((element) => {
        switch (element.type) {
            case "TextField":
            case "NumberField":
            case "TextAreaField":
            case "DateField":
            case "SelectField":
            case "CheckboxField":
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label as string,
                    required: element.extraAttributes?.required as boolean,
                    type: element.type,
                });
                break;
            default:
                break;
        }
    });

    const rows: RowType[] = [];
    form.FormSubmissions.forEach((submission) => {
        const content = JSON.parse(submission.content);
        rows.push({
            ...content,
            submittedAt: submission.createdAt,
        });
    });

    return (
        <>
            <h1 className="text-2xl font-bold my-4">Submissions</h1>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={column.id} className="uppercase">
                                    {column.label}
                                </TableHead>
                            ))}
                            <TableHead className="text-muted-foreground text-right uppercase">
                                Submitted at
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                {columns.map((column) => (
                                    <RowCell
                                        key={`${column.id}-${index}`}
                                        type={column.type}
                                        value={row[column.id]}
                                    />
                                ))}
                                <TableCell className="text-muted-foreground text-right">
                                    {formatDistance(row.submittedAt, new Date(), {
                                        addSuffix: true,
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );
};

export { SubmissionsTable };