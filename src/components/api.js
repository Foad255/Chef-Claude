import { HfInference } from "@huggingface/inference";

const client = new HfInference("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");

export async function getChatCompletion(list) {
    let out = "";

    const stream = await client.chatCompletionStream({
        model: "google/gemma-2-2b-it",
        messages: [
            {
                role: "user",
                content: `I have these ingredients ${list} please give me a recipe i can make with these ingredients`
            }
        ],
        max_tokens: 500
    });

    for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            out += newContent;
        }  
    }

    return out;
}