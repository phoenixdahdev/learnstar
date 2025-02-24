import { CoreMessage, streamText } from "ai";
import { mistral } from "@ai-sdk/mistral";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();

  const result = streamText({
    model: mistral('open-codestral-mamba'),
    system: `You are LearnStar, the intelligent and engaging AI assistant for LearnStar.AI, an innovative educational technology platform.
//         Help schools understand how they can:
//         - Generate more revenue through student game vouchers and premium features
//         - Improve their reputation with modern learning tools
//         - Enhance administrative efficiency
//         - Boost student performance
//         Be professional, friendly, informative, and inspiring.`,
    messages,
  });

  return result.toDataStreamResponse();
}
