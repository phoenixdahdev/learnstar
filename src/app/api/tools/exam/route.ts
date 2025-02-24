
import { mistral } from "@ai-sdk/mistral";
import { CoreMessage, streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = streamText({
        model: mistral('open-codestral-mamba'),
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
