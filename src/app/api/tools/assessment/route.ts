import { CoreMessage, streamText } from "ai";
import { createOpenAI, } from '@ai-sdk/openai';

export const runtime = "edge";

const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
})

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = streamText({
        model: openai("gpt-3.5-turbo"),
        system: `Your name is LearnStar, You are an expert assessment creator. Generate assessment questions that:
        1. Are aligned with learning objectives
        2. Include a mix of question types (MCQ, short answer, etc.)
        3. Have clear marking criteria
        4. Are grade-level appropriate
        5. Include answers and explanations
        Format the output clearly with numbered questions.`,
        messages,
    });

    return result.toDataStreamResponse();
}
