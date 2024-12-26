'use server';

import { prisma } from "@/lib/prisma";
import { formSchema } from "@/schemas/forms";
import { FormSchema } from "@/types/schemas";
import { currentUser } from "@clerk/nextjs/server";

class UserNotFoundError extends Error {};

const GetFormStats = async () => {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    const stats = await prisma.form.aggregate({
        where: {
            userId: user.id,
        },
        _sum: {
            visits: true,
            submissions: true,
        },
    });

    const visits = stats._sum.visits || 0;
    const submissions = stats._sum.submissions || 0;

    let submissionRate = 0;

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return {
        visits,
        submissions,
        submissionRate,
        bounceRate,
    };
};

const CreateForm = async (data: FormSchema) => {
    const validation = formSchema.safeParse(data);

    if (!validation.success) {
        throw new Error('Invalid form data');
    }

    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    const { name, description } = data;

    const form = await prisma.form.create({
        data: {
            userId: user.id,
            name,
            description,
        },
    });

    if (!form) throw new Error('Failed to create form');

    return form.id;
};

const GetForms = async () => {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    const forms = await prisma.form.findMany({
        where: {
            userId: user.id,
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    return forms;
};

const GetFormById = async (id: number) => {
    const user = await currentUser();

    if (!user) throw new UserNotFoundError();

    const form = await prisma.form.findUnique({
        where: {
            id,
            userId: user.id,
        },
    });

    return form;
};

export { GetFormStats, CreateForm, GetForms, GetFormById };