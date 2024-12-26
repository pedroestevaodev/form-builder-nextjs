'use client';

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema } from "@/schemas/forms";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ImSpinner2 } from "react-icons/im";
import { toast } from "@/hooks/useToast";
import { CreateForm } from "@/actions/form";
import { BsFileEarmarkPlus } from "react-icons/bs";
import { useRouter } from "next/navigation";

const CreateFormBtn = () => {
	const router = useRouter();

	const form = useForm<FormSchema>({
		resolver: zodResolver(formSchema),
	});

	const onSubmit = async (values: FormSchema) => {
		try {
			const formId = await CreateForm(values);

			toast({
				title: "Success",
				description: "Form created successfully",
			});

			router.push(`/builder/${formId}`);
		} catch (error) {
			console.error(error);
			toast({
				title: "Error",
				description: "Something went wrong, please try again later",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					type="button"
					className="group border border-primary/20 border-dashed h-[190px] flex flex-col items-center justify-center gap-4 hover:border-primary hover:cursor-pointer"
				>
					<BsFileEarmarkPlus className="size-8 text-muted-foreground group-hover:text-primary" />
					<p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
						Create Form
					</p>
				</Button>
			</DialogTrigger>
			<DialogHeader>
				<DialogTitle>
					Create Form
				</DialogTitle>
				<DialogDescription>
					Create a new form to start collecting responses
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-2"
				>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Textarea rows={5} {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				</form>
			</Form>
			<DialogFooter>
				<Button
					className="w-full mt-4"
					disabled={form.formState.isSubmitting}
					onClick={form.handleSubmit(onSubmit)}
				>
					{!form.formState.isSubmitting && <span>Save</span>}
					{form.formState.isSubmitting && (
						<ImSpinner2 className="animate-spin" />
					)}
				</Button>
			</DialogFooter>
		</Dialog>
	);
};

export { CreateFormBtn };