

import { Configuration, OpenAIApi } from "openai-edge";
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge'; // Provide optimal infrastructure for our API route (https://edge-runtime.vercel.app/)

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openAI = new OpenAIApi(config);


// POST localhost:3000/api/chat
export async function POST(request: Request) {
    const { messages } = await request.json(); // { messages: [] }

    // messages [{ user and he says "hello there" }]
    console.log(messages);

    // GPT-4 system message
    // system message tells GPT-4 how to act
    // it should always be at the front of your array

    // createChatCompletion (get response from GPT-4)
    const response = await openAI.createChatCompletion({
        model: 'gpt-4',
        stream: true,
        messages: [
            { role: "system", content: "You are a helpful assistant. You explain software concepts simply to intermediate programmers."},
            ...messages
        ]
    })

    // create a stream of data from OpenAI (stream data to the frontend)
    //const stream = await OpenAIStream(response);

    // send the stream as a response to our client / frontend
    return response;
}
