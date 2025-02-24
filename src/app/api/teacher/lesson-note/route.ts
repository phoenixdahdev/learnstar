import { CoreMessage, streamText, generateId } from "ai";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import prisma from "@/utils/primsa";
import { ChatSession } from "@prisma/client";
import { mistral } from "@ai-sdk/mistral";


export const runtime = "edge";

export async function POST(req: Request) {
    const { messages, topic, sessionId }: { messages: CoreMessage[], topic: string, sessionId: string } = await req.json();
    const session = await auth()

    if (!session || !session.user) {
        return NextResponse.json({ unauthorized: true }, { status: 401 })
    }


    let chatSession: ChatSession | null

    if (sessionId) {
        chatSession = await prisma.chatSession.findUnique({
            where: {
                session_id: sessionId,
                user_id: session.user.id,
            },
            include: {
                messages: true,
            },
        })

        if (!chatSession) {
            return NextResponse.json("Chat session not found", { status: 404 })
        }
    } else {
        const newSessionId = generateId()
        chatSession = await prisma.chatSession.create({
            data: {
                session_id: newSessionId,
                topic: topic,
                user_id: session.user.id,
            },
        })
    }

    await prisma.chatMessage.create({
        data: {
            content: messages[messages.length - 1].content as string,
            role: "user",
            chat_session_id: chatSession.id,
        },
    })

    const result = streamText({
        model: mistral('open-codestral-mamba'),
        system: `
        You are **LearnStar**, an intelligent and resourceful AI assistant designed to create **comprehensive, well-structured, and engaging lesson notes**. 
        Your goal is to provide **detailed, easy-to-understand, and structured educational content** on any given topic, ensuring clarity and depth for learners of all levels.

        ### **Guidelines for Creating Lesson Notes:**  
        1. **Introduction** – Start with a clear definition of the topic and explain its significance.  
        2. **Key Concepts & Explanations** – Break down the topic into **digestible sections**, providing **detailed explanations** with relevant examples.  
        3. **Practical Applications** – Highlight how the topic is applied in real-world scenarios.  
        4. **Structured Learning Aids** – Use **diagrams, tables, bullet points, or step-by-step guides** to enhance understanding.  
        5. **Common Misconceptions & Challenges** – Address areas where learners typically struggle and provide solutions or clarifications.  
        6. **Summary/Conclusion** – Reinforce key takeaways and ensure the main points are well understood.  
        7. **Interactive Elements** (Optional) – Include **discussion questions, exercises, or quiz prompts** to encourage deeper engagement.  

        Maintain an **educational yet engaging tone**, ensuring explanations are tailored to the learner’s level (beginner, intermediate, or advanced). 
        Your lesson notes should be **structured, concise, and highly informative**, making learning with **LearnStar** both effective and enjoyable!
      `,
        messages,
        async onFinish({ text }) {
            console.log("AI response:", text)
            await prisma.chatMessage.create({
                data: {
                    content: text,
                    role: "assistant",
                    chat_session_id: chatSession.id,
                },
            })
        }
    });

    return result.toDataStreamResponse();
}
