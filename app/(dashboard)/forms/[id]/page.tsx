import { GetFormById } from "@/actions/form";
import { FormLinkShare } from "@/components/FormLinkShare";
import { StatsCard } from "@/components/StatsCards";
import { SubmissionsTable } from "@/components/SubmissionsTable";
import { VisitBtn } from "@/components/VisitBtn";
import { FormDetailPageProps } from "@/types/nextjs";
import { LucideView } from "lucide-react";
import { FaWpforms } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { TbArrowBounce } from "react-icons/tb";

const FormDetailPage = async ({
    params,
}: FormDetailPageProps) => {
    const { id } = await params;
    const form = await GetFormById(Number(id));

    if (!form) throw new Error('Form not found');

    const { visits, submissions } = form;

    const submissionRate = visits > 0 ? (submissions / visits) * 100 : 0;
    const bounceRate = 100 - submissionRate;

    return (
        <>
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <h1 className="text-4xl font-bold truncate">
                        {form.name}
                    </h1>
                    <VisitBtn shareUrl={form.shareUrl} />
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex items-center justify-between gap-2">
                    <FormLinkShare shareUrl={form.shareUrl} />
                </div>
            </div>
            <div className="w-full pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 container">
                <StatsCard
                    title="Total Visits"
                    icon={<LucideView className="text-blue-600" />}
                    helperText="All time form visits"
                    value={visits.toLocaleString() || ""}
                    loading={false}
                    className="shadow-md shadow-blue-600"
                />
                <StatsCard
                    title="Total Submissions"
                    icon={<FaWpforms className="text-yellow-600" />}
                    helperText="All time form submissions"
                    value={submissions.toLocaleString() || ""}
                    loading={false}
                    className="shadow-md shadow-yellow-600"
                />
                <StatsCard
                    title="Submission Rate"
                    icon={<HiCursorClick className="text-blue-600" />}
                    helperText="Visits that resulted in form submission"
                    value={submissionRate.toLocaleString() || ""}
                    loading={false}
                    className="shadow-md shadow-blue-600"
                />
                <StatsCard
                    title="Bounce Rate"
                    icon={<TbArrowBounce className="text-red-600" />}
                    helperText="Visits that leaves without interacting"
                    value={bounceRate.toLocaleString() || ""}
                    loading={false}
                    className="shadow-md shadow-red-600"
                />
            </div>

            <div className="container pt-10">
                <SubmissionsTable id={form.id} />
            </div>
        </>
    );
};

export default FormDetailPage;