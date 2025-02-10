/* eslint-disable @typescript-eslint/no-unused-vars */
"use server"

import prisma from "@/utils/primsa";
import { loginSchema, signupSchema } from "../../schema/index";
import { z } from "zod";
import { cookies } from "next/headers";

export async function create_teacher(data: z.infer<typeof signupSchema>) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (user) {
        return {
            error: "User already exists",
            success: false,
        };
    }

    // Password stored in plain text (not recommended)
    const new_user = await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            password: data.password, // No hashing applied
            is_teacher: true,
            is_verified: true,
            teacher_profile: {
                create: {},
            },
        },
    });

    // Remove password before returning
    const { password, ...userWithoutPassword } = new_user;

    return {
        success: true,
        user: userWithoutPassword,
    };
}

export async function google_login(email: string, name?: string) {
    let user;
    const cookie = await cookies();
    const from_where = cookie.get("from_where")?.value;

    user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                is_teacher: true,
                is_verified: true,
            },
        });
    }

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

export async function login(data: z.infer<typeof loginSchema>) {
    const user = await prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });

    if (!user) {
        return {
            error: "Invalid email or password",
            success: false,
        };
    }

    if (!user.password) {
        return {
            error: "User created with Google authentication",
            success: false,
        };
    }

    // Direct password comparison (insecure)
    if (data.password !== user.password) {
        console.log("Password not matched");
        return {
            error: "Invalid email or password",
            success: false,
        };
    }

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;

    return {
        success: true,
        user: userWithoutPassword,
    };
}
