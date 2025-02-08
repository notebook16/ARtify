import { HfInference } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

// Function to handle the stream for enhancing the prompt with a timeout
const enhancePrompt = async (prompt) => {
  const client = new HfInference(`${process.env.HUGGING_FACE_API_KEY}`, {
    timeout: 10000, // Set the timeout for the client request
  });

  const stream = client.chatCompletionStream({
    model: "Qwen/QwQ-32B-Preview",
    messages: [
      {
        role: "user",
        content: `Give me the enhanced prompt for '${prompt}'`,
      },
    ],
    max_tokens: 150,
  });

  let enhancedPrompt = "";

  // Set a 6-second timeout for the enhancement process
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Prompt enhancement timed out")), 6000) // Timeout after 6 seconds
  );

  // Attempt to enhance the prompt and handle the timeout
  try {
    // Wait for either the stream or the timeout
    const result = await Promise.race([
      (async () => {
        for await (const chunk of stream) {
          if (chunk.choices?.[0]?.delta?.content) {
            enhancedPrompt += chunk.choices[0].delta.content;
          }
        }
        return enhancedPrompt;
      })(),
      timeoutPromise, // Timeout after 6 seconds
    ]);

    // If the result is empty, return the original prompt
    return result || prompt;
  } catch (error) {
    // If any error occurs (timeout or other issues), log it and return the original prompt
    console.error("Error enhancing the prompt:", error);
    return prompt; // Return the original prompt if the enhancement failed
  }
};

// Exporting the function to be used in other modules
export default enhancePrompt;
