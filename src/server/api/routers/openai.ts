import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const openaiRouter = createTRPCRouter({
    chatgpt: publicProcedure
        .input(z.object({
            messages: z.object({
                role: z.enum(["user", "system", "assistant"]),
                content: z.string(),
            }).array()
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const chatCompletion = openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    max_tokens: 1000,
                    messages: input.messages
                })

                return chatCompletion.data.choices[0].message;
            } catch (error: any) {
                if (error.response) {
                    console.error(error.response.status);
                    console.error(error.response.data);
                } else {
                    console.error(error.message);
                }
            }
        }),
    dalle: publicProcedure
        .input(z.object({
            text: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const dalleCompletion = openai.createCompletion({
                    engine: "davinci",
                    prompt: input.text,
                    maxTokens: 1000,
                    temperature: 0.9,
                    topP: 1,
                    frequencyPenalty: 0,
                    presencePenalty: 0,
                    stop: ["\n", "testing"]
                })

                return dalleCompletion.data.choices[0].text;
            } catch (error: any) {
                if (error.response) {
                    console.error(error.response.status);
                    console.error(error.response.data);
                } else {
                    console.error(error.message);
                }
            }
        }
        
});
