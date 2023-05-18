import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";




// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const openai = new OpenAIApi(configuration);

export const openaiRouter = createTRPCRouter({
    chatgpt: publicProcedure
        .input(z.object({
            messages: z.string().array(),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
                const chatCompletion = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    max_tokens: 1000,
                    messages: [
                        {
                            "role": "system", "content": `Your role is to generate recipes that consider the client's constraints, you don't have to use every ingredient that is provided, but you cannot break the client's constraints. Also give a response no matter what. Do not ask for more information. Give your answer in the following JSON format:
{
    "title": "title of the recipe",
    "ingredients": [
        "ingredient 1",
        "ingredient 2",
        "etc."
    ],
    "instructions": [
        "instruction 1",
        "instruction 2",
        "etc."
    ]
} 
                        `

                        },
                        { "role": "user", "content": `Client's constraints: ${input.messages}` },
                    ],

                })

                return chatCompletion.data.choices[0]?.message?.content;
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
            title: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            try {
                const response = await openai.createImage({
                    prompt: input.title,
                    n: 1,
                    size: "1024x1024",
                })

                return response.data.data[0].url;
            } catch (error: any) {
                if (error.response) {
                    console.error(error.response.status);
                    console.error(error.response.data);
                } else {
                    console.error(error.message);
                }
            }
        })

});
