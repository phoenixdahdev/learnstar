import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/utils/primsa"

export async function GET() {
    const session = await auth()
    if (!session || !session.user) {
        return NextResponse.json({ unauthorized: true }, { status: 401 })
    }

    try {
        const chatSessions = await prisma.chatSession.findMany({
            where: {
                user_id: session.user.id,
            },
            include: {
                messages: {
                    orderBy: {
                        created_at: "asc",
                    },
                },
            },
            orderBy: {
                updated_at: "desc",
            },
            take: 10,
        })
        return NextResponse.json(chatSessions)
    } catch (error) {
        console.error("Failed to fetch chat history:", error)
        return NextResponse.json({ error: "Failed to fetch chat history" }, { status: 500 })
    }
}