import { CoreMessage, streamText } from "ai";
import { mistral } from '@ai-sdk/mistral';

export const runtime = "edge";


export async function POST(req: Request) {

    const { messages }: { messages: CoreMessage[] } = await req.json();

    const result = streamText({
        model: mistral('pixtral-12b-2409'),
        system: "You are a helpful assistant that provides responses about text. Tailor your response to the user's specific request.",
        messages
    });

    console.log(result);

    return result.toDataStreamResponse();
}
