import { openai } from "@/utils";
import { CoreMessage, streamText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = streamText({
        model: openai("gpt-4"),
        system: `Your name is LearnStar, You are an expert assessment marker. Analyze student answers and:
        1. Compare with correct answer
        2. Identify key points covered and missed
        3. Suggest improvements
        4. Provide a fair score
        5. Give constructive feedback
        Format the response with clear sections for scoring and feedback.`,
        messages,
    });

    return result.toDataStreamResponse();
}
